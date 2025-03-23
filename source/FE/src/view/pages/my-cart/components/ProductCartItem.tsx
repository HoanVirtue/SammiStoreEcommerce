import { Box, Checkbox, Stack, useTheme } from "@mui/material"
import { Typography } from "@mui/material"
import { IconButton } from "@mui/material"
import { TextField } from "@mui/material"
import Link from "next/link"
import { Fragment, useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import IconifyIcon from "src/components/Icon"
import { getLocalProductFromCart, setLocalProductToCart } from "src/helpers/storage"
import { useAuth } from "src/hooks/useAuth"
import { getProductDetail } from "src/services/product"
import { AppDispatch, RootState } from "src/stores"
import { updateProductToCart } from "src/stores/order"
import { TItemOrderProduct } from "src/types/order"
import { cloneDeep, convertUpdateProductToCart, formatPrice, isExpired } from "src/utils"
import Image from "src/components/image"

type TProps = {
    item: TItemOrderProduct
    index: number
    handleChangeCheckBox: (value: string) => void
    selectedRow: string[]
}

interface TItemOrderProductState extends TItemOrderProduct {
    stockQuantity?: number
}

const ProductCartItem = ({ item, index, handleChangeCheckBox, selectedRow }: TProps) => {
    const { user } = useAuth()
    const theme = useTheme()
    const dispatch: AppDispatch = useDispatch()
    const { orderItems } = useSelector((state: RootState) => state.order)

    const productCart = getLocalProductFromCart()
    const parseData = productCart ? JSON.parse(productCart) : {}
    const lastAmount = user && parseData[user.id]?.find((cartItem: TItemOrderProduct) => cartItem.productId === item.productId)?.amount

    const [itemState, setItemState] = useState<TItemOrderProductState>({ ...item, amount: lastAmount || item.amount || 1 })

    const fetchProductDetail = async (id: string) => {
        const res = await getProductDetail(id)
        const data = res?.result

        if (data) {
            const discountItem = data.startDate && data.endDate && isExpired(data?.startDate, data.endDate) ? data.discount : 0
            setItemState({
                name: data.name,
                images: data.images,
                price: data.price,
                discount: discountItem,
                productId: id,
                amount: lastAmount || data.amount || 1,
                stockQuantity: data.stockQuantity
            })
        }
    }

    useEffect(() => {
        if (item.productId) {
            fetchProductDetail(item.productId)
        }
    }, [item.productId])

    useEffect(() => {
        setItemState((prev) => ({ ...prev, amount: lastAmount || item.amount || 1 }))
    }, [item.amount])

    const handleChangeQuantity = (item: TItemOrderProduct, amount: number) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const listOrderItems = convertUpdateProductToCart(orderItems, {
            name: item?.name,
            amount: amount,
            images: item?.images,
            price: item?.price,
            discount: item?.discount,
            productId: item.productId,
        })
        if (user) {
            dispatch(updateProductToCart({ orderItems: listOrderItems }))
            setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
        }
    }

    const handleDeleteProductInCart = (id: string) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const cloneOrderItem = cloneDeep(orderItems)
        const filteredItem = cloneOrderItem.filter((item: TItemOrderProduct) => item.productId !== id)
        if (user) {
            dispatch(updateProductToCart({ orderItems: filteredItem }))
            setLocalProductToCart({ ...parseData, [user?.id]: filteredItem })
        }
    }

    const totalPrice = useMemo(() => {
        if (!itemState?.amount) return itemState.price * (itemState.amount || 1)

        if (itemState?.discount && itemState?.discount > 0) {
            return itemState.price * (100 - itemState.discount * 100) / 100 * itemState.amount
        }
        return itemState.price * itemState.amount
    }, [itemState?.amount, itemState?.price, itemState?.discount])

    return (
        <Fragment>
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    py: 3,
                    minWidth: '100%',
                    maxWidth: {
                        xs: '100%',
                        md: '70%'
                    },
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
            >
                <Stack sx={{ width: 40 }}>
                    <Checkbox
                        disabled={!itemState?.stockQuantity
                            // || itemState?.status === 0
                        }
                        checked={selectedRow.includes(itemState?.productId)}
                        value={itemState?.productId}
                        onChange={(e) => handleChangeCheckBox(e.target.value)}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" flexGrow={1}>
                    <Image
                        src={itemState.images?.[0]?.imageUrl}
                        sx={{
                            width: 80,
                            height: 80,
                            flexShrink: 0,
                            borderRadius: 1.5,
                            bgcolor: 'background.neutral',
                        }}
                    />

                    <Stack spacing={0.5} sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ textWrap: 'wrap' }}>
                            <Link href={`/product/${itemState.productId}`}>
                                {itemState?.name}
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>

                <Stack sx={{ width: 200, alignItems: 'center', flexDirection: { xs: 'column', md: 'column', lg: 'row' }, gap: 2, justifyContent: 'center' }}>
                    <Typography variant="subtitle2" sx={{
                        color: itemState?.discount && itemState?.discount > 0 ? theme.palette.grey[500] : theme.palette.primary.main,
                        textDecoration: itemState?.discount && itemState?.discount > 0 ? "line-through" : "none",
                    }}>
                        {formatPrice(itemState?.price)}đ
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
                        {itemState?.discount && itemState?.discount > 0 ? (
                            formatPrice(itemState?.price * (100 - itemState?.discount * 100) / 100)
                        ) : (
                            formatPrice(itemState?.price)
                        )}đ
                    </Typography>
                </Stack>

                <Stack sx={{ width: { xs: '100%', md: 90, lg: 120 }, alignItems: 'center' }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            sx={{ p: { xs: 0, md: 0, lg: 2 } }}
                            onClick={() => handleChangeQuantity(itemState, -1)}
                            disabled={itemState?.amount < 1}
                        >
                            <IconifyIcon icon="mdi:minus" />
                        </IconButton>
                        <TextField
                            type="number"
                            value={itemState?.amount}
                            onChange={(e) => handleChangeQuantity(itemState, Number(e.target.value))}
                            size="small"
                            inputProps={{
                                min: 1,
                                max: itemState?.stockQuantity,
                                style: { textAlign: 'center' }
                            }}
                            sx={{
                                width: 40,
                                '& input': {
                                    py: 1,
                                    px: 0,
                                    textAlign: 'center',
                                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                                        display: 'none'
                                    }
                                }
                            }}
                        />
                        <IconButton
                            sx={{ p: { xs: 0, md: 0, lg: 2 } }}
                            onClick={() => handleChangeQuantity(itemState, 1)}
                            disabled={itemState?.amount >= (itemState?.stockQuantity || 0)}
                        >
                            <IconifyIcon icon="mdi:plus" />
                        </IconButton>
                    </Box>
                </Stack>

                <Stack sx={{ width: { xs: '100%', md: 90, lg: 120 }, alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        {formatPrice(totalPrice)}đ
                    </Typography>
                </Stack>

                <Stack sx={{ width: 40 }}>
                    <IconButton onClick={() => handleDeleteProductInCart(itemState.productId)}>
                        <IconifyIcon icon="carbon:trash-can" />
                    </IconButton>
                </Stack>
            </Stack>
        </Fragment>
    )
}

export default ProductCartItem