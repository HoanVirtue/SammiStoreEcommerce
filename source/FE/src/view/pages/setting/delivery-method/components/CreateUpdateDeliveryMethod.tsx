//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//services
import { getDeliveryMethodDetail } from "src/services/delivery-method"

//translation
import { useTranslation } from "react-i18next"
//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createDeliveryMethodAsync, updateDeliveryMethodAsync } from "src/stores/delivery-method/action"

interface TCreateUpdateDeliveryMethod {
    open: boolean
    onClose: () => void
    idDeliveryMethod?: string
}

type TDefaultValues = {
    name: string,
    price: string
}

const CreateUpdateDeliveryMethod = (props: TCreateUpdateDeliveryMethod) => {

    //state
    const [loading, setLoading] = useState(false)

    //props
    const { open, onClose, idDeliveryMethod } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required(t("required_delivery_method_name")),
        price: yup.string().required(t("required_delivery_method_price"))
            .test('least_value_price', t('dm_at_least_price'), (value) => Number(value) >= 1000),
    });

    const defaultValues: TDefaultValues = {
        name: '',
        price: ''
    }

    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (idDeliveryMethod) {
                //update
                dispatch(updateDeliveryMethodAsync({
                    name: data?.name,
                    id: idDeliveryMethod,
                    price: data?.price
                }))
            } else {
                //create
                dispatch(createDeliveryMethodAsync({
                    name: data?.name,
                    price: data?.price
                }))
            }
        }
    }


    const fetchDetailDeliveryMethod = async (id: string) => {
        setLoading(true)
        await getDeliveryMethodDetail(id).then((res) => {
            const data = res?.data
            if (data) {
                reset({
                    name: data?.name,
                    price: data?.price
                })
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }


    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else {
            if (idDeliveryMethod && open) {
                fetchDetailDeliveryMethod(idDeliveryMethod)
            }
        }
    }, [open, idDeliveryMethod])

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
                    minWidth={{ md: '500px', xs: '80vw' }}
                    maxWidth={{ md: '50vw', xs: '80vw' }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {idDeliveryMethod ? t('update_delivery_method') : t('create_delivery_method')}
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
                            <Grid container item md={12} xs={12} spacing={5} >
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth

                                                required
                                                label={t('delivery_method_name')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_delivery_method_name')}
                                                error={errors.name ? true : false}
                                                helperText={errors.name?.message}
                                            />
                                        )}
                                        name='name'
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} mb={2} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth

                                                required
                                                label={t('delivery_method_price')}
                                                onChange={(e) => {
                                                    const numberValue = e.target.value.replace(/\D/g, '');
                                                    onChange(numberValue);
                                                }}
                                                onBlur={onBlur}
                                                inputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                }}
                                                value={value}
                                                placeholder={t('enter_delivery_method_price')}
                                                error={errors.price ? true : false}
                                                helperText={errors.price?.message}
                                            />
                                        )}
                                        name='price'
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {idDeliveryMethod ? t('update') : t('create')}
                            </Button>
                        </Box>
                    </form >
                </Box >
            </CustomModal >
        </>
    )
}

export default CreateUpdateDeliveryMethod