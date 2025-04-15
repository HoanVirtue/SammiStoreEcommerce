
'use client';

import { Box, Checkbox, Stack, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import Link from 'next/link';
import { Fragment, useEffect, useState, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import IconifyIcon from 'src/components/Icon';
import { useAuth } from 'src/hooks/useAuth';
import { getProductDetail } from 'src/services/product';
import { AppDispatch, RootState } from 'src/stores';
import { TItemOrderProduct } from 'src/types/order';
import { formatPrice, isExpired } from 'src/utils';
import Image from 'src/components/image';
import { createCartAsync, deleteCartAsync } from 'src/stores/cart/action';
import { updateCartQuantity } from 'src/stores/cart';
import { TItemCartProduct } from 'src/types/cart';
import { useDebounce } from 'src/hooks/useDebounce';

type TProps = {
  item: TItemOrderProduct;
  index: number;
  handleChangeCheckBox: (value: number) => void;
  selectedRow: number[];
};

interface TItemOrderProductState extends TItemOrderProduct {
  stockQuantity?: number;
}

const ProductCartItem = ({ item, index, handleChangeCheckBox, selectedRow }: TProps) => {
  const { user } = useAuth();
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);

  const [itemState, setItemState] = useState<TItemOrderProductState>(item);
  const [inputQuantity, setInputQuantity] = useState<string | number>(item.quantity);
  const debouncedQuantity = useDebounce(inputQuantity, 500);

  const fetchProductDetail = async (id: number) => {
    try {
      const res = await getProductDetail(id);
      const data = res?.result;
      if (data) {
        const discountItem = data.startDate && data.endDate && isExpired(data?.startDate, data.endDate) ? data.discount : 0;
        const cartItem: TItemCartProduct = carts?.data?.find((cart: TItemCartProduct) => cart.productId === id) || {
          cartId: 0,
          productId: id,
          productName: data.name,
          price: data.price,
          quantity: item.quantity || 1,
        };
        setItemState({
          name: data.name,
          images: data.images,
          price: data.price,
          discount: discountItem * 100,
          productId: id,
          quantity: cartItem?.quantity || item.quantity || 1,
          stockQuantity: data.stockQuantity,
        });
        setInputQuantity(cartItem?.quantity || item.quantity || 1);
      }
    } catch (error) {
      toast.error('Không thể tải thông tin sản phẩm!');
    }
  };

  useEffect(() => {
    if (item.productId && item.productId == itemState.productId) {
      fetchProductDetail(item.productId);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuantity !== itemState.quantity && debouncedQuantity !== '') {
      handleDebouncedQuantityChange(Number(debouncedQuantity));
    }
  }, [debouncedQuantity]);

  const handleChangeQuantity = async (amountChange: number) => {
    if (!user) return;

    const newQuantity = itemState.quantity + amountChange;
    if (newQuantity < 1) {
      toast.error('Số lượng không được nhỏ hơn 1!');
      return;
    }
    if (itemState.stockQuantity && newQuantity > itemState.stockQuantity) {
      toast.error(`Số lượng không được vượt quá ${itemState.stockQuantity} sản phẩm trong kho!`);
      return;
    }

    const prevQuantity = itemState.quantity;
    setItemState((prev) => ({ ...prev, quantity: newQuantity }));
    setInputQuantity(newQuantity);
    dispatch(updateCartQuantity({ productId: itemState.productId, quantity: newQuantity }));

    try {
      await dispatch(
        createCartAsync({
          cartId: 0,
          productId: itemState.productId,
          quantity: newQuantity,
          operation: 2,
        })
      ).unwrap();
    } catch (error) {
      toast.error('Cập nhật số lượng thất bại!');
      setItemState((prev) => ({ ...prev, quantity: prevQuantity }));
      setInputQuantity(prevQuantity);
      dispatch(updateCartQuantity({ productId: itemState.productId, quantity: prevQuantity }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setInputQuantity('');
      return;
    }
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity)) {
      toast.error('Vui lòng nhập số hợp lệ!');
      return;
    }
    setInputQuantity(newQuantity);
  };

  const handleDebouncedQuantityChange = async (newQuantity: number) => {
    if (!user) return;

    if (newQuantity < 1) {
      toast.error('Số lượng không được nhỏ hơn 1!');
      setInputQuantity(itemState.quantity);
      return;
    }
    if (itemState.stockQuantity && newQuantity > itemState.stockQuantity) {
      toast.error(`Số lượng không được vượt quá ${itemState.stockQuantity} sản phẩm trong kho!`);
      setInputQuantity(itemState.quantity);
      return;
    }

    const prevQuantity = itemState.quantity;
    setItemState((prev) => ({ ...prev, quantity: newQuantity }));
    dispatch(updateCartQuantity({ productId: itemState.productId, quantity: newQuantity }));

    try {
      await dispatch(
        createCartAsync({
          cartId: 0,
          productId: itemState.productId,
          quantity: newQuantity,
          operation: 2,
        })
      ).unwrap();
    } catch (error) {
      toast.error('Cập nhật số lượng thất bại!');
      setItemState((prev) => ({ ...prev, quantity: prevQuantity }));
      setInputQuantity(prevQuantity);
      dispatch(updateCartQuantity({ productId: itemState.productId, quantity: prevQuantity }));
    }
  };

  const handleDeleteProductInCart = async (id: number) => {
    if (!user) return;
    try {
      await dispatch(deleteCartAsync(id)).unwrap();
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại!');
    }
  };

  const totalPrice = useMemo(() => {
    const basePrice =
      itemState?.discount && itemState?.discount > 0
        ? (itemState.price * (100 - itemState.discount)) / 100
        : itemState.price || 0;
    return basePrice * (itemState.quantity || 1);
  }, [itemState?.quantity, itemState?.price, itemState?.discount]);

  return (
    <Fragment>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 3,
          minWidth: '100%',
          maxWidth: { xs: '100%', md: '60%' },
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack sx={{ width: 40 }}>
          <Checkbox
            disabled={!itemState?.stockQuantity || itemState?.stockQuantity === 0}
            checked={selectedRow.includes(itemState?.productId || 0)}
            value={itemState?.productId}
            onChange={() => itemState?.productId && handleChangeCheckBox(itemState.productId)}
          />
        </Stack>

        <Stack direction="row" alignItems="center" flexGrow={1} sx={{ width: { xs: '100%', md: '40%' } }}>
          <Image
            src={itemState.images?.[0]?.imageUrl || '/public/svgs/placeholder.svg'}
            sx={{ width: 80, height: 80, flexShrink: 0, borderRadius: 1.5, bgcolor: 'background.neutral' }}
          />
          <Stack spacing={0.5} sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ textWrap: 'wrap' }}>
              <Link href={`/product/${itemState.productId}`}>{itemState?.name || 'Đang tải...'}</Link>
            </Typography>
          </Stack>
        </Stack>

        <Stack
          sx={{
            width: 180,
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: itemState?.discount && itemState?.discount > 0 ? theme.palette.grey[500] : theme.palette.primary.main,
              textDecoration: itemState?.discount && itemState?.discount > 0 ? 'line-through' : 'none',
            }}
          >
            {formatPrice(itemState?.price || 0)}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
            {itemState?.discount && itemState?.discount > 0
              ? formatPrice((itemState?.price * (100 - itemState?.discount)) / 100)
              : formatPrice(itemState?.price || 0)}
          </Typography>
        </Stack>

        <Stack sx={{ width: { xs: '100%', md: 90, lg: 120 }, pt: 4, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              sx={{ p: { xs: 0, md: 0, lg: 2 } }}
              onClick={() => handleChangeQuantity(-1)}
              disabled={itemState?.quantity <= 1}
            >
              <IconifyIcon icon="mdi:minus" />
            </IconButton>
            <TextField
              type="number"
              value={inputQuantity}
              onChange={handleInputChange}
              size="small"
              inputProps={{ min: 1, max: itemState?.stockQuantity, style: { textAlign: 'center' } }}
              sx={{
                width: 70,
                '& input': {
                  py: 1,
                  px: 0,
                  textAlign: 'center',
                  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { display: 'none' },
                  '-moz-appearance': 'textfield',
                },
              }}
            />
            <IconButton
              sx={{ p: { xs: 0, md: 0, lg: 2 } }}
              onClick={() => handleChangeQuantity(1)}
              disabled={itemState?.quantity >= (itemState?.stockQuantity || 0)}
            >
              <IconifyIcon icon="mdi:plus" />
            </IconButton>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.75rem',
              textAlign: 'center',
              width: '100%',
              mt: 0.5,
              display: 'block',
            }}
          >
            Còn {itemState?.stockQuantity || 0} sản phẩm
          </Typography>
        </Stack>

        <Stack sx={{ width: { xs: '100%', md: 90, lg: 90 }, alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            {formatPrice(totalPrice)}
          </Typography>
        </Stack>

        <Stack sx={{ width: 40 }}>
          <IconButton onClick={() => handleDeleteProductInCart(itemState.productId)}>
            <IconifyIcon icon="carbon:trash-can" />
          </IconButton>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default memo(ProductCartItem);
