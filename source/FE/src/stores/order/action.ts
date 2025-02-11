import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "src/services/order";
import { TParamsCreateOrder } from "src/types/order";

export const serviceName = 'order'


export const createOrderAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateOrder) => {
    const response = await createOrder(data)
    return response
})