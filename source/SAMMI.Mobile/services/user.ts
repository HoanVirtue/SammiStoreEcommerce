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
    try {
        const res = await instance.post(`${API_ENDPOINT.SYSTEM.USER.INDEX}/update-customer-info`, data)
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

export type TParamsUpdateAvatar = {
    imageBase64: string; // Required string
    publicId?: string | null; // Nullable string
    typeImage?: string | null; // Nullable string
    value?: any; // Flexible type for object (use `unknown` for stricter typing)

    id?: number; // Required integer
    createdDate?: string; // DateTime as ISO string (e.g., "2023-10-01T12:00:00Z")
    updatedDate?: string | null; // Nullable DateTime as ISO string
    createdBy?: string | null; // Nullable string
    updatedBy?: string | null; // Nullable string
    isActive?: boolean; // Required boolean
    isDeleted?: boolean; // Required boolean
    displayOrder?: number | null; // Nullable integer
}

export const updateAvatar = async (imageBase64: string) => {
    try {
        const data: TParamsUpdateAvatar = {
            imageBase64: imageBase64,
            isActive: true
        };
        const res = await instance.post(`${API_ENDPOINT.SYSTEM.USER.INDEX}/update-avatar`, data);
        return res.data;
    } catch (error: any) {
        return error?.response?.data;
    }
}