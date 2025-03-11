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
import ProductCartItem from './components/ProductCartItem'

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

    //Redux
    const dispatch: AppDispatch = useDispatch();
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

    const memoTotalPrice = useMemo(() => {
        const total = memoSelectedProduct?.reduce((result: number, current: TItemOrderProduct) => {

            const currentPrice = current?.discount && current?.discount > 0 ? (current?.price * (100 - current?.discount*100)) / 100 : current?.price
            return result + currentPrice * current?.amount
        }, 0)
        return total
    }, [memoSelectedProduct])


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
        console.log("router.query", isChecked )
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

    return (
        <>
            {/* {loading || isLoading && <Spinner />} */}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px',
                width: 'fit-content !important',
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
                                                    <IconifyIcon icon="carbon:trash-can" />
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
                                        <ProductCartItem item={item}
                                            key={item.productId}
                                            handleChangeCheckBox={handleChangeCheckBox}
                                            selectedRow={selectedRow}
                                            index={index} />
                                    )
                                })}
                            </Grid>
                        </Fragment>
                    ) : (
                        <Box sx={{
                            padding: "20px",
                            width: "fit-content !important",
                        }}>
                            <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                        </Box>
                    )}
                    <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "24px" }}>
                            {t('total_price')}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "24px", color: theme.palette.primary.main }}>
                            {formatPrice(memoTotalPrice)}đ
                        </Typography>
                    </Box>
                </Grid>
            </Box >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button type="submit"
                    variant="contained"
                    onClick={handleNavigateCheckout}
                    disabled={selectedRow.length === 0 || !memoSelectedProduct.length}
                    startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                    sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                    {t('buy_now')}
                </Button>
            </Box>
        </>
    )
}

export default MyCartPage
