import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateVoucher, TParamsDeleteMultipleVouchers, TParamsGetAllVouchers, TParamsUpdateVoucher } from "src/types/voucher"

export const getAllVouchers= async (data: {params: TParamsGetAllVouchers}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.VOUCHER.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getMyVouchers= async (data: {params: TParamsGetAllVouchers}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.VOUCHER.INDEX}/my-voucher`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createVoucher = async (data: TParamsCreateVoucher) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.VOUCHER.INDEX}`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}

export const applyMyVoucher = async (data: TParamsCreateVoucher) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.VOUCHER.INDEX}/my-voucher-apply`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateVoucher = async (data: TParamsUpdateVoucher) => {

    try {
        const res = await instance.put(`${API_ENDPOINT.VOUCHER.INDEX}/${data.id}`, data)
        return res.data
    } catch (error: any) {
        return error
    }
}


export const deleteVoucher = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.VOUCHER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getVoucherDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.VOUCHER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const deleteMultipleVouchers= async (data: TParamsDeleteMultipleVouchers) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.VOUCHER.INDEX}/delete-many`, {data})
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