"use client"

//React
import React, { useContext, useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import GoogleIcon from '/public/svgs/google.svg'
import FacebookIcon from '/public/svgs/facebook.svg'


import clsx from 'clsx'

//hooks
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useTranslation } from '../../../../node_modules/react-i18next'

type TProps = {}

interface IDefaultValues {
    email: string
    password: string
}

const LoginPage: NextPage<TProps> = () => {
    //States
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

    //context
    const { login } = useAuth();

    //Theme
    const theme = useTheme();

      //translation
      const {t} = useTranslation()

    const schema = yup.object().shape({
        // email: yup.string().email().required("Email is required"),
        email: yup
            .string()
            .required(t("required_email"))
            .matches(EMAIL_REG, t("incorrect_email_format")),
        password: yup
            .string()
            .required(t("required_password"))
            .matches(PASSWORD_REG, t("incorrect_password_format")),
    });

    const { handleSubmit, control, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: { email: string, password: string }) => {
        if (!Object.keys(errors)?.length) {
            login({ ...data, rememberMe: isRemember }, (err) => {
                if (err?.response?.data?.typeError !== "") {
                    toast.error(err?.response?.message)
                }
            })
        }
    }

    return (
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
                    src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
                    alt="login-image" />
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
                    <Typography component="h1" variant="h5">{t("login")}</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                        <Box sx={{ mt: 4 }}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
                                        fullWidth
                                        label= {t("email")}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder= {t("enter_email")}
                                        error={errors.email ? true : false}
                                        helperText={errors.email?.message}
                                    />
                                )}
                                name='email'
                            />
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
                                        fullWidth
                                        label= {t("password")}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder= {t("enter_password")}
                                        helperText={errors.password?.message}
                                        error={errors.password ? true : false}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            // startAdornment: (
                                            //     <InputAdornment position="start">
                                            //         <IconifyIcon icon='material-symbols:visibility-outline' />
                                            //     </InputAdornment>
                                            // ),
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
                        </Box>
                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={isRemember}
                                        onChange={(e) => setIsRemember(e.target.checked)}
                                        color="primary" />
                                }
                                label= {t("remember_me")} />
                            <Link href="#">{t("forgot_password")}</Link>
                        </Box>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                            {t("login")}
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "4px" }}>
                            <Typography>
                                {t("dont_have_an_account")}
                            </Typography>
                            <Link
                                className={clsx('text-base',
                                    `theme.palette.mode === 'light' 
                                    ? text-[${theme.palette.common.black}]
                                    : text-[${theme.palette.common.white}]`)}
                                href="/register">
                                {t("register")}
                            </Link>
                        </Box>
                        <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>{t("or")}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                            <IconButton sx={{ color: theme.palette.error.main }}
                                aria-label="Social Icon" onClick={() => console.log('login with google')}>
                                <Image src={GoogleIcon} width={40} height={40} alt='google' />
                            </IconButton>
                            <IconButton sx={{ color: theme.palette.error.main }}
                                aria-label="Social Icon" onClick={() => console.log('login with facebook')}>
                                <Image src={FacebookIcon} width={40} height={40} alt='facebook' />
                            </IconButton>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box >
    )
}

export default LoginPage
