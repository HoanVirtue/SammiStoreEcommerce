"use client"

//React
import React, { useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Divider, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { convertUpdateMultipleProductsCard, convertUpdateProductToCart, formatPrice, isExpired } from 'src/utils'
import { TItemOrderProduct, TOrderDetail, TOrderItem } from 'src/types/order'
import IconifyIcon from 'src/components/Icon'
import ConfirmDialog from 'src/components/confirm-dialog'
import { cancelOrderAsync } from 'src/stores/order/action'
import { OrderStatus, PaymentStatus } from 'src/configs/order'
import { Chip } from '@mui/material'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import { TProduct } from 'src/types/product'
import { updateProductToCart } from 'src/stores/order'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { PAYMENT_METHOD } from 'src/configs/payment'
import { createVNPayPaymentUrl, getVNPayPaymentIpn } from 'src/services/payment'
import Spinner from 'src/components/spinner'
import Image from 'src/components/image'


type TProps = {
    orderData: TOrderItem
}


const OrderCard: NextPage<TProps> = (props) => {

    const { orderData } = props

    //States
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    //hooks
    const { t, i18n } = useTranslation();
    const { user } = useAuth()
    const router = useRouter()
    const paymentData = PAYMENT_METHOD()


    //redux
    const dispatch: AppDispatch = useDispatch();
    const { isSuccessCancel, details } = useSelector((state: RootState) => state.order)

    //Theme
    const theme = useTheme();

    const handleConfirm = () => {
        dispatch(cancelOrderAsync(orderData.id))
    }

    // const handleUpdateProductToCart = (items: TItemOrderProduct[]) => {
    //     const productCart = getLocalProductFromCart()
    //     const parseData = productCart ? JSON.parse(productCart) : {}
    //     const listOrderItems = convertUpdateMultipleProductsCard(details, items)


    //     if (user?.id) {
    //         dispatch(
    //             updateProductToCart({
    //                 details: listOrderItems
    //             })
    //         )
    //         setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
    //     }
    // }


    // const handleBuyAgain = () => {
    //     handleUpdateProductToCart(orderData.details)
    //     router.push({
    //         pathname: ROUTE_CONFIG.MY_CART,
    //         query: {
    //             selected: orderData?.details?.map((item: TOrderDetail) => item.productId)
    //         }
    //     }, ROUTE_CONFIG.MY_CART)
    // }

    const handleNavigateDetail = () => {
        router.push(`${ROUTE_CONFIG.MY_ORDER}/${orderData.id}`)
    }

    const handlePaymentMethod = (type: string) => {
        switch (type) {
            case paymentData.VN_PAYMENT.value: {
                handlePaymentVNPay()
                break;
            }
            default:
                break
        }
    }

    const handlePaymentVNPay = async () => {
        setLoading(true)
        await createVNPayPaymentUrl({
            totalPrice: orderData.totalPrice,
            orderId: orderData.id,
            language: i18n.language === "vi" ? "vn" : i18n.language
        }).then((res) => {
            if (res.data) {
                window.open(res.data, "_blank", "noopener,noreferrer")
            }
            setLoading(false)
        })
    }


    //cancel order
    useEffect(() => {
        if (isSuccessCancel) {
            setOpenCancelDialog(false)
        }
    }, [isSuccessCancel])

    const memoDisableBuyAgain = useMemo(() => {
        return orderData.details?.some((item) => !item.quantity)
    }, [orderData.details])

    return (
        <>
            {loading && <Spinner />}
            <ConfirmDialog
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                handleCancel={() => setOpenCancelDialog(false)}
                handleConfirm={handleConfirm}
                title={t("confirm_cancel_order")}
                description={t("confirm_cancel_order_description")}
            />
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                padding: '2rem',
                borderRadius: '15px',
                width: "100%",
            }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    {!!(orderData?.orderStatus === OrderStatus.Completed.label) && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconifyIcon color={theme.palette.success.main}
                                icon='material-symbols-light:delivery-truck-speed-outline-rounded' />
                            <Typography component="span" color={theme.palette.success.main}>{t('order_has_been_delivered')}{' | '}</Typography>
                        </Box>
                    )}
                    {!!(orderData?.paymentStatus === PaymentStatus.Paid.label) && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconifyIcon color={theme.palette.success.main}
                                icon='streamline:payment-10' />
                            <Typography component="span" color={theme.palette.success.main}>{t('order_has_been_paid')}{' | '}</Typography>
                        </Box>
                    )}
                    <Typography sx={{ color: theme.palette.primary.main }}>{t((OrderStatus as any)[orderData?.orderStatus]?.label)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: "column", gap: 4 }}>
                    {orderData?.details?.map((item: TOrderDetail) => {
                        return (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", gap: 3 }} key={item.productId}>
                                <Box sx={{ border: `1px solid ${theme.palette.customColors.borderColor}`, height: 'fit-content' }}>
                                    <Image src={item?.imageUrl} sx={{ width: "80px", height: "80px" }} />
                                </Box>
                                <Box>
                                    <Box>
                                        <Typography fontSize={"18px"}>{item?.productName}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h4" sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: "bold",
                                            fontSize: "16px"
                                        }}>

                                            {formatPrice(item?.price)}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontSize={"16px"}>x{item?.quantity}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Divider />
                <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        {t('total_price')}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.primary.main }}>
                        {formatPrice(orderData.totalPrice)}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: 0,
                    gap: 4,
                    mt: 4
                }}>
                    {orderData.paymentStatus !== PaymentStatus.Paid.label && (
                        <Button variant="contained"
                            color='error'
                            onClick={() => handlePaymentMethod(orderData.paymentMethod)}
                            startIcon={<IconifyIcon icon="tabler:device-ipad-cancel" />}
                            sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                            {t('payment')}
                        </Button>
                    )}
                    {orderData.orderStatus !== OrderStatus.Completed.label && (
                        <Button variant="contained"
                            color='error'
                            onClick={() => setOpenCancelDialog(true)}
                            startIcon={<IconifyIcon icon="tabler:device-ipad-cancel" />}
                            sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                            {t('cancel_order')}
                        </Button>
                    )}
                    <Button variant="contained"
                        color='primary'
                        // onClick={() => handleBuyAgain()}
                        // disabled={!orderData?.countInStock}
                        startIcon={<IconifyIcon icon="bx:cart" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('buy_again')}
                    </Button>
                    <Button type="submit" variant="outlined"
                        onClick={() => handleNavigateDetail()}
                        startIcon={<IconifyIcon icon="icon-park-outline:view-grid-detail" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('view_detail')}
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default OrderCard
