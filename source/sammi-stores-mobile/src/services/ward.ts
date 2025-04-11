import { API_ENDPOINT } from "../configs/api"
import instance from "../helpers/axios"
import { TParamsCreateWard, TParamsDeleteMultipleWards, TParamsGetAllWards, TParamsUpdateWard } from "../types/ward"

export const getAllWards= async (data: {params: TParamsGetAllWards}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.ADDRESS.WARD.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createWard = async (data: TParamsCreateWard) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.ADDRESS.WARD.INDEX}`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateWard = async (data: TParamsUpdateWard) => {
    // const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.ADDRESS.WARD.INDEX}/${data.id}`, data)
        return res.data
    } catch (error: any) {
        return error
    }
}


export const deleteWard = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.ADDRESS.WARD.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getWardDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.ADDRESS.WARD.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const deleteMultipleWards= async (data: TParamsDeleteMultipleWards) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.ADDRESS.WARD.INDEX}/delete-many`, {data})
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