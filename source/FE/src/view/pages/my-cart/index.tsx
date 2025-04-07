'use client';

import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme,
    CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'src/stores';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'src/hooks/useAuth';
import { formatPrice, isExpired } from 'src/utils';
import { TItemOrderProduct } from 'src/types/order';
import IconifyIcon from 'src/components/Icon';
import { updateProductToCart } from 'src/stores/order';
import { getCartsAsync } from 'src/stores/cart/action';
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage';
import NoData from 'src/components/no-data';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from 'src/configs/route';
import ProductCartItem from './components/ProductCartItem';
import CartSummary from './components/CartSummary';
import CustomBreadcrumbs from 'src/components/custom-breadcrum';
import { getProductDetail } from 'src/services/product';

type TProps = {};

const MyCartPage: NextPage<TProps> = () => {
    const [selectedRow, setSelectedRow] = useState<number[]>([]);
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [originalPrice, setOriginalPrice] = useState<number>(0);

    const { user } = useAuth();
    const { i18n, t } = useTranslation();
    const router = useRouter();
    const theme = useTheme();

    const dispatch: AppDispatch = useDispatch();
    const { carts, isLoading } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if (user?.id) {
            dispatch(
                getCartsAsync({
                    params: {
                        take: -1,
                        skip: 0,
                        paging: false,
                        orderBy: 'name',
                        dir: 'asc',
                        keywords: "''",
                        filters: '',
                    },
                })
            );
        }
    }, [dispatch, user?.id]);


    useEffect(() => {
        const fetchDiscounts = async () => {
            for (const productId of selectedRow) {
                const res = await getProductDetail(productId);
                const data = res?.result;
                if (data) {
                    const discount = data.startDate && data.endDate && isExpired(data?.startDate, data.endDate) ? data.discount : 0;
                    setDiscountValue(discount);
                    setOriginalPrice(data.price);
                }
            }
        };

        if (selectedRow.length > 0) {
            fetchDiscounts();
        }
    }, [selectedRow]);

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color="primary" icon="healthicons:home-outline" /> },
        { label: t('my_cart'), href: '/my-cart' },
    ];

    const memoListAllProductIds = useMemo(() => {
        return carts?.data?.map((item: TItemOrderProduct) => item.productId) || [];
    }, [carts]);

    const memoSelectedProduct = useMemo(() => {
        return carts?.data?.filter((item: TItemOrderProduct) => selectedRow.includes(item.productId)) || [];
    }, [selectedRow, carts]);

    const memoSubtotal = useMemo(() => {
        return memoSelectedProduct.reduce((result: number, current: TItemOrderProduct) => {
            const price = current?.price || 0;
            const discount = current?.discount || 0; // Discount is now in percentage (e.g., 10 for 10%)
            const quantity = current?.quantity || 1;
            const currentPrice = discount > 0 ? (price * (100 - discount)) / 100 : price; // Discount applied as percentage
            return result + currentPrice * quantity;
        }, 0);
    }, [memoSelectedProduct]);


    const memoTotalPrice = useMemo(() => memoSubtotal, [memoSubtotal]);

    const memoSave = useMemo(() => {
        return memoSelectedProduct.reduce((result: number, current: TItemOrderProduct) => {
            const price = originalPrice || 0;
            const discount = discountValue * 100 || 0;
            const quantity = current?.quantity || 1;
            if (discount > 0) {
                const savedPrice = (price * discount) / 100 * quantity;
                return result + savedPrice;
            }
            return result;
        }, 0);
    }, [memoSelectedProduct, discountValue]);

    useEffect(() => {
        const selectedProduct = router.query.selected;
        if (selectedProduct) {
            if (typeof selectedProduct === 'string') {
                setSelectedRow([+selectedProduct]);
            } else if (Array.isArray(selectedProduct)) {
                setSelectedRow(selectedProduct.map((item) => +item));
            }
        }
    }, [router.query]);

    const handleChangeCheckBox = (value: number) => {
        setSelectedRow((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleCheckAll = () => {
        const isCheckAll = memoListAllProductIds.every((item: number) => selectedRow.includes(item));
        setSelectedRow(isCheckAll ? [] : memoListAllProductIds);
    };

    const handleDeleteMany = () => {
        const productCart = getLocalProductFromCart();
        const parseData = productCart ? JSON.parse(productCart) : {};
        const filteredItem = carts.data.filter((item: TItemOrderProduct) => !selectedRow.includes(item.productId));
        if (user) {
            dispatch(updateProductToCart({ carts: filteredItem }));
            setLocalProductToCart({ ...parseData, [user?.id]: filteredItem });
        }
    };

    const handleNavigateCheckout = () => {
        const formattedData = JSON.stringify(
            memoSelectedProduct.map((item: TItemOrderProduct) => ({
                productId: item.productId,
                quantity: item.quantity,
            }))
        );
        router.push({
            pathname: ROUTE_CONFIG.CHECKOUT,
            query: { totalPrice: memoTotalPrice, selectedProduct: formattedData },
        });
    };

    return (
        <Box
            sx={{
                maxWidth: '1440px',
                margin: '0 auto',
                width: '100%',
                py: { xs: 2, sm: 1, md: 2, lg: 8 },
                px: { xs: 2, sm: 2, md: 4, lg: 8 },
            }}
        >
            <Box sx={{ mb: { xs: 1, sm: 2, md: 4 } }}>
                <CustomBreadcrumbs items={breadcrumbItems} />
            </Box>

            <Stack
                spacing={3}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: 4, sm: 4, md: 4, lg: 8 },
                    borderRadius: '15px',
                    width: '100% !important',
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : carts?.data?.length > 0 ? (
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={9}
                            sx={{
                                pr: { xs: 0, sm: 0, md: 4, lg: 8 },
                            }}
                        >
                            <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                                <Grid container>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            py: 2,
                                            width: '100%',
                                            typography: 'subtitle2',
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Stack sx={{ width: 40 }}>
                                            <Tooltip title={t('select_all')}>
                                                <Checkbox
                                                    onChange={handleCheckAll}
                                                    checked={memoListAllProductIds.every((item) => selectedRow.includes(item))}
                                                />
                                            </Tooltip>
                                        </Stack>
                                        <Stack flexGrow={1}>
                                            <Typography fontWeight={600}>{t('product_name')}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: 180, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t('price_in_cart')}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: { xs: '100%', md: 90, lg: 120 }, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t('quantity')}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: { xs: '100%', md: 90, lg: 90 }, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t('total_item_price')}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: 40 }}>
                                            <Tooltip title={t('delete_all')}>
                                                <Typography component="span">
                                                    <IconButton onClick={handleDeleteMany} disabled={selectedRow.length === 0}>
                                                        <IconifyIcon icon="carbon:trash-can" />
                                                    </IconButton>
                                                </Typography>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid container item spacing={2} sx={{ maxWidth: '100%' }}>
                                    {carts?.data?.map((item: TItemOrderProduct, index: number) => (
                                        <ProductCartItem
                                            item={item}
                                            key={item.productId}
                                            handleChangeCheckBox={handleChangeCheckBox}
                                            selectedRow={selectedRow}
                                            index={index}
                                        />
                                    ))}
                                </Grid>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <CartSummary
                                subtotal={memoSubtotal} total={memoTotalPrice}
                                save={memoSave}
                                onCheckout={handleNavigateCheckout}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            padding: '20px',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100% !important',
                        }}
                    >
                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t('empty_cart')} />
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default MyCartPage;