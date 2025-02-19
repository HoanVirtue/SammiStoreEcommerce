"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import Image from 'next/image'

//MUI
import { IconButton, InputAdornment, useTheme } from '@mui/material'
import { Box, Button, Checkbox, CssBaseline, FormControlLabel, Typography } from '@mui/material'

//Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//components
import CustomTextField from 'src/components/text-field'
import IconifyIcon from 'src/components/Icon'

//Configs
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

//Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import GoogleIcon from '/public/svgs/google.svg'
import FacebookIcon from '/public/svgs/facebook.svg'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { registerAuthAsync } from 'src/stores/auth/action'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/auth'
import { useRouter } from 'next/navigation'
import { ROUTE_CONFIG } from 'src/configs/route'
import { useTranslation } from 'react-i18next'

type TProps = {}

interface IDefaultValues {
    email: string
    password: string
    confirmPassword: string
}
const RegisterPage: NextPage<TProps> = () => {
    //States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const [isRemember, setIsRemember] = useState(false);

    //router
    const router = useRouter();

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

    //Theme
    const theme = useTheme();

    //translation
    const { t } = useTranslation()

    const schema = yup.object().shape({
        // email: yup.string().email().required(t("required_email")),
        email: yup
            .string()
            .required(t("required_email"))
            .matches(EMAIL_REG, t("incorrect_email_format")),
        password: yup
            .string()
            .required(t("required_password"))
            .matches(PASSWORD_REG, t("incorrect_password_format")),
        confirmPassword: yup
            .string()
            .required(t("required_confirm_password"))
            .matches(PASSWORD_REG, t("incorrect_confirm_password_format"))
            .oneOf([yup.ref('password'), ''], t('password_not_match')),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: { email: string, password: string }) => {
        if (!Object.keys(errors).length) {
            dispatch(registerAuthAsync({ email: data.email, password: data.password }))
        }
    }

    useEffect(() => {
        if (message) {
            if (isError) {
                toast.error(message)
            }
            else if (isSuccess) {
                toast.success(message)
                router.push(ROUTE_CONFIG.LOGIN)
            }
        }
        dispatch(resetInitialState())
    }, [isError, isSuccess, message])

    return (
        <>
            {isLoading && <FallbackSpinner />}
            <Box sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
            }}>
                <Box
                    display={{
                        xs: 'none',
                        sm: 'flex',
                    }}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        borderRadius: '20px',
                        height: '100%',
                        backgroundColor: theme.palette.customColors.bodyBg,
                        minWidth: '50vw',
                    }}>
                    <Image
                        className='w-auto h-auto'
                        priority
                        quality={100}
                        src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
                        alt="Register-image" />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    <CssBaseline />
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography component="h1" variant="h5">{t('register')}</Typography>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                            <Box sx={{ mt: 4 }} width={{ md: '18rem', xs: '20rem' }}>
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label={t('email')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_email')}
                                            error={errors.email ? true : false}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                    name='email'
                                />
                                {/* {errors.email && <Typography>{errors.email.message}</Typography>} */}
                            </Box>
                            <Box sx={{ mt: 4 }} width={{ md: '18rem', xs: '20rem' }}>
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label={t('password')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_password')}
                                            helperText={errors.password?.message}
                                            error={errors.password ? true : false}
                                            type={showPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showPassword ? 'hide the password' : 'display the password'
                                                            }
                                                            edge="end"
                                                            onClick={() => setShowPassword(!showPassword)}>
                                                            {
                                                                showPassword ?
                                                                    <IconifyIcon icon='material-symbols:visibility-outline' />
                                                                    :
                                                                    <IconifyIcon icon='material-symbols:visibility-off-outline-rounded' />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                    name='password'
                                />
                                {/* {errors.password && <Typography>{errors.password.message}</Typography>} */}
                            </Box>
                            <Box sx={{ mt: 4 }} width={{ md: '18rem', xs: '20rem' }}>
                                <Controller
                                    control={control}
                                    name='confirmPassword'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label={t('confirm_password')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_confirm_password')}
                                            helperText={errors.confirmPassword?.message}
                                            error={errors.confirmPassword ? true : false}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showConfirmPassword ? 'hide the confirm password' : 'display the confirm password'
                                                            }
                                                            edge="end"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                            {
                                                                showConfirmPassword ?
                                                                    <IconifyIcon icon='material-symbols:visibility-outline' />
                                                                    :
                                                                    <IconifyIcon icon='material-symbols:visibility-off-outline-rounded' />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {t('register')}
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "4px" }}>
                                <Typography>
                                    {t('already_have_an_account')}
                                </Typography>
                                <Link
                                    className={`text-[${theme.palette.primary.main}]`}
                                    href="/login">
                                    {t('login')}
                                </Link>
                            </Box>
                            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>{t('or')}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                                <IconButton sx={{ color: theme.palette.error.main }}
                                    aria-label="Social Icon" onClick={() => console.log('Register with google')}>
                                    <Image src={GoogleIcon} width={40} height={40} alt='google' />
                                </IconButton>
                                <IconButton sx={{ color: theme.palette.error.main }}
                                    aria-label="Social Icon" onClick={() => console.log('Register with facebook')}>
                                    <Image src={FacebookIcon} width={40} height={40} alt='facebook' />
                                </IconButton>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default RegisterPage
