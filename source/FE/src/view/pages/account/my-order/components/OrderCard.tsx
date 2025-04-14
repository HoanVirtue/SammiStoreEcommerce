"use client"

//React
import React, { useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import {  Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'

//Dynamic imports
import dynamic from 'next/dynamic'

//Other
import { formatPrice } from 'src/utils'
import { TOrderDetail, TOrderItem } from 'src/types/order'
import IconifyIcon from 'src/components/Icon'
import { cancelOrderAsync, createOrderAsync } from 'src/stores/order/action'
import { OrderStatus, PaymentStatus } from 'src/configs/order'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { toast } from 'react-toastify'
import { createCartAsync, getCartsAsync } from 'src/stores/cart/action'
import Spinner from 'src/components/spinner'
import Image from 'next/image'

//Components
const ConfirmDialog = dynamic(() => import('src/components/confirm-dialog'), { ssr: false })

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
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch();
    const { isSuccessCancel, isSuccessCreate, errorMessageCancel, errorMessageCreate } = useSelector((state: RootState) => state.order)
    const { isSuccessCreate: isSuccessCreateCart, errorMessageCreate: errorMessageCreateCart } = useSelector((state: RootState) => state.cart)

    //Memoized values
    const memoDisableBuyAgain = useMemo(() => {
        return orderData.details?.some((item) => !item.quantity)
    }, [orderData.details])

    const handleConfirm = () => {
        dispatch(cancelOrderAsync(orderData.code))
    }

    const handleAddProductToCart = async (item: TOrderDetail) => {
        if (!user?.id) return

        try {
            await dispatch(
                createCartAsync({
                    cartId: 0,
                    productId: item.productId,
                    quantity: item.quantity,
                    operation: 0,
                })
            ).unwrap()

            if (isSuccessCreateCart) {
                await dispatch(
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
                )
            } else {
                toast.error(errorMessageCreateCart)
            }
        } catch (error) {
            toast.error(errorMessageCreateCart)
        }
    }

    const handleBuyAgain = async () => {
        let hasError = false;
        for (const item of orderData.details || []) {
            try {
                await dispatch(
                    createCartAsync({
                        cartId: 0,
                        productId: item.productId,
                        quantity: item.quantity,
                        operation: 0,
                    })
                ).unwrap();

                if (!isSuccessCreateCart) {
                    hasError = true;
                    toast.error(errorMessageCreateCart);
                    break;
                }
            } catch (error) {
                hasError = true;
                toast.error(errorMessageCreateCart);
                break;
            }
        }

        if (!hasError) {
            await dispatch(
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
            router.push({
                pathname: ROUTE_CONFIG.MY_CART,
                query: {
                    selected: orderData?.details?.map((item: TOrderDetail) => item.productId)
                }
            }, ROUTE_CONFIG.MY_CART);
        }
    }

    const handleNavigateDetail = () => {
        router.push(`${ROUTE_CONFIG.ACCOUNT.MY_ORDER}/${orderData.id}`)
    }

    const handlePayment = async () => {
        setLoading(true);
        try {
            // First create the order
            const orderDetails = orderData.details?.map((item: TOrderDetail) => ({
                orderId: 0,
                productId: Number(item.productId),
                quantity: item.quantity,
                tax: 0,
                id: 0,
                amount: item.price * item.quantity,
            }));

            const createOrderResponse = await dispatch(
                createOrderAsync({
                    displayOrder: 0,
                    customerId: user?.id || 0,
                    code: orderData.code,
                    paymentStatus: orderData.paymentStatus,
                    orderStatus: orderData.orderStatus,
                    shippingStatus: orderData.shippingStatus,
                    voucherId: orderData.voucherId,
                    wardId: orderData.wardId,
                    customerAddress: orderData.customerAddress,
                    costShip: orderData.costShip,
                    trackingNumber: orderData.trackingNumber,
                    estimatedDeliveryDate: orderData.estimatedDeliveryDate,
                    actualDeliveryDate: orderData.actualDeliveryDate,
                    shippingCompanyId: orderData.shippingCompanyId,
                    details: orderDetails || [],
                    totalAmount: orderData.totalPrice,
                    totalQuantity: orderData.details?.reduce((acc, item) => acc + item.quantity, 0) || 0,
                    discountAmount: orderData.discountAmount,
                    isBuyNow: true,
                    paymentMethodId: 2,
                })
            ).then(res => {
                const returnUrl = res?.payload?.result?.returnUrl;
                if (returnUrl) {
                    window.location.href = returnUrl;
                } else {
                    router.push(ROUTE_CONFIG.PAYMENT)
                }
            });
        } catch (error: any) {
            toast.error(error?.message || errorMessageCreate);
        } finally {
            setLoading(false);
        }
    }

    const handlePaymentMethod = () => {
        handlePayment();
    }

    const handlePaymentVNPay = () => {
        handlePayment();
    }

    //cancel order
    useEffect(() => {
        if (isSuccessCancel) {
            setOpenCancelDialog(false)
        }
    }, [isSuccessCancel])

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
                    <Typography sx={{ color: theme.palette.primary.main }}>{t((OrderStatus as any)[orderData?.orderStatus]?.title)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: "column", gap: 4 }}>
                    {orderData?.details?.map((item: TOrderDetail) => {
                        return (
                            <Stack direction="row" alignItems="center" key={item.productId}>
                                <Box sx={{ border: `1px solid ${theme.palette.customColors.borderColor}`, height: 'fit-content' }}>
                                    <Image src={item?.imageUrl} alt={item?.productName} width={80} height={80} />
                                </Box>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" key={item.productId} sx={{ px: 4, width: "100%" }}>
                                    <Stack >
                                        <Box>
                                            <Typography fontSize={"18px"} fontWeight={600}  >{item?.productName}</Typography>
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
                                    </Stack>
                                    <Box>
                                        <Typography fontSize={"16px"}>x{item?.quantity}</Typography>
                                    </Box>
                                </Stack>
                            </Stack>
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
                    {(orderData.orderStatus === OrderStatus.Pending.label
                        || orderData.orderStatus === OrderStatus.WaitingForPayment.label)
                        && orderData.paymentStatus !== PaymentStatus.Paid.label
                        && (
                            <Button variant="contained"
                                color='primary'
                                onClick={() => handlePaymentMethod()}
                                startIcon={<IconifyIcon icon="tabler:device-ipad-cancel" />}
                                sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                {t('go_to_payment')}
                            </Button>
                        )}
                    {orderData.orderStatus === OrderStatus.Pending.label && (
                        <Button variant="contained"
                            color='error'
                            onClick={() => setOpenCancelDialog(true)}
                            startIcon={<IconifyIcon icon="lsicon:order-close-outline" />}
                            sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                            {t('cancel_order')}
                        </Button>
                    )}
                    <Button variant="contained"
                        color='primary'
                        onClick={() => handleBuyAgain()}
                        disabled={memoDisableBuyAgain}
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
