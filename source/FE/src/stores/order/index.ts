// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { cancelOrderAsync, createOrderAsync, deleteOrderAsync, getAllManageOrderAsync, getAllOrdersAsync, serviceName, updateOrderAsync } from './action'
import { getAllManageOrders } from 'src/services/order'

// ** Action Imports

const initialState = {
  isLoading: false,
  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessageCreate: '',
  isSuccessCancel: false,
  isErrorCancel: false,
  errorMessageCancel: '',
  isSuccessUpdate: false,
  isErrorUpdate: false,
  errorMessageUpdate: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  errorMessageDelete: '',
  typeError: '',
  orderItems: [],
  orderProducts: {
    data: [],
    total: 0
  },
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

      state.isSuccessUpdate = false
      state.isErrorUpdate = true
      state.errorMessageUpdate = ''

      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.errorMessageDelete = ''

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

    //get all order admin
    builder.addCase(getAllManageOrderAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllManageOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderProducts.data = Array.isArray(action?.payload?.data?.orders) ? action?.payload?.data?.orders : [];
      state.orderProducts.total = action?.payload?.data?.totalCount
    })
    builder.addCase(getAllManageOrderAsync.rejected, (state, action) => {
      state.isLoading = false
      state.orderProducts.data = []
      state.orderProducts.total = 0
    })

    //update Order
    builder.addCase(updateOrderAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdate = !!action.payload?.data?._id
      state.isErrorUpdate = !action.payload?.data?._id
      state.errorMessageUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(updateOrderAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorUpdate = true
      state.errorMessageUpdate = action.error.message || 'Error updating Order'
    })

    //delete Order
    builder.addCase(deleteOrderAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.errorMessageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteOrderAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDelete = true
      state.errorMessageDelete = action?.error.message || 'Error deleting Order'
    })
  }
})

export const { updateProductToCart, resetInitialState } = orderSlice.actions
export default orderSlice.reducer
