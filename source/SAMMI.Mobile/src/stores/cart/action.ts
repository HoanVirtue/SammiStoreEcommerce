import { createAsyncThunk } from "@reduxjs/toolkit";

//services
import { createCart, deleteCart, getCarts } from "@/src/services/cart";

//types
import { TParamsCreateCart, TParamsDeleteCart, TParamsGetAllCarts } from "@/src/types/cart";

export const serviceName = 'cart'

export const getCartsAsync = createAsyncThunk(`${serviceName}/get`, async (data: { params: TParamsGetAllCarts }) => {
    const response = await getCarts(data)
    return response
})

export const createCartAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateCart) => {
    const response = await createCart(data)
    return response
})


export const deleteCartAsync = createAsyncThunk(`${serviceName}/delete`, async (id: number) => {
    const response = await deleteCart(id)
    return response
})
