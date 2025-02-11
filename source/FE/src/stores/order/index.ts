// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { createOrderAsync, serviceName } from './action'

// ** Action Imports

const initialState = {
  isLoading: false,
  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessageCreate: '',
  typeError: '',
  orderItems: []
}

export const orderSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    updateProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    },
    resetInitialState: (state) =>{
      state.isLoading = false
      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.errorMessageCreate = ''
      state.typeError = ''
    }

  },
  extraReducers: builder => {
    //create Order
    builder.addCase(createOrderAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreate = !!action.payload?.data?._id
      state.isErrorCreate = !action.payload?.data?._id
      state.errorMessageCreate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(createOrderAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCreate = true
      state.errorMessageCreate = action?.error?.message || 'Error creating Order'
    })
  }
})

export const { updateProductToCart, resetInitialState } = orderSlice.actions
export default orderSlice.reducer
