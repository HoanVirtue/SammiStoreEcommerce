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
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/order'
import AddressModal from './components/AddressModal'
import { getAllCities } from 'src/services/city'
import Spinner from 'src/components/spinner'
import WarningModal from './components/WarningModal'

type TProps = {}

const CheckoutPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const [paymentOptions, setPaymentOptions] = useState<{ label: string, value: string }[]>([])
    const [deliveryOptions, setDeliveryOptions] = useState<{ label: string, value: string, price: string }[]>([])
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [selectedDelivery, setSelectedDelivery] = useState<string>('')
    const [openAddressModal, setOpenAddressModal] = useState(false)
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([])
    const [openWarning, setOpenWarning] = useState(false)

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessCreate, isErrorCreate, errorMessageCreate, typeError, orderItems } = useSelector((state: RootState) => state.order)


    const handleFormatProductData = (items: any) => {
        const objectMap: Record<string, TItemOrderProduct> = {}
        orderItems.forEach((order: any) => {
            objectMap[order.product] = order
        })
        return items.map((item: any) => {
            return {
                ...objectMap[item.product],
                amount: item.amount
            }
        })
    }

    //memo
    const memoQueryProduct = useMemo(() => {
        const result = {
            totalPrice: 0,
            selectedProduct: []
        }
        const data: any = router.query
        if (data) {
            result.totalPrice = data.totalPrice || 0
            result.selectedProduct = data.selectedProduct ? handleFormatProductData(JSON.parse(data.selectedProduct)) : []
        }
        return result
    }, [router.query, orderItems])

    const memoDefaultAddress = useMemo(() => {
        const findAddress = user?.addresses?.find(item => item.isDefault === true)
        return findAddress
    }, [user?.addresses])


    const memoCityName = useMemo(() => {
        if (memoDefaultAddress) {
            const findCity = cityOptions.find((item) => item.value === memoDefaultAddress?.city)
            return findCity?.label
        }
        return ''
    }, [memoDefaultAddress, cityOptions])

    const memoShippingPrice = useMemo(() => {
        const shippingPrice = deliveryOptions?.find(item => item.value === selectedDelivery)?.price ?? 0
        return shippingPrice ? Number(shippingPrice) : 0
    }, [selectedDelivery])


    //Fetch api

    const getListPaymentMethod = async () => {
        setLoading(true)
        await getAllPaymentMethods({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            if (res?.data) {
                setPaymentOptions(res?.data?.paymentTypes?.map((item: { name: string, _id: string }) => ({
                    label: item?.name,
                    value: item?._id
                })))
                setSelectedPayment(res?.data?.paymentTypes?.[0]?._id)
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    const getListDeliveryMethod = async () => {
        setLoading(true)
        await getAllDeliveryMethods({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            if (res?.data) {
                setDeliveryOptions(res?.data?.deliveryTypes?.map((item: { name: string, _id: string, price: string }) => ({
                    label: item?.name,
                    value: item?._id,
                    price: item?.price
                })))
                setSelectedDelivery(res?.data?.deliveryTypes?.[0]?._id)
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    const fetchAllCities = async () => {
        setLoading(true)
        await getAllCities({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.cities
            if (data) {
                setCityOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
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

        const totalPrice = memoShippingPrice ? memoQueryProduct?.totalPrice + Number(memoShippingPrice) : memoQueryProduct?.totalPrice
        dispatch(createOrderAsync({
            orderItems: memoQueryProduct?.selectedProduct as TItemOrderProduct[],
            itemsPrice: memoQueryProduct?.totalPrice,
            paymentMethod: selectedPayment,
            deliveryMethod: selectedDelivery,
            shippingPrice: memoShippingPrice ? Number(memoShippingPrice) : 0,
            user: user ? user?._id : '',
            fullName: memoDefaultAddress ? toFullName(memoDefaultAddress?.lastName, memoDefaultAddress?.middleName, memoDefaultAddress?.firstName, i18n.language) : '',
            address: memoDefaultAddress ? memoDefaultAddress?.address : "",
            city: memoDefaultAddress ? memoDefaultAddress?.city : "",
            phone: memoDefaultAddress ? memoDefaultAddress?.phoneNumber : "",
            totalPrice: totalPrice
        }))
    }

    console.log(router.query)

    useEffect(() => {
        if (!router?.query?.selectedProduct) {
            setOpenWarning(true)
        }
    }, [router.query])

    useEffect(() => {
        getListPaymentMethod()
        getListDeliveryMethod()
        fetchAllCities()
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
            {loading || (isLoading && <Spinner />)}
            <WarningModal open={openWarning} onClose={() => setOpenWarning(false)} />
            <AddressModal open={openAddressModal} onClose={() => setOpenAddressModal(false)} />
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px',
                mb: 6
            }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flexDirection: "column" }}>
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
                            <Box sx={{ display: "flex", alignItems: 'center', gap: 2 }}>
                                <Typography component="span" sx={{ fontWeight: "bold", fontSize: '18px' }}>
                                    {memoDefaultAddress?.phoneNumber}{" "}
                                    {toFullName(memoDefaultAddress?.lastName || "",
                                        memoDefaultAddress?.middleName || "",
                                        memoDefaultAddress?.firstName || "", i18n.language)}
                                </Typography>
                                <Typography component='span' sx={{ fontSize: '18px' }}>
                                    {memoDefaultAddress?.address}{" "}{memoCityName}
                                </Typography>
                                <Button variant='outlined'
                                    onClick={() => setOpenAddressModal(true)}>{t("change_address")}
                                </Button>
                            </Box>
                        ) : (
                            <Button variant='outlined'
                                onClick={() => setOpenAddressModal(true)}>{t("add_address")}
                            </Button>
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
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px',
                mt: 6
            }}>
                <Box sx={{ width: "100%" }}>
                    <Box>
                        <FormControl>
                            <FormLabel id="radio-delivery-group" sx={{
                                fontWeight: "bold",
                                color: theme.palette.primary.main
                            }}>{t("delivery_method")}</FormLabel>
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
                            }}>{t("payment_method")}</FormLabel>
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
                    <Box sx={{ display: "flex", width: '100%', mt: 3, gap: 1, alignItems: "flex-end", flexDirection: 'column' }}>
                        <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontSize: "20px", width: '200px' }}>
                                {t('product_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '200px', fontSize: "20px" }}>
                                {formatPrice(memoQueryProduct.totalPrice)} VND
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontSize: "20px", width: '200px' }}>
                                {t('shipping_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '200px', fontSize: "20px" }}>
                                {formatPrice(memoShippingPrice)} VND
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "24px", width: '200px' }}>
                                {t('total_price')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "24px", width: '200px', color: theme.palette.primary.main }}>
                                {formatPrice(Number(memoQueryProduct.totalPrice) + +memoShippingPrice)} VND
                            </Typography>
                        </Box>
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
