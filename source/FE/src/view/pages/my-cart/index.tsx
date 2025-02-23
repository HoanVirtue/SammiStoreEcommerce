"use client"

//React
import React, { Fragment, useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Checkbox, Divider, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

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
import CustomTextField from 'src/components/text-field'
import { updateProductToCart } from 'src/stores/order'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {}

const MyCartPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<string[]>([])

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { orderItems } = useSelector((state: RootState) => state.order)

    const memoListAllProductIds = useMemo(() => {
        return orderItems.map((item: TItemOrderProduct) => item.product)
    }, [orderItems])

    const memoSelectedProduct = useMemo(() => {
        return selectedRow.map((selectedId) => {
            const findItems: any = orderItems.find((item: TItemOrderProduct) => item.product === selectedId)
            if (findItems) {
                return {
                    ...findItems
                }
            }
        })
    }, [selectedRow, orderItems])

    const memoTotalPrice = useMemo(() => {
        const total = memoSelectedProduct.reduce((result: number, current: TItemOrderProduct) => {
            const currentPrice = current.discount > 0 ? (current.price * (100 - current.discount)) / 100 : current.price
            return result + currentPrice * current.amount
        }, 0)
        return total
    }, [memoSelectedProduct])


    //Handler
    const handleChangeQuantity = (item: TItemOrderProduct, amount: number) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const listOrderItems = convertUpdateProductToCart(orderItems, {
            name: item?.name,
            amount: amount,
            image: item?.image,
            price: item?.price,
            discount: item?.discount,
            product: item.product,
            slug: item?.slug
        })
        if (user) {
            dispatch(
                updateProductToCart({
                    orderItems: listOrderItems
                })
            )
            setLocalProductToCart({ ...parseData, [user?._id]: listOrderItems })
        }
    }

    const handleDeleteProductInCart = (id: string) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const cloneOrderItem = cloneDeep(orderItems)
        const filteredItem = cloneOrderItem.filter((item: TItemOrderProduct) => item.product !== id)
        if (user) {
            dispatch(
                updateProductToCart({
                    orderItems: filteredItem
                })
            )
            setLocalProductToCart({ ...parseData, [user?._id]: filteredItem })
        }
    }

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
        const filteredItem = cloneOrderItem.filter((item: TItemOrderProduct) => !selectedRow.includes(item.product))
        if (user) {
            dispatch(
                updateProductToCart({
                    orderItems: filteredItem
                })
            )
            setLocalProductToCart({ ...parseData, [user?._id]: filteredItem })
        }
    }

    const handleNavigateCheckout = () => {
        const formattedData = JSON.stringify(memoSelectedProduct.map((item: TItemOrderProduct) => ({
            product: item.product,
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

    return (
        <>
            {/* {loading || isLoading && <Spinner />} */}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px'
            }}>
                <Grid container>
                    {orderItems.length > 0 ? (
                        <Fragment>
                            <Grid container>
                                <Grid item md={1} xs={12}>
                                    <Tooltip title={t("select_all")}>
                                        <Checkbox onChange={handleCheckAll}
                                            checked={memoListAllProductIds.every((item) => selectedRow.includes(item))} />
                                    </Tooltip>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <Typography fontWeight={600}>{t("product_image")}</Typography>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Typography fontWeight={600}>{t("product_name")}</Typography>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <Typography fontWeight={600}>{t("price")}</Typography>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <Typography fontWeight={600}>{t("discount_price")}</Typography>
                                </Grid>
                                <Grid item md={1} xs={12}>
                                    <Typography>{t("quantity")}</Typography>
                                </Grid>
                                <Grid item md={1} xs={12}>
                                    <Typography>
                                        <Tooltip title={t("delete_all")}>
                                            <span>
                                                <IconButton
                                                    onClick={handleDeleteMany}
                                                    disabled={selectedRow.length === 0}>
                                                    <IconifyIcon icon="mdi:delete-outline" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container spacing={2}>
                                {orderItems.map((item: TItemOrderProduct, index: number) => {
                                    return (
                                        <Fragment key={item?.product}>
                                            <>
                                                <Grid item md={1}>
                                                    <Checkbox
                                                        checked={selectedRow.includes(item?.product)}
                                                        value={item?.product} onChange={(e) => {
                                                            handleChangeCheckBox(e.target.value)
                                                        }} />
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Avatar src={item?.image} sx={{ width: "100px", height: "100px" }} />
                                                </Grid>
                                                <Grid item md={3}>
                                                    <Typography fontSize={"24px"}>{item?.name}</Typography>
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Typography variant="h6" sx={{
                                                        color: item?.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                                                        fontWeight: "bold",
                                                        textDecoration: item?.discount > 0 ? "line-through" : "normal",
                                                        fontSize: "14px"
                                                    }}>
                                                        {formatPrice(item?.price)} VND
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Typography variant="h4" sx={{
                                                        color: theme.palette.primary.main,
                                                        fontWeight: "bold",
                                                        fontSize: "18px"
                                                    }}>
                                                        {item?.discount > 0 ? (
                                                            <>
                                                                {formatPrice(item?.price * (100 - item?.discount) / 100)} VND
                                                            </>
                                                        ) : (
                                                            <>
                                                                {formatPrice(item?.price)} VND
                                                            </>
                                                        )}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={1}>
                                                    <IconButton onClick={() => handleChangeQuantity(item, -1)}>
                                                        <IconifyIcon icon="eva:minus-fill" />
                                                    </IconButton>
                                                    <CustomTextField
                                                        type='number'
                                                        value={item?.amount}
                                                        InputProps={{
                                                            inputMode: "numeric",
                                                            inputProps: {
                                                                min: 1,
                                                            }
                                                        }}
                                                        sx={{
                                                            ".MuiInputBase-root.MuiFilledInput-root": {
                                                                width: "50px",
                                                                border: "none",
                                                            },
                                                            'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
                                                                WebkitAppearance: "none",
                                                                margin: 0
                                                            },
                                                            'input[type=number]': {
                                                                MozAppearance: "textfield"
                                                            }
                                                        }} />
                                                    <IconButton onClick={() => handleChangeQuantity(item, 1)}>
                                                        <IconifyIcon icon="ic:round-plus" />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item md={1}>
                                                    <IconButton onClick={() => handleDeleteProductInCart(item.product)}>
                                                        <IconifyIcon icon="mdi:delete-outline" />
                                                    </IconButton>
                                                </Grid>
                                            </>
                                            {index !== orderItems.length - 1 && <Divider />}
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        </Fragment>
                    ) : (
                        <Box sx={{
                            padding: "20px",
                            width: "100%",
                        }}>
                            <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                        </Box>
                    )}
                    <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "24px" }}>
                            {t('total_price')}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "24px", color: theme.palette.primary.main }}>
                            {formatPrice(memoTotalPrice)} VND
                        </Typography>
                    </Box>
                </Grid>
            </Box >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button type="submit"
                    variant="contained"
                    onClick={handleNavigateCheckout}
                    disabled={selectedRow.length === 0}
                    startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                    sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                    {t('buy_now')}
                </Button>
            </Box>
        </>
    )
}

export default MyCartPage
