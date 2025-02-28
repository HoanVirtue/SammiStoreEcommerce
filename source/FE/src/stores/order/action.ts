import { createAsyncThunk } from "@reduxjs/toolkit";
import { cancelOrder, createOrder, deleteOrder, getAllManageOrders, getAllOrders, updateOrder } from "src/services/order";
import { TParamsCreateOrder, TParamsGetAllOrders, TParamsUpdateOrder } from "src/types/order";

export const serviceName = 'order'

export const getAllOrdersAsync = createAsyncThunk(`${serviceName}/get-all-by-me`, async (data: { params: TParamsGetAllOrders }) => {
    const response = await getAllOrders(data)
    return response
})

export const createOrderAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateOrder) => {
    const response = await createOrder(data)
    return response
})

export const cancelOrderAsync = createAsyncThunk(`${serviceName}/cancel`, async (id: string) => {
    const response = await cancelOrder(id)
    return response
})


//admin cms
export const getAllManageOrderAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetAllOrders }) => {
    const response = await getAllManageOrders(data)
    return response
})

export const updateOrderAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsUpdateOrder) => {
    const response = await updateOrder(data)
    return response
})


export const deleteOrderAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
    const response = await deleteOrder(id)
    return response
})
