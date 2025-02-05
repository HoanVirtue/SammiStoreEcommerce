// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { serviceName } from './action'

// ** Action Imports

const initialState = {
  orderItems: []
}

export const orderProductSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    updateProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    },

  },
  extraReducers: builder => {

  }
})

export const { updateProductToCart } = orderProductSlice.actions
export default orderProductSlice.reducer
