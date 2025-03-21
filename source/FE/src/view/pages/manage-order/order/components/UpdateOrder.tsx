//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Avatar, Box, Button, FormHelperText, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//services
import { getUserDetail } from "src/services/user"

//translation
import { useTranslation } from "react-i18next"

//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import FileUploadWrapper from "src/components/file-upload-wrapper";
import { convertBase64, convertHTMLToDraft, stringToSlug } from "src/utils";
import { InputLabel } from "@mui/material";
import CustomSelect from "src/components/custom-select";
import { createProductAsync, updateProductAsync } from "src/stores/product/action";
import { getAllProductCategories } from "src/services/product-category";
import CustomDatePicker from "src/components/custom-date-picker";
import CustomEditor from "src/components/custom-editor";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { getProductDetail } from "src/services/product";
import { getAllCities } from "src/services/city";
import { getManageOrderDetail } from "src/services/order";
import { getAllPaymentMethods } from "src/services/payment-method";
import { getAllDeliveryMethods } from "src/services/delivery-method";
import { updateOrderAsync } from "src/stores/order/action";

interface TUpdateOrder {
    open: boolean
    onClose: () => void
    idOrder?: string
}

type TDefaultValues = {
    fullName: string,
    phone: string,
    address: string,
    city: string,
    paymentMethod: string,
    deliveryMethod: string,
    isPaid: number,
    isDelivery: number,
}

const UpdateOrder = (props: TUpdateOrder) => {

    //state
    const [loading, setLoading] = useState(false)
    const [productImage, setProductImage] = useState("")
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([])
    const [paymentOptions, setPaymentOptions] = useState<{ label: string, value: string }[]>([])
    const [deliveryOptions, setDeliveryOptions] = useState<{ label: string, value: string, price: string }[]>([])
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [selectedDelivery, setSelectedDelivery] = useState<string>('')

    //props
    const { open, onClose, idOrder } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        fullName: yup.string().required(t("required_product_fullname")),
        phone: yup.string().required(t("required_product_phone")),
        address: yup.string().required(t("required_product_address")),
        city: yup.string().required(t("required_product_city")),
        paymentMethod: yup.string().required(t("required_product_payment_method")),
        deliveryMethod: yup.string().required(t("required_product_delivery_method")),
        isPaid: yup.number().required(t("required_product_payment_status")),
        isDelivery: yup.number().required(t("required_product_delivery_status")),
    });

    const defaultValues: TDefaultValues = {
        fullName: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: '',
        deliveryMethod: '',
        isPaid: 0,
        isDelivery: 0,
    }

    const { handleSubmit, getValues, setError, clearErrors, control, formState: { errors }, reset } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            //update
            if (idOrder) {
                dispatch(updateOrderAsync({
                    id: idOrder,
                    shippingAddress: {
                        fullName: data?.fullName,
                        phone: data?.phone,
                        city: data?.phone,
                        address: data?.address,
                    },
                    isPaid: data.isPaid ? 1 : 0,
                    isDelivery: data?.isDelivery ? 1 : 0,
                    paymentMethod: data?.paymentMethod,
                    deliveryMethod: data?.deliveryMethod,
                }))
            }
        }
    }

    //handler

    const fetchOrderDetail = async (id: string) => {
        setLoading(true)
        await getManageOrderDetail(id).then((res) => {
            const data = res?.data
            if (data) {
                reset({
                    fullName: data?.shippingAddress?.fullName,
                    phone: data?.shippingAddress?.phone,
                    city: data?.shippingAddress?.phone,
                    address: data?.shippingAddress?.address,
                    isPaid: data?.isPaid,
                    isDelivery: data?.isDelivery,
                    paymentMethod: data?.paymentMethod,
                    deliveryMethod: data?.deliveryMethod,
                })
                setProductImage(data?.image)
            }
            setLoading(false)
        }).catch((e) => {
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

    const fetchAllPaymentMethod = async () => {
        setLoading(true)
        await getAllPaymentMethods({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            if (res?.data) {
                setPaymentOptions(res?.data?.paymentTypes?.map((item: { name: string, _id: string }) => ({
                    label: item?.name,
                    value: item?._id
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    const fetchAllDeliveryMethods = async () => {
        setLoading(true)
        await getAllDeliveryMethods({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            if (res?.data) {
                setDeliveryOptions(res?.data?.deliveryTypes?.map((item: { name: string, _id: string, price: string }) => ({
                    label: item?.name,
                    value: item?._id,
                    price: item?.price
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else {
            if (idOrder && open) {
                fetchOrderDetail(idOrder)
            }
        }
    }, [open, idOrder])

    useEffect(() => {
        fetchAllCities()
        fetchAllDeliveryMethods()
        fetchAllPaymentMethod()
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <CustomModal open={open} onClose={onClose}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.customColors.bodyBg,
                        padding: '20px',
                        borderRadius: '15px',
                    }}
                    minWidth={{ md: '40px', xs: '80vw' }}
                    maxWidth={{ md: '40vw', xs: '80vw' }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {t('update_order')}
                        </Typography>
                        <IconButton sx={{
                            position: 'absolute',
                            right: "-10px",
                            top: "-6px",
                        }}>
                            <IconifyIcon
                                icon="material-symbols-light:close-rounded"
                                fontSize={"30px"}
                                onClick={onClose}
                            />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: "15px",
                                py: 5, px: 4
                            }}>
                            <Grid container
                                spacing={4}
                            >
                                <Grid container item md={12} xs={12}>
                                    <Box sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                        <Grid container spacing={4}>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            required
                                                            label={t('customer_name')}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                const replacedValue = stringToSlug(value)
                                                                onChange(value)
                                                            }}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_customer_name')}
                                                            error={errors.fullName ? true : false}
                                                            helperText={errors.fullName?.message}
                                                        />
                                                    )}
                                                    name='fullName'
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            required
                                                            label={t('address')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_address')}
                                                            error={errors.address ? true : false}
                                                            helperText={errors.address?.message}
                                                        />
                                                    )}
                                                    name='address'
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            disabled
                                                            required
                                                            label={t('phone')}
                                                            onChange={(e) => {
                                                                const numberValue = e.target.value.replace(/\D/g, '');
                                                                onChange(numberValue);
                                                            }}
                                                            onBlur={onBlur}
                                                            inputProps={{
                                                                inputMode: 'numeric',
                                                                pattern: '[0-9]*',
                                                                minLength: 10
                                                            }}
                                                            value={value}
                                                            placeholder={t('enter_phone')}
                                                            error={errors.phone ? true : false}
                                                            helperText={errors.phone?.message}
                                                        />
                                                    )}
                                                    name='phone'
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='city'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box>
                                                            <InputLabel sx={{
                                                                fontSize: "13px",
                                                                mb: "4px",
                                                                display: "block",
                                                                color: errors?.city ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                            }}>
                                                                {t('city')}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={cityOptions}
                                                                placeholder={t('select_city')}
                                                                error={errors.city ? true : false}
                                                            />
                                                            {errors?.city?.message && (
                                                                <FormHelperText sx={{
                                                                    color: errors?.city ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                                }}>
                                                                    {errors?.city?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='deliveryMethod'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box>
                                                            <InputLabel sx={{
                                                                fontSize: "13px",
                                                                mb: "4px",
                                                                display: "block",
                                                                color: errors?.deliveryMethod ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                            }}>
                                                                {t('delivery_method')}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={deliveryOptions}
                                                                placeholder={t('select_delivery_method')}
                                                                error={errors.deliveryMethod ? true : false}
                                                            />
                                                            {errors?.deliveryMethod?.message && (
                                                                <FormHelperText sx={{
                                                                    color: errors?.deliveryMethod ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                                }}>
                                                                    {errors?.deliveryMethod?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='paymentMethod'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box>
                                                            <InputLabel sx={{
                                                                fontSize: "13px",
                                                                mb: "4px",
                                                                display: "block",
                                                                color: errors?.paymentMethod ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                            }}>
                                                                {t('payment_method')}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={paymentOptions}
                                                                placeholder={t('select_payment_method')}
                                                                error={errors.paymentMethod ? true : false}
                                                            />
                                                            {errors?.paymentMethod?.message && (
                                                                <FormHelperText sx={{
                                                                    color: errors?.paymentMethod ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                                }}>
                                                                    {errors?.paymentMethod?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => {
                                                        return (
                                                            <Box sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 4
                                                            }}>
                                                                <InputLabel sx={{
                                                                    fontSize: "13px",
                                                                    mb: "4px",
                                                                    display: "block",
                                                                    color: `rgba(${theme.palette.customColors.main}, 0.42)`
                                                                }}>
                                                                    {t('delivery_status')}
                                                                </InputLabel>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={Boolean(value)}
                                                                            value={value}
                                                                            onChange={
                                                                                (e) => onChange(e.target.checked ? 1 : 0)
                                                                            }
                                                                            sx={{
                                                                                '& .MuiSwitch-switchBase': {
                                                                                    color: theme.palette.common.white,
                                                                                },
                                                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                                                },
                                                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                                    backgroundColor: theme.palette.primary.main,
                                                                                },
                                                                                '& .MuiSwitch-track': {
                                                                                    backgroundColor: theme.palette.grey[400],
                                                                                },
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={Boolean(value) ? t('not_delivered') : t('delivered')}
                                                                    sx={{
                                                                        '& .MuiFormControlLabel-label': {
                                                                            color: theme.palette.text.primary,
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>
                                                        )
                                                    }}
                                                    name='isDelivery'
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => {
                                                        return (
                                                            <Box sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 4
                                                            }}>
                                                                <InputLabel sx={{
                                                                    fontSize: "13px",
                                                                    mb: "4px",
                                                                    display: "block",
                                                                    color: `rgba(${theme.palette.customColors.main}, 0.42)`
                                                                }}>
                                                                    {t('payment_status')}
                                                                </InputLabel>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={Boolean(value)}
                                                                            value={value}
                                                                            onChange={
                                                                                (e) => onChange(e.target.checked ? 1 : 0)
                                                                            }
                                                                            sx={{
                                                                                '& .MuiSwitch-switchBase': {
                                                                                    color: theme.palette.common.white,
                                                                                },
                                                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                                                },
                                                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                                    backgroundColor: theme.palette.primary.main,
                                                                                },
                                                                                '& .MuiSwitch-track': {
                                                                                    backgroundColor: theme.palette.grey[400],
                                                                                },
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={Boolean(value) ? t('not_paid') : t('paid')}
                                                                    sx={{
                                                                        '& .MuiFormControlLabel-label': {
                                                                            color: theme.palette.text.primary,
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>
                                                        )
                                                    }}
                                                    name='isPaid'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {t('update')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default UpdateOrder