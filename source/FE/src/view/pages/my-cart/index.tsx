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
import CustomBreadcrumbs from 'src/components/custom-breadcrum'

type TProps = {}

const MyCartPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<number[]>([])
    const [discountCode, setDiscountCode] = useState('')

    //hooks
    const { user } = useAuth()
    const { i18n, t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color='primary' icon='healthicons:home-outline' /> },
        { label: t('my_cart'), href: '/my-cart' },
    ];

    //Redux
    const dispatch: AppDispatch = useDispatch()
    const { details } = useSelector((state: RootState) => state.order)

    const memoListAllProductIds = useMemo(() => {
        return details?.map((item: TItemOrderProduct) => item.productId)
    }, [details])

    const memoSelectedProduct = useMemo(() => {
        const result: TItemOrderProduct[] = []
        selectedRow.forEach((selectedId) => {
            const findItems: any = details?.find((item: TItemOrderProduct) => item.productId === selectedId)
            if (findItems) {
                result.push(findItems)
            }
        })
        return result
    }, [selectedRow, details])


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

    console.log("router", router)

    useEffect(() => {
        const selectedProduct = router.query.selected
        if (selectedProduct) {
            if (typeof selectedProduct === 'string') {
                setSelectedRow([+selectedProduct])
            } else if (Array.isArray(selectedProduct)) {
                setSelectedRow(selectedProduct.map(item => +item))
            }
        }
    }, [router.query])

    //Handler
    const handleChangeCheckBox = (value: number) => {
        const isChecked = selectedRow.includes(value)
        if (isChecked) {
            const filtered = selectedRow.filter((item) => item !== value)
            setSelectedRow(filtered)
        } else {
            setSelectedRow([...selectedRow, value])
        }
    }

    const handleCheckAll = () => {
        const isCheckAll = memoListAllProductIds.every((item: number) => selectedRow.includes(item))
        if (isCheckAll) {
            setSelectedRow([])
        } else {
            setSelectedRow(memoListAllProductIds)
        }
    }

    const handleDeleteMany = () => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const cloneOrderItem = cloneDeep(details)
        const filteredItem = cloneOrderItem.filter((item: TItemOrderProduct) => !selectedRow.includes(item.productId))
        if (user) {
            dispatch(
                updateProductToCart({
                    details: filteredItem
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
            py: { xs: 2, sm: 1, md: 2, lg: 8 },
            px: { xs: 2, sm: 2, md: 4, lg: 8 },
        }}>
            {/* Breadcrumbs */}
            <Box sx={{ mb: { xs: 1, sm: 2, md: 4 } }}>
                <CustomBreadcrumbs items={breadcrumbItems} />
            </Box>

            {/* Main Content */}
            <Stack spacing={3} sx={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: 4, sm: 4, md: 4, lg: 8 },
                borderRadius: '15px',
                width: '100% !important',
                backgroundColor: theme.palette.background.paper,
            }}>
                {details.length > 0 ? (
                    <Grid container >
                        {/* Cart Items */}
                        <Grid item xs={12} md={8} sx={{
                            pr: { xs: 0, sm: 0, md: 4, lg: 8 },
                        }}>
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

                                        <Stack sx={{ width: { xs: '100%', md: 90, lg: 120 }, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t("quantity")}</Typography>
                                        </Stack>

                                        <Stack sx={{ width: { xs: '100%', md: 90, lg: 120 }, alignItems: 'center' }}>
                                            <Typography fontWeight={600}>{t("total_item_price")}</Typography>
                                        </Stack>

                                        <Stack sx={{ width: 40 }}>
                                            <Tooltip title={t("delete_all")}>
                                                <Typography component="span">
                                                    <IconButton
                                                        onClick={handleDeleteMany}
                                                        disabled={selectedRow.length === 0}>
                                                        <IconifyIcon icon="carbon:trash-can" />
                                                    </IconButton>
                                                </Typography>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid container item spacing={2} sx={{ maxWidth: '100%' }}>
                                    {details.map((item: TItemOrderProduct, index: number) => (
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

                        {/* Cart Summary */}
                        <Grid item xs={12} md={4}
                        // sx={{maxWidth: { xs: '100%', md: '40%' }}}
                        >
                            <CartSummary
                                subtotal={memoSubtotal}
                                discount={memoDiscount}
                                total={memoTotalPrice}
                                onApplyDiscount={handleApplyDiscount}
                                discountCode={discountCode}
                                setDiscountCode={setDiscountCode}
                                onCheckout={handleNavigateCheckout}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Box sx={{
                        padding: "20px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100% !important",
                    }}>
                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                    </Box>
                )}

            </Stack>
        </Box>
    )
}

export default MyCartPage
