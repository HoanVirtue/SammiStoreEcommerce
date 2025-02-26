import { createAsyncThunk } from "@reduxjs/toolkit";
import { cancelOrder, createOrder, getAllOrders } from "src/services/order";
import { TParamsCreateOrder, TParamsGetAllOrders } from "src/types/order";

export const serviceName = 'order'

export const getAllOrdersAsync = createAsyncThunk(`${serviceName}/get-all-by-me`, async (data: { params: TParamsGetAllOrders }) => {
    const response = await getAllOrders(data)
    console.log("re", response)
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