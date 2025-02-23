"use client"

//React
import React, { useEffect } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, FormHelperText, IconButton, InputLabel, useTheme } from '@mui/material'
import { Box, Button } from '@mui/material'

//Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//components
import CustomTextField from 'src/components/text-field'
import FileUploadWrapper from 'src/components/file-upload-wrapper'
import IconifyIcon from 'src/components/Icon'

//Configs
import { EMAIL_REG } from 'src/configs/regex'
import { Grid } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Service
import { getAuthMe } from 'src/services/auth'

//Types
import { UserDataType } from 'src/contexts/types'

//until
import { convertBase64, separationFullname, toFullName } from 'src/utils'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuthMeAsync } from 'src/stores/auth/action'
import { resetInitialState } from 'src/stores/auth'

//Other
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import Spinner from 'src/components/spinner'
import CustomSelect from 'src/components/custom-select'
import CustomModal from 'src/components/custom-modal'
import { getAllRoles } from 'src/services/role'
import { useAuth } from 'src/hooks/useAuth'
import { getAllCities } from 'src/services/city'
import CustomBreadcrumbs from 'src/components/custom-breadcrum'

type TProps = {}

interface TDefaultValues {
    email: string
    address: string
    city: string
    phoneNumber: string
    role: string
    fullName: string
}
const MyProfilePage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = React.useState<boolean>(false)
    const [avatar, setAvatar] = React.useState<string>('')
    const [roleOptions, setRoleOptions] = React.useState<{ label: string, value: string }[]>([])
    const [cityOptions, setCityOptions] = React.useState<{ label: string, value: string }[]>([])
    const [isDisableRole, setIsDisableRole] = React.useState<boolean>(false)

    //hooks
    const { setUser } = useAuth()
    const { i18n } = useTranslation();

    //Theme
    const theme = useTheme();

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color='primary' icon='healthicons:home-outline' /> },
        { label: t('my_profile'), href: '/my-profile' },
    ];

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector((state: RootState) => state.auth)

    const schema = yup.object().shape({
        email: yup
            .string()
            .required(t("required_email"))
            .matches(EMAIL_REG, t("incorrect_email_format")),
        fullName: yup.string().notRequired(),
        address: yup.string().notRequired(),
        city: yup.string().notRequired(),
        phoneNumber: yup.string().required(t("required_phone_number")).min(10, t("incorrect_phone_format")),
        role: isDisableRole ? yup.string().notRequired() : yup.string().required(t("required_role")),
    });

    const defaultValues: TDefaultValues = {
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        role: '',
        fullName: ''
    }

    const { handleSubmit, reset, control, formState: { errors } } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    //fetch api
    const fetchGetAuthMe = async () => {
        setLoading(true)
        await getAuthMe()
            .then(async response => {
                setLoading(false)
                const data = response?.data
                if (data) {
                    setIsDisableRole(!data?.role?.permissions?.length)
                    reset({
                        role: data?.role?._id,
                        email: data?.email,
                        address: data?.address,
                        city: data?.city,
                        phoneNumber: data?.phoneNumber,
                        fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language)
                    })
                    setAvatar(data?.avatar)
                    setUser({ ...data })
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const fetchAllRoles = async () => {
        setLoading(true)
        await getAllRoles({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.roles
            if (data) {
                setRoleOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })))
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

    useEffect(() => {
        fetchGetAuthMe()
    }, [i18n.language])


    useEffect(() => {
        if (messageUpdateMe) {
            if (isErrorUpdateMe) {
                toast.error(messageUpdateMe)
            }
            else if (isSuccessUpdateMe) {
                toast.success(messageUpdateMe)
                fetchGetAuthMe()
            }
        }
        dispatch(resetInitialState())
    }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])


    useEffect(() => {
        fetchAllRoles()
        fetchAllCities()
    }, [])

    const onSubmit = (data: any) => {
        const { firstName, middleName, lastName } = separationFullname(data.fullName, i18n.language)
        dispatch(updateAuthMeAsync({
            email: data.email,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            role: data.role,
            address: data.address,
            city: data.city,
            phoneNumber: data.phoneNumber,
            avatar
        }))
    }

    const handleUploadAvatar = async (file: File) => {
        const base64 = await convertBase64(file)
        setAvatar(base64 as string)
    }

    return (
        <>
            {loading || isLoading && <Spinner />}
            <Box sx={{
                paddingLeft: '0.75rem',
                backgroundColor: theme.palette.grey[100],
            }}>
                <CustomBreadcrumbs items={breadcrumbItems} />
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                <Box sx={{
                    width: "60%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    margin: "0 auto",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    mt: 10,
                    py: 5, px: 4,
                }}>
                    <Grid container md={12} xs={12} spacing={6} sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        paddingRight: "1.5rem"
                    }} >
                        <Grid item md={12} xs={12}>
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 2,
                            }}>
                                <Box sx={{
                                    position: "relative",
                                }}>
                                    {avatar && (
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                bottom: -4,
                                                right: -6,
                                                zIndex: 2,
                                                color: theme.palette.error.main
                                            }}
                                            edge="start"
                                            color="inherit"
                                            aria-label="delete-avatar"
                                            onClick={() => setAvatar('')}
                                        >
                                            <IconifyIcon icon="material-symbols:delete-rounded" />
                                        </IconButton>
                                    )}
                                    {avatar ? (
                                        <Avatar src={avatar} alt="avatar" sx={{ width: 100, height: 100 }}>
                                            <IconifyIcon icon="ph:user-thin" fontSize={70} />
                                        </Avatar>
                                    ) : (
                                        <Avatar alt="default-avatar" sx={{ width: 100, height: 100 }}>
                                            <IconifyIcon icon="ph:user-thin" fontSize={70} />
                                        </Avatar>
                                    )}
                                </Box>
                                <FileUploadWrapper uploadFile={handleUploadAvatar} objectAcceptedFile={{
                                    "image/jpeg": [".jpg", ".jpeg"],
                                    "image/png": [".png"]
                                }}>
                                    <Button variant="outlined" sx={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1
                                    }}>
                                        <IconifyIcon icon="ph:camera-thin" />
                                        {avatar ? t('change_avatar') : t('upload_avatar')}
                                    </Button>
                                </FileUploadWrapper>
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
                                        disabled
                                        fullWidth
                                        label="Email"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder='Enter your email'
                                        error={errors.email ? true : false}
                                        helperText={errors.email?.message}
                                    />
                                )}
                                name='email'
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        fullWidth
                                        label={t('full_name')}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder={t('enter_your_full_name')}
                                        error={errors.fullName ? true : false}
                                        helperText={errors.fullName?.message}
                                    />
                                )}
                                name='fullName'
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Controller
                                control={control}
                                name='address'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        fullWidth
                                        label={t('address')}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder={t('enter_your_address')}
                                        error={errors.address ? true : false}
                                        helperText={errors.address?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
                                        fullWidth
                                        label={t('phone_number')}
                                        onChange={(e) => {
                                            const numberValue = e.target.value.replace(/\D/g, '');
                                            onChange(numberValue);
                                        }}
                                        onBlur={onBlur}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            minLength: 8
                                        }}
                                        value={value}
                                        placeholder={t('enter_your_phone_number')}
                                        error={errors.phoneNumber ? true : false}
                                        helperText={errors.phoneNumber?.message}
                                    />
                                )}
                                name='phoneNumber'
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Controller
                                control={control}
                                name='city'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Box sx={{
                                        mt: -5
                                    }}>
                                        <InputLabel sx={{
                                            fontSize: "13px",
                                            mb: "4px",
                                            display: "block",
                                            color: errors?.city ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                        }}>
                                            {t('city')}
                                        </InputLabel>
                                        <CustomSelect
                                            fullWidth
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            options={cityOptions}
                                            placeholder={t('enter_your_city')}
                                            error={errors.city ? true : false}
                                        />
                                        {errors?.city?.message && (
                                            <FormHelperText sx={{
                                                color: !errors?.city ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                            }}>
                                                {errors?.city?.message}
                                            </FormHelperText>
                                        )}
                                    </Box>
                                )}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            {!isDisableRole && (
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Box sx={{
                                            mt: -5
                                        }}>
                                            <InputLabel sx={{
                                                fontSize: "13px",
                                                mb: "4px",
                                                display: "block",
                                                color: errors?.role ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                            }}>
                                                {t('role')}
                                            </InputLabel>
                                            <CustomSelect
                                                fullWidth
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                options={roleOptions}
                                                placeholder={t('enter_your_role')}
                                                error={errors.role ? true : false}
                                            />
                                            {!errors?.role?.message && (
                                                <FormHelperText sx={{
                                                    color: !errors?.role ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                }}>
                                                    {errors?.role?.message}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    )}
                                    name='role'
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "1.5rem"
                    }}>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                            {t('update')}
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default MyProfilePage
