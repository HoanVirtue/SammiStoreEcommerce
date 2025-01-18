import axios from "axios"

//config
import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"

//types
import { TChangePassword, TLoginAuth, TRegisterAuth } from "src/types/auth"

export const loginAuth = async (data: TLoginAuth) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.AUTH.INDEX}/login`, data)
        return res.data
    } catch (error) {
        return null
    }
}

export const logoutAuth = async () => {
    const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/logout`)
    return res.data
}

export const registerAuth = async (data: TRegisterAuth) => {
    try {
        const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/register`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const updateAuthMe = async (data: any) => {
    try {
        const res = await instance.put(`${API_ENDPOINT.AUTH.INDEX}/me`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getAuthMe = async () => {
    try {
        const res = await instance.get(`${API_ENDPOINT.AUTH.INDEX}/me`)
        return res.data
    } catch (error) {
        return error
    }
}

export const changePasswordMe = async (data: TChangePassword) => {
    try {
        const res = await instance.patch(`${API_ENDPOINT.AUTH.INDEX}/change-password`, data)
        return res.data
    } catch (error) {
        return error
    }
}