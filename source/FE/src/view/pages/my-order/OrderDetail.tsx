"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Divider, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { useAuth } from 'src/hooks/useAuth'
import { TItemOrderProduct, TOrderDetail, TOrderItem } from 'src/types/order'
import { useRouter } from 'next/router'
import { TabsProps } from '@mui/material'
import Spinner from 'src/components/spinner'
import { toast } from 'react-toastify'
import { resetInitialState, updateProductToCart } from 'src/stores/order'
import { resetInitialState as resetReview } from 'src/stores/review'
import IconifyIcon from 'src/components/Icon'
import { convertUpdateMultipleProductsCard, formatDate, formatPrice } from 'src/utils'

import { getOrderDetail } from 'src/services/order'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import WriteReviewModal from './components/WriteReviewModal'
import { createVNPayPaymentUrl } from 'src/services/payment'
import { PAYMENT_METHOD } from 'src/configs/payment'
import { OrderStatus, PaymentStatus, ShippingStatus } from 'src/configs/order'

type TProps = {}

const STATUS_OPTION_VALUE = {
    ALL: 4,
    WAIT_PAYMENT: 0,
    WAIT_DELIVERY: 1,
    COMPLETED: 2,
    CANCELLED: 3,
}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        borderBottom: "none"
    }
}))

const MyOrderDetailPage: NextPage<TProps> = () => {
    //States

    const [orderData, setOrderData] = useState<TOrderItem>({} as any)
    const [isLoading, setIsLoading] = useState(false)
    const [openReview, setOpenReview] = useState({
        open: false,
        userId: 0,
        productId: 0
    })
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false)
    const paymentData = PAYMENT_METHOD()

    //hooks
    const { user } = useAuth()
    const { t, i18n } = useTranslation();
    const router = useRouter()


    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { isSuccessCancel, details, isErrorCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)

    const { isSuccessCreate, isErrorCreate, errorMessageCreate, isLoading: reviewLoading } = useSelector((state: RootState) => state.review)

    console.log("detaorouter", router)

    const orderId = typeof router.query.orderId === 'string' ? +router.query.orderId : 0

    //Fetch API
    const handleGetOrderDetail = async () => {
        setIsLoading(true)
        await getOrderDetail(orderId).then((res) => {
            setIsLoading(false)
            setOrderData(res?.data)
        })
    }

    const handleUpdateProductToCart = (items: TItemOrderProduct[]) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const listOrderItems = convertUpdateMultipleProductsCard(details, items)


        if (user?.id) {
            dispatch(
                updateProductToCart({
                    details: listOrderItems
                })
            )
            setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
        }
    }

    console.log("orderData", orderData?.details?.map((item: TOrderDetail) => item.productId))

    // const handleBuyAgain = () => {
    //     handleUpdateProductToCart(orderData?.details?.map((item: TOrderDetail) => item.productId))
    //     router.push({
    //         pathname: ROUTE_CONFIG.MY_CART,
    //         query: {
    //             selected: orderData?.details?.map((item: TItemOrderProduct) => item.productId)
    //         }
    //     }, ROUTE_CONFIG.MY_CART)
    // }



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
        setIsLoading(true)
        await createVNPayPaymentUrl({
            totalPrice: orderData.totalPrice,
            orderId: orderData.id,
            language: i18n.language === "vi" ? "vn" : i18n.language
        }).then((res) => {
            if (res.data) {
                window.open(res.data, "_blank", "noopener,noreferrer")
            }
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (orderId) {
            handleGetOrderDetail();
        }
    }, [orderId]);

    useEffect(() => {
        if (isSuccessCancel) {
            toast.success(t("cancel_order_success"))
            handleGetOrderDetail()
            dispatch(resetInitialState())
        } else if (isErrorCancel && errorMessageCancel) {
            toast.error(errorMessageCancel)
            dispatch(resetInitialState())
        }
    }, [isSuccessCancel, isErrorCancel, errorMessageCancel])

    useEffect(() => {
        if (isSuccessCreate) {
            toast.success(t("create_review_success"))
            handleGetOrderDetail()
            dispatch(resetReview())
            setOpenReview({ open: false, userId: 0, productId: 0 })
        } else if (isErrorCreate && errorMessageCreate) {
            toast.error(errorMessageCreate)
            dispatch(resetReview())
        }
    }, [isSuccessCreate, isErrorCreate, errorMessageCreate])


    return (
        <>
            {isLoading && <Spinner />}
            <WriteReviewModal
                open={openReview.open}
                productId={openReview.productId}
                userId={openReview.userId}
                onClose={() => setOpenReview({ open: false, userId: 0, productId: 0 })}
            />
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                padding: '2rem',
                borderRadius: '15px',
                width: "100%",
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 600, alignItems: 'center' }}>
                    <Button onClick={() => router.back()}
                        startIcon={<IconifyIcon icon='lets-icons:back' />}>
                        {t('')}
                    </Button>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        {!!(orderData?.shippingStatus === ShippingStatus.Delivered.label) && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconifyIcon color={theme.palette.success.main}
                                    icon='material-symbols-light:delivery-truck-speed-outline-rounded' />
                                <Typography component="span" color={theme.palette.success.main}>{t('order_has_been_delivered')}{' | '}</Typography>
                                {/* <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>{formatDate(orderData?.deliveryAt, { dateStyle: short })}</Typography> */}
                            </Box>
                        )}
                        {!!(orderData?.paymentStatus === PaymentStatus.Paid.label) && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconifyIcon color={theme.palette.success.main}
                                    icon='streamline:payment-10' />
                                <Typography component="span" color={theme.palette.success.main}>{t('order_has_been_paid')}{' | '}</Typography>
                                {/* <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>{formatDate(orderData?.paidAt, { dateStyle: short })}</Typography> */}
                            </Box>
                        )}
                        <Typography sx={{ color: theme.palette.primary.main }}>{t((OrderStatus as any)[orderData?.orderStatus]?.label)}</Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: "column", gap: 4 }}>
                    {orderData?.details?.map((item: TOrderDetail) => {
                        return (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", gap: 3 }} key={item.productId}>
                                <Box sx={{ border: `1px solid ${theme.palette.customColors.borderColor}`, height: 'fit-content' }}>
                                    <Avatar src={item?.imageUrl} sx={{ width: "80px", height: "80px" }} />
                                </Box>
                                <Box>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 3 }}>
                                        <Typography fontSize={"18px"}>{item?.productName}</Typography>
                                        {orderData?.orderStatus === OrderStatus.Completed.label && (
                                            <Button variant="outlined"
                                                color='primary'
                                                onClick={() => setOpenReview({
                                                    open: true,
                                                    productId: item?.productId,
                                                    userId: user ? user?.id : 0
                                                })}
                                                sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                                {t('write_review')}
                                            </Button>
                                        )}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('shipping_address')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {orderData?.customerAddress}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('phone_number')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {orderData?.phoneNumber}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('customer_name')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {orderData?.customerName}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('product_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {formatPrice(orderData?.totalPrice)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('shipping_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {formatPrice(orderData?.costShip)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('total_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.primary.main }}>
                                {formatPrice(orderData?.totalPrice)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: 0,
                    gap: 4,
                    mt: 4
                }}>
                    {orderData?.paymentStatus !== PaymentStatus.Paid.label && (
                        <Button variant="contained"
                            color='error'
                            onClick={() => handlePaymentMethod(orderData.paymentMethod)}
                            startIcon={<IconifyIcon icon="tabler:device-ipad-cancel" />}
                            sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                            {t('payment')}
                        </Button>
                    )}
                    {orderData?.orderStatus !== OrderStatus.Completed.label && (
                        <Button variant="contained"
                            color='error'
                            onClick={() => setOpenCancelDialog(true)}
                            startIcon={<IconifyIcon icon="tabler:device-ipad-cancel" />}
                            sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                            {t('cancel_order')}
                        </Button>
                    )}
                    <Button variant="outlined"
                        color='primary'
                        // onClick={() => handleBuyAgain()}
                        // disabled={!orderData?.countInStock}
                        startIcon={<IconifyIcon icon="bx:cart" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('buy_again')}
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default MyOrderDetailPage
