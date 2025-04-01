import axios from "axios"
import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateOrder, TParamsGetAllOrders, TParamsUpdateOrder } from "src/types/order"


export const getAllOrders = async (data: {params: TParamsGetAllOrders  }) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getOrderDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
        return res.data
    } catch (error) {
        return error
    }
}


export const createOrder = async (data: TParamsCreateOrder) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/create-order`, data)
        return res.data
    }
    catch (error: any) {
        return error?.response?.data
    }
}


export const cancelOrder = async (id: string) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/me/cancel/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


//admin
export const deleteOrder = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getManageOrderDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getAllManageOrders = async (data: {params: TParamsGetAllOrders  }) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const updateOrder = async (data: TParamsUpdateOrder) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`, rests)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}
