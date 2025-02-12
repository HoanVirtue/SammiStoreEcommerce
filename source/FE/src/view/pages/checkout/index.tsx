"use client"

//React
import React, { Fragment, useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Divider, FormControlLabel, Grid, Radio, RadioGroup, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { useAuth } from 'src/hooks/useAuth'
import { formatPrice, toFullName } from 'src/utils'
import { TItemOrderProduct } from 'src/types/order'
import IconifyIcon from 'src/components/Icon'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { getAllPaymentMethods } from 'src/services/payment-method'
import { getAllDeliveryMethods } from 'src/services/delivery-method'
import { FormControl } from '@mui/material'
import { FormLabel } from '@mui/material'
import { createOrderAsync } from 'src/stores/order/action'
import deliveryMethod from 'src/stores/delivery-method';
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/order'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import AddressModal from './components/AddressModal'

type TProps = {}

interface IDefaultValues {
    email: string
    address: string
    city: string
    phoneNumber: string
    role: string
    fullName: string
}
const CheckoutPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const [paymentOptions, setPaymentOptions] = useState<{ label: string, value: string }[]>([])
    const [deliveryOptions, setDeliveryOptions] = useState<{ label: string, value: string, price: string }[]>([])
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [selectedDelivery, setSelectedDelivery] = useState<string>('')
    const [openAddressModal, setOpenAddressModal] = useState(false)


    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessCreate, isErrorCreate, errorMessageCreate, typeError } = useSelector((state: RootState) => state.order)

    //memo
    const memoQueryProduct = useMemo(() => {
        const result = {
            totalPrice: 0,
            selectedProduct: []
        }
        const data: any = router.query
        if (data) {
            result.totalPrice = data.totalPrice || 0
            result.selectedProduct = data.selectedProduct ? JSON.parse(data.selectedProduct) : []
        }
        return result
    }, [router.query])

    //Fetch api

    const getListPaymentMethod = async () => {
        await getAllPaymentMethods({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            if (res?.data) {
                setPaymentOptions(res?.data?.paymentTypes?.map((item: { name: string, _id: string }) => ({
                    label: item?.name,
                    value: item?._id
                })))
                setSelectedPayment(res?.data?.paymentTypes?.[0]?._id)
            }
        })
    }

    const getListDeliveryMethod = async () => {
        await getAllDeliveryMethods({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            if (res?.data) {
                setDeliveryOptions(res?.data?.deliveryTypes?.map((item: { name: string, _id: string, price: string }) => ({
                    label: item?.name,
                    value: item?._id,
                    price: item?.price
                })))
                setSelectedDelivery(res?.data?.deliveryTypes?.[0]?._id)
            }
        })
    }

    //Handler
    const onChangeDelivery = (value: string) => {
        setSelectedDelivery(value)
    }

    const onChangePayment = (value: string) => {
        setSelectedPayment(value)
    }

    const handlePlaceOrder = () => {
        const shippingPrice = deliveryOptions?.find(item => item.value === selectedDelivery)?.price ?? 0
        const totalPrice = shippingPrice ? memoQueryProduct?.totalPrice + Number(shippingPrice) : memoQueryProduct?.totalPrice
        dispatch(createOrderAsync({
            orderItems: memoQueryProduct?.selectedProduct as TItemOrderProduct[],
            itemsPrice: memoQueryProduct?.totalPrice,
            paymentMethod: selectedPayment,
            deliveryMethod: selectedDelivery,
            shippingPrice: shippingPrice ? Number(shippingPrice) : 0,
            user: user ? user?._id : '',
            fullName: user ? toFullName(user?.lastName, user?.middleName, user?.firstName, i18n.language) : '',
            address: user ? user?.address : "",
            city: user ? user?.city : "",
            phone: user ? user?.phoneNumber : "",
            totalPrice: totalPrice
        }))
    }

    useEffect(() => {
        getListPaymentMethod()
        getListDeliveryMethod()
    }, [])

    useEffect(() => {
        if (isSuccessCreate) {
            toast.success(t("create_order_success"))
            dispatch(resetInitialState())
        } else if (isErrorCreate && errorMessageCreate) {
            toast.error(t(errorMessageCreate))
            dispatch(resetInitialState())
        }
    }, [isSuccessCreate, isErrorCreate, errorMessageCreate])


    return (
        <>
            {/* {loading || isLoading && <Spinner />} */}
            <AddressModal open={openAddressModal} onClose={()=>setOpenAddressModal(false)} />
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px',
                mb: 6
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconifyIcon icon="carbon:location" width={20} height={20} style={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontSize: "18px", fontWeight: "bold", mt: 1 }}>
                            {t("shipping_address")}
                        </Typography>
                    </Box>
                    <Box sx={{
                        // backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.1)}`,
                        padding: 2
                    }}>
                        {user?.addresses && user?.addresses?.length > 0 ? (
                            <Typography component="span">
                                {toFullName(user?.lastName || "", user?.middleName || "", user?.firstName || "", i18n.language)}
                            </Typography>
                        ) : (
                            <Button variant='outlined' 
                            onClick={()=>setOpenAddressModal(true)}>{t("add_address")}</Button>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                padding: '40px',
                borderRadius: '15px',
                flexDirection: 'column',
                gap: 4
            }}>
                <Grid container>
                    {memoQueryProduct?.selectedProduct?.length > 0 ? (
                        <Fragment>
                            <Grid container>
                                <Grid item md={3} xs={12}>
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
                                <Grid item md={2} xs={12}>
                                    <Typography>{t("quantity")}</Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container spacing={2}>
                                {memoQueryProduct?.selectedProduct?.map((item: TItemOrderProduct, index: number) => {
                                    return (
                                        <Fragment key={item?.product}>
                                            <>
                                                <Grid item md={3}>
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
                                                <Grid item md={2}>
                                                    <Typography variant="h6" sx={{
                                                        color: theme.palette.primary.main,
                                                        fontWeight: "bold",
                                                        fontSize: "14px"
                                                    }}>
                                                        {item?.amount}
                                                    </Typography>
                                                </Grid>
                                            </>
                                            {index !== memoQueryProduct?.selectedProduct?.length - 1 && <Divider />}
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        </Fragment>
                    ) : (
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Box sx={{
                                padding: "20px",
                                width: "100%",
                            }}>
                                <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Box >
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px',
                mt: 6
            }}>
                <Box>
                    <Box>
                        <FormControl>
                            <FormLabel id="radio-delivery-group" sx={{
                                fontWeight: "bold",
                                color: theme.palette.primary.main
                            }}>{t("delivery")}</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-delivery-group"
                                name="radio-delivery-group"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDelivery(e.target.value)}
                            >
                                {deliveryOptions.map((delivery) => {
                                    return (
                                        <FormControlLabel
                                            key={delivery.value}
                                            value={delivery.value}
                                            control={<Radio checked={selectedDelivery === delivery.value} />}
                                            label={delivery.label}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel id="radio-payment-group" sx={{
                                fontWeight: "bold",
                                color: theme.palette.primary.main
                            }}>{t("payment")}</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-payment-group"
                                name="radio-payment-group"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePayment(e.target.value)}
                            >
                                {paymentOptions.map((payment) => {
                                    return (
                                        <FormControlLabel
                                            key={payment.value}
                                            value={payment.value}
                                            control={<Radio checked={selectedPayment === payment.value} />}
                                            label={payment.label}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button type="submit"
                    variant="contained"
                    onClick={handlePlaceOrder}
                    startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                    sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                    {t('place_order')}
                </Button>
            </Box>
        </>
    )
}

export default CheckoutPage
