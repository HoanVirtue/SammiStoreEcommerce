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
import { PASSWORD_REG } from 'src/configs/regex'

//Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { changePasswordAsync, registerAuthAsync } from 'src/stores/auth/action'

import { toast } from 'react-toastify'

import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from '../../../../node_modules/react-i18next'

type TProps = {}

interface IDefaultValues {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}
const ChangePasswordPage: NextPage<TProps> = () => {
    //States
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    // const [isRemember, setIsRemember] = useState(false);

    //router
    const router = useRouter();

    //auth
    const { logout } = useAuth()

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isErrorChangePassword, isSuccessChangePassword, messageChangePassword } = useSelector((state: RootState) => state.auth)

    //Theme
    const theme = useTheme();

    //translation
    const { t } = useTranslation()

    const schema = yup.object().shape({
        currentPassword: yup
            .string()
            .required("Current password is required")
            .matches(PASSWORD_REG, "The current password format is incorrect"),
        newPassword: yup
            .string()
            .required("New password is required")
            .matches(PASSWORD_REG, t('password_rules')),
        confirmNewPassword: yup
            .string()
            .required("Confirm new password is required")
            .matches(PASSWORD_REG, "The confirm new password format is incorrect")
            .oneOf([yup.ref('newPassword'), ''], 'Passwords dot not match'),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: { currentPassword: string, newPassword: string }) => {
        if (!Object.keys(errors)?.length) {
            dispatch(changePasswordAsync({ currentPassword: data.currentPassword, newPassword: data.newPassword }))
        }
    }

    useEffect(() => {
        if (messageChangePassword) {
            if (isErrorChangePassword) {
                toast.error(messageChangePassword)
            }
            else if (isSuccessChangePassword) {
                toast.success(messageChangePassword)
                setTimeout(() => {
                    logout()
                }, 500)
            }
        }
        dispatch(resetInitialState())
    }, [isErrorChangePassword, isSuccessChangePassword, messageChangePassword])

    return (
        <>
            {isLoading && <FallbackSpinner />}
            <Box sx={{
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
                        <Typography component="h1" variant="h5">Change password</Typography>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                            <Box sx={{ mt: 2 }} width={{ md: '18rem', xs: '20rem' }}>
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label="Current Password"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder='Enter your current password'
                                            helperText={errors.currentPassword?.message}
                                            error={errors.currentPassword ? true : false}
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showCurrentPassword ? 'hide the password' : 'display the password'
                                                            }
                                                            edge="end"
                                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                                            {
                                                                showCurrentPassword ?
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
                                    name='currentPassword'
                                />
                                {/* {errors.password && <Typography>{errors.password.message}</Typography>} */}
                            </Box>
                            <Box sx={{ mt: 2 }} width={{ md: '18rem', xs: '20rem' }}>
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label="New Password"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_password')}
                                            helperText={errors.newPassword?.message}
                                            error={errors.newPassword ? true : false}
                                            type={showNewPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showNewPassword ? 'hide the password' : 'display the password'
                                                            }
                                                            edge="end"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}>
                                                            {
                                                                showNewPassword ?
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
                                    name='newPassword'
                                />
                                {/* {errors.password && <Typography>{errors.password.message}</Typography>} */}
                            </Box>
                            <Box sx={{ mt: 2 }} width={{ md: '18rem', xs: '20rem' }}>
                                <Controller
                                    control={control}
                                    name='confirmNewPassword'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label="Confirm new password"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder='Confirm your new password'
                                            helperText={errors.confirmNewPassword?.message}
                                            error={errors.confirmNewPassword ? true : false}
                                            type={showConfirmNewPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={
                                                                showConfirmNewPassword ? 'hide the confirm password' : 'display the confirm password'
                                                            }
                                                            edge="end"
                                                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                                                            {
                                                                showNewPassword ?
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
                                Change password
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default ChangePasswordPage
