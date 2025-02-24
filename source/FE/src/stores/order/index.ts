// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { cancelOrderAsync, createOrderAsync, getAllOrdersAsync, serviceName } from './action'

// ** Action Imports

const initialState = {
  isLoading: false,
  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessageCreate: '',
  isSuccessCancel: false,
  isErrorCancel: false,
  errorMessageCancel: '',
  typeError: '',
  orderItems: [],
  orders: {
    data: [],
    total: 0
  }
}

export const orderSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    updateProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    },
    resetInitialState: (state) => {
      state.isLoading = false
      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.errorMessageCreate = ''

      state.isSuccessCancel = false
      state.isErrorCancel = true
      state.errorMessageCancel = ''
      state.typeError = ''
    }

  },
  extraReducers: builder => {
    //get all Order
    builder.addCase(getAllOrdersAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrdersAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders.data = Array.isArray(action?.payload?.data?.orders) ? action?.payload?.data?.orders : [];
      state.orders.total = action?.payload?.data?.totalCount
    })
    builder.addCase(getAllOrdersAsync.rejected, (state, action) => {
      state.isLoading = false
      state.orders.data = []
      state.orders.total = 0
    })

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

    //cancel Order
    builder.addCase(cancelOrderAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(cancelOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCancel = !!action.payload?.data?._id
      state.isErrorCancel = !action.payload?.data?._id
      state.errorMessageCancel = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(cancelOrderAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCancel = true
      state.errorMessageCancel = action?.error?.message || 'Error cancelling Order'
    })
  }
})

export const { updateProductToCart, resetInitialState } = orderSlice.actions
export default orderSlice.reducer
