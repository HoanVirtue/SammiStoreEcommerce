import { API_ENDPOINT } from "@/configs/api"
import instance from "@/helpers/axios"
import { TParamsCreateUser, TParamsDeleteMultipleUsers, TParamsGetAllUsers, TParamsUpdateUser, TParamsUser } from "@/types/user"

export const getAllUsers = async (data: {params: TParamsGetAllUsers}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.SYSTEM.USER.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createUser = async (data: TParamsCreateUser) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.SYSTEM.USER.INDEX}`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateUser = async (data: TParamsUpdateUser) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.SYSTEM.USER.INDEX}/${id}`, rests)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteUser = async (id: number) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.SYSTEM.USER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getUserDetail = async () => {
    try {
        const res = await instance.get<TParamsUser>(`${API_ENDPOINT.SYSTEM.USER.INDEX}/get-current-user`)
        return res.data;
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteMultipleUsers = async (data: TParamsDeleteMultipleUsers) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.SYSTEM.USER.INDEX}`, {data})
        if(res?.data?.status === "Success") {
            return {
                data: []
            }
        }
        return {
            data: null
        }
    } catch (error: any) {
        return error?.response?.data
    }
}