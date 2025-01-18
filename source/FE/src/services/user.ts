import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateUser, TParamsGetAllUsers, TParamsUpdateUser } from "src/types/user"

export const getAllUsers = async (data: {params: TParamsGetAllUsers}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.USER.INDEX}`, data)
        console.log(res)
        return res.data
    } catch (error) {
        return error
    }
}

export const createUser = async (data: TParamsCreateUser) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.USER.INDEX}`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateUser = async (data: TParamsUpdateUser) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.USER.INDEX}/${id}`, rests)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteUser = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.USER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getUserDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.USER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}