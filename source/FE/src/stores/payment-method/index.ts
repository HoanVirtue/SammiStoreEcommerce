// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Action Imports
import { createPaymentMethodAsync, deleteMultiplePaymentMethodsAsync, deletePaymentMethodAsync, getAllPaymentMethodsAsync, serviceName, updatePaymentMethodAsync } from './action'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  typeError: '',
  isSuccessCreateUpdate: false,
  isErrorCreateUpdate: false,
  errorMessageCreateUpdate: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  errorMessageDelete: '',
  isSuccessDeleteMultiple: false,
  isErrorDeleteMultiple: false,
  errorMessageDeleteMultiple: '',

  paymentMethods: {
    data: [],
    total: 0
  }
}

export const paymentMethodSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ""
      state.typeError = ""
      state.isSuccessCreateUpdate = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.errorMessageDelete = ''
      state.isSuccessDeleteMultiple = false
      state.isErrorDeleteMultiple = true
      state.errorMessageDeleteMultiple = ''
    }
  },
  extraReducers: builder => {

    //get all PaymentMethod
    builder.addCase(getAllPaymentMethodsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllPaymentMethodsAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.paymentMethods.data = Array.isArray(action?.payload?.data?.paymentTypes) ? action?.payload?.data?.paymentTypes : [];
      state.paymentMethods.total = action?.payload?.data?.totalCount
    })
    builder.addCase(getAllPaymentMethodsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.paymentMethods.data = []
      state.paymentMethods.total = 0
    })

    //create PaymentMethod
    builder.addCase(createPaymentMethodAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createPaymentMethodAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateUpdate = !!action.payload?.data?._id
      state.isErrorCreateUpdate = !action.payload?.data?._id
      state.errorMessageCreateUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(createPaymentMethodAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = action?.error?.message || 'Error creating PaymentMethod'
    })

    //update PaymentMethod
    builder.addCase(updatePaymentMethodAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updatePaymentMethodAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateUpdate = !!action.payload?.data?._id
      state.isErrorCreateUpdate = !action.payload?.data?._id
      state.errorMessageCreateUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(updatePaymentMethodAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = action.error.message || 'Error updating PaymentMethod'
    })

    //delete PaymentMethod
    builder.addCase(deletePaymentMethodAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deletePaymentMethodAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.errorMessageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deletePaymentMethodAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDelete = true
      state.errorMessageDelete = action?.error.message || 'Error deleting PaymentMethod'
    })

    //delete multiple PaymentMethod
    builder.addCase(deleteMultiplePaymentMethodsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultiplePaymentMethodsAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDeleteMultiple = !!action.payload?.data
      state.isErrorDeleteMultiple = !action.payload?.data
      state.errorMessageDeleteMultiple = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteMultiplePaymentMethodsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDeleteMultiple = true
      state.errorMessageDeleteMultiple = action.error.message || 'Error deleting PaymentMethod'
    })
  }
})

export const { resetInitialState } = paymentMethodSlice.actions
export default paymentMethodSlice.reducer
