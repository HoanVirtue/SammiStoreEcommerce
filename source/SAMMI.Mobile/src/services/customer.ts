import { API_ENDPOINT } from "@/src/configs/api"
import instance from "@/src/helpers/axios"
import { TParamsCreateCustomer, TParamsDeleteMultipleCustomers, TParamsGetAllCustomers, TParamsUpdateCustomer } from "@/src/types/customer"

export const getAllCustomers = async (data: {params: TParamsGetAllCustomers}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.USER.CUSTOMER.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createCustomer = async (data: TParamsCreateCustomer) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.USER.CUSTOMER.INDEX}`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateCustomer = async (data: TParamsUpdateCustomer) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.USER.CUSTOMER.DELETE}/${data.id}`, data)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteCustomer = async (id: number) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.USER.CUSTOMER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getCustomerDetail = async (id: number) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.USER.CUSTOMER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteMultipleCustomers = async (data: TParamsDeleteMultipleCustomers) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.USER.CUSTOMER.INDEX}/delete-many`, {data})
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