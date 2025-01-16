"use client"

//React
import React, { useContext, useState } from 'react'

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
import { useTranslation } from 'react-i18next'

type TProps = { }

interface IDefaultValues {
    email: string
    password: string
}

const LoginPage: NextPage<TProps> = () => {
    //States
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

    //context
    const {login} = useAuth();

    //translate
    const {t} = useTranslation()

    //Theme
    const theme = useTheme();

    const schema = yup.object().shape({
        // email: yup.string().email().required("Email is required"),
        email: yup
            .string()
            .required("Email is required")
            .matches(EMAIL_REG, "The email format is incorrect"),
        password: yup
            .string()
            .required("Password is required")
            .matches(PASSWORD_REG, "The password format is incorrect")
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
        if(!Object.keys(errors)?.length){
            login({...data, rememberMe: isRemember}, (err) => {
                if(err?.response?.data?.typeError === "INVALID"){
                    toast.error(t("incorrect_email_password"))
                    // setError('email', {type: 'invalid', message: 'Email or password is incorrect'})
                }
            })
        }
        console.log({data, errors}, "dataaaaaa")
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
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                        <Box sx={{ mt: 1 }}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
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
                            {/* {errors.email && <Typography>{errors.email.message}</Typography>} */}
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
                                        fullWidth
                                        label="Password"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder='Enter your password'
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
                                label="Remember me" />
                            <Link href="#">Forgot password?</Link>
                        </Box>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                            Sign in
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "4px" }}>
                            <Typography>
                                {"Don't have an account?"}
                            </Typography>
                            <Link
                                className={clsx('text-base',
                                    `theme.palette.mode === 'light' 
                                    ? text-[${theme.palette.common.black}]
                                    : text-[${theme.palette.common.white}]`)}
                                href="register">
                                {"Sign Up"}
                            </Link>
                        </Box>
                        <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
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
