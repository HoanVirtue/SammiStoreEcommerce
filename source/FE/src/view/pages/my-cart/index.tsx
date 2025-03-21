"use client"

//React
import React, { Fragment, useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Box, Button, Checkbox, Divider, Grid, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'

//Other
import { useAuth } from 'src/hooks/useAuth'
import { cloneDeep, convertUpdateProductToCart, formatPrice } from 'src/utils'
import { TItemOrderProduct } from 'src/types/order'
import IconifyIcon from 'src/components/Icon'
import { updateProductToCart } from 'src/stores/order'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import ProductCartItem from './components/ProductCartItem'
import CartSummary from './components/CartSummary'

type TProps = {}

const MyCartPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<string[]>([])
    const [discountCode, setDiscountCode] = useState('')

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation()
    const router = useRouter()

    //Theme
    const theme = useTheme()

    //Redux
    const dispatch: AppDispatch = useDispatch()
    const { orderItems } = useSelector((state: RootState) => state.order)

    const memoListAllProductIds = useMemo(() => {
        return orderItems?.map((item: TItemOrderProduct) => item.productId)
    }, [orderItems])

    const memoSelectedProduct = useMemo(() => {
        const result: TItemOrderProduct[] = []
        selectedRow.forEach((selectedId) => {
            const findItems: any = orderItems?.find((item: TItemOrderProduct) => item.productId === selectedId)
            if (findItems) {
                result.push(findItems)
            }
        })
        return result
    }, [selectedRow, orderItems])

    const memoSubtotal = useMemo(() => {
        const total = memoSelectedProduct?.reduce((result: number, current: TItemOrderProduct) => {

            const currentPrice = current?.discount && current?.discount > 0 ? (current?.price * (100 - current?.discount * 100)) / 100 : current?.price
            return result + currentPrice * current?.amount
        }, 0)
        return total
    }, [memoSelectedProduct])

    const memoDiscount = 0

    const memoTotalPrice = useMemo(() => {
        return memoSubtotal - memoDiscount
    }, [memoSubtotal, memoDiscount])

    useEffect(() => {
        const selectedProduct = router.query.selected as string
        if (selectedProduct) {
            if (typeof selectedProduct === "string") {
                setSelectedRow([selectedProduct])
            } else {
                setSelectedRow([...selectedProduct])
            }
        }
    }, [router.query])

    //Handler
    const handleChangeCheckBox = (value: string) => {
        const isChecked = selectedRow.includes(value)
        if (isChecked) {
            const filtered = selectedRow.filter((item) => item !== value)
            setSelectedRow(filtered)
        } else {
            setSelectedRow([...selectedRow, value])
        }
    }

    const handleCheckAll = () => {
        const isCheckAll = memoListAllProductIds.every((item) => selectedRow.includes(item))
        if (isCheckAll) {
            setSelectedRow([])
        } else {
            setSelectedRow(memoListAllProductIds)
        }
    }

    const handleDeleteMany = () => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const cloneOrderItem = cloneDeep(orderItems)
        const filteredItem = cloneOrderItem.filter((item: TItemOrderProduct) => !selectedRow.includes(item.productId))
        if (user) {
            dispatch(
                updateProductToCart({
                    orderItems: filteredItem
                })
            )
            setLocalProductToCart({ ...parseData, [user?.id]: filteredItem })
        }
    }

    const handleNavigateCheckout = () => {
        const formattedData = JSON.stringify(memoSelectedProduct.map((item: TItemOrderProduct) => ({
            productId: item.productId,
            amount: item.amount
        })))
        router.push({
            pathname: ROUTE_CONFIG.CHECKOUT,
            query: {
                totalPrice: memoTotalPrice,
                selectedProduct: formattedData
            }
        })
    }

    const handleApplyDiscount = () => {
        // Handle discount code application
        console.log('Applying discount code:', discountCode)
    }

    return (
        <Box sx={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            mt: 5,
            padding: '0 2rem'
        }}>
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '4rem',
                borderRadius: '15px',
                width: '100% !important',
            }}>
                <Grid container>
                    {orderItems.length > 0 ? (
                        <Stack direction="row" spacing={2} sx={{ width: '100%' }} alignItems="center">
                            <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                                <Grid container>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            py: 2,
                                            minWidth: {
                                                xs: '100%',
                                                md: 900
                                            },
                                            maxWidth: {
                                                xs: '100%',
                                                md: '70%'
                                            },
                                            typography: 'subtitle2',
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Stack sx={{ width: 40 }}>
                                            <Tooltip title={t("select_all")}>
                                                <Checkbox
                                                    onChange={handleCheckAll}
                                                    checked={memoListAllProductIds.every((item) => selectedRow.includes(item))}
                                                />
                                            </Tooltip>
                                        </Stack>

                                        <Stack flexGrow={1}>
                                            <Typography fontWeight={600}>{t("product_name")}</Typography>
                                        </Stack>

                                        <Stack sx={{ width: 200, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t("price_in_cart")}</Typography>
                                        </Stack>

                                        <Stack sx={{ width: 120, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t("quantity")}</Typography>
                                        </Stack>

                                        <Stack sx={{ width: 120, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t("total_item_price")}</Typography>
                                        </Stack>

                                        <Stack sx={{ width: 40 }}>
                                            <Tooltip title={t("delete_all")}>
                                                <span>
                                                    <IconButton
                                                        onClick={handleDeleteMany}
                                                        disabled={selectedRow.length === 0}>
                                                        <IconifyIcon icon="carbon:trash-can" />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid container spacing={2}>
                                    {orderItems.map((item: TItemOrderProduct, index: number) => {
                                        return (
                                            <ProductCartItem item={item}
                                                key={item.productId}
                                                handleChangeCheckBox={handleChangeCheckBox}
                                                selectedRow={selectedRow}
                                                index={index} />
                                        )
                                    })}
                                </Grid>
                            </Stack>
                            <CartSummary
                                subtotal={memoSubtotal}
                                discount={memoDiscount}
                                total={memoTotalPrice}
                                onApplyDiscount={handleApplyDiscount}
                                discountCode={discountCode}
                                setDiscountCode={setDiscountCode}
                                onCheckout={handleNavigateCheckout}
                            />

                        </Stack>
                    ) : (
                        <Box sx={{
                            padding: "20px",
                            width: "fit-content !important",
                        }}>
                            <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                        </Box>
                    )}

                </Grid>
            </Box>
        </Box>
    )
}

export default MyCartPage
