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
import { TItemOrderProduct, TOrderItem } from 'src/types/order'
import { useRouter } from 'next/router'
import { TabsProps } from '@mui/material'
import Spinner from 'src/components/spinner'
import toast from 'react-hot-toast'
import { resetInitialState, updateProductToCart } from 'src/stores/order'
import { resetInitialState as resetReview } from 'src/stores/review'
import IconifyIcon from 'src/components/Icon'
import { convertUpdateMultipleProductsCard, formatPrice } from 'src/utils'
import { ORDER_STATUS } from 'src/configs/order'
import { getOrderDetail } from 'src/services/order'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import WriteReviewModal from './components/WriteReviewModal'

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
        userId: "",
        productId: ""
    })

    //hooks
    const { user } = useAuth()
    const { t } = useTranslation();
    const router = useRouter()


    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { isSuccessCancel, orderItems, isErrorCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)

    const { isSuccessCreate, isErrorCreate, errorMessageCreate, isLoading: reviewLoading } = useSelector((state: RootState) => state.review)

    const orderId = router.query.orderId as string

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
        const listOrderItems = convertUpdateMultipleProductsCard(orderItems, items)


        if (user?._id) {
            dispatch(
                updateProductToCart({
                    orderItems: listOrderItems
                })
            )
            setLocalProductToCart({ ...parseData, [user?._id]: listOrderItems })
        }
    }

    const handleBuyAgain = () => {
        handleUpdateProductToCart(orderData?.orderItems)
        router.push({
            pathname: ROUTE_CONFIG.MY_CART,
            query: {
                selected: orderData?.orderItems?.map((item: TItemOrderProduct) => item.product)
            }
        }, ROUTE_CONFIG.MY_CART)
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
            setOpenReview({ open: false, userId: "", productId: "" })
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
                onClose={() => setOpenReview({ open: false, userId: "", productId: "" })}
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
                        {t('back')}
                    </Button>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {orderData?.status === 2 && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconifyIcon icon='carbon:delivery' />
                                <Typography component="span" color={theme.palette.success.main}>{t('order_has_been_delivered')}{' | '}</Typography>
                            </Box>
                        )}
                        <Typography sx={{ color: theme.palette.primary.main }}>{t((ORDER_STATUS as any)[orderData?.status]?.label)}</Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: "column", gap: 4 }}>
                    {orderData?.orderItems?.map((item: TItemOrderProduct) => {
                        return (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", gap: 3 }} key={item.product}>
                                <Box sx={{ border: `1px solid ${theme.palette.customColors.borderColor}`, height: 'fit-content' }}>
                                    <Avatar src={item?.image} sx={{ width: "80px", height: "80px" }} />
                                </Box>
                                <Box>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 3 }}>
                                        <Typography fontSize={"18px"}>{item?.name}</Typography>
                                        {orderData?.status === +ORDER_STATUS[2].value && (
                                            <Button variant="outlined"
                                                color='primary'
                                                onClick={() => setOpenReview({
                                                    open: true,
                                                    productId: item?.product,
                                                    userId: user ? user?._id : ''
                                                })}
                                                sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                                {t('write_review')}
                                            </Button>
                                        )}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{
                                            color: item?.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                                            fontWeight: "bold",
                                            textDecoration: item?.discount > 0 ? "line-through" : "normal",
                                            fontSize: "12px"
                                        }}>
                                            {formatPrice(item?.price)} VND
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h4" sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: "bold",
                                            fontSize: "16px"
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
                                    </Box>
                                    <Box>
                                        <Typography fontSize={"16px"}>x{item?.amount}</Typography>
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
                                {orderData?.shippingAddress?.address}{' '}{orderData?.shippingAddress?.city?.name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('phone_number')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {orderData?.shippingAddress?.phone}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('customer_name')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {orderData?.shippingAddress?.fullName}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('product_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {formatPrice(orderData?.itemsPrice)} VND
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('shipping_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.secondary.main }}>
                                {formatPrice(orderData?.shippingPrice)} VND
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", width: '200px' }}>
                                {t('total_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.primary.main }}>
                                {formatPrice(orderData?.totalPrice)} VND
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
                    <Button variant="outlined"
                        color='primary'
                        onClick={() => handleBuyAgain()}
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
