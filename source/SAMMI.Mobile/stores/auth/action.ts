import { createAsyncThunk } from "@reduxjs/toolkit";
import { changePasswordMe, registerAuth, updateAuthMe } from "@/services/auth";
import { TChangePassword } from "@/types/auth";

export const serviceName = 'auth'

export const registerAuthAsync = createAsyncThunk(`${serviceName}/register`, async (data: any) => {
    const response = await registerAuth(data)
    if (response?.data) {
        return response
    }
    return {
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError
    }
})

export const updateAuthMeAsync = createAsyncThunk(`${serviceName}/update-me`, async (data: any) => {
    const response = await updateAuthMe(data)

    if (response?.data) {
        return response
    }
    return {
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError
    }
})

export const changePasswordAsync = createAsyncThunk(`${serviceName}/change-password-me`, async (data: TChangePassword) => {
    const response = await changePasswordMe(data)

    if (response?.status === "Success") {
        return {...response, data: 1}
    }
    return {
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError
    }
})