// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Action Imports
import { createVoucherAsync, deleteMultipleVouchersAsync, deleteVoucherAsync, getAllVouchersAsync, serviceName, updateVoucherAsync } from './action'
import { ReduxPayload } from '../../types/payload'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  typeError: '',
  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessageCreate: '',

  isSuccessUpdate: false,
  isErrorUpdate: false,
  errorMessageUpdate: '',

  isSuccessDelete: false,
  isErrorDelete: false,
  errorMessageDelete: '',
  
  isSuccessDeleteMultiple: false,
  isErrorDeleteMultiple: false,
  errorMessageDeleteMultiple: '',

  vouchers: {
    data: [],
    total: 0
  }
}

export const voucherSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ""
      state.typeError = ""

      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.errorMessageCreate = ''

      state.isSuccessUpdate = false
      state.isErrorUpdate = true
      state.errorMessageUpdate = ''
      
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.errorMessageDelete = ''

      state.isSuccessDeleteMultiple = false
      state.isErrorDeleteMultiple = true
      state.errorMessageDeleteMultiple = ''
    }
  },
  extraReducers: builder => {

    //get all Voucheres
    builder.addCase(getAllVouchersAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllVouchersAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.vouchers.data = Array.isArray(action?.payload?.result) ? action?.payload?.result : [];
      state.vouchers.total = action?.payload?.result?.totalItemCount
    })
    builder.addCase(getAllVouchersAsync.rejected, (state, action) => {
      state.isLoading = false
      state.vouchers.data = []
      state.vouchers.total = 0
    })

    //create Voucher
    builder.addCase(createVoucherAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createVoucherAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreate = !!action.payload?.isSuccess
      state.isErrorCreate = !action.payload?.isSuccess
      state.errorMessageCreate = action.payload?.message
      state.typeError = action.payload?.errors
    })
    builder.addCase(createVoucherAsync.rejected, (state, action) => {
      const payload = action.payload as ReduxPayload;
      state.isLoading = false
      state.isErrorCreate = true
      state.errorMessageCreate = payload?.errors?.errorMessage || 'Error creating Voucher'
    })

    //update Voucher
    builder.addCase(updateVoucherAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateVoucherAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdate = !!action.payload?.isSuccess
      state.isErrorUpdate = !action.payload?.isSuccess
      state.typeError = action.payload?.errors
    })
    builder.addCase(updateVoucherAsync.rejected, (state, action) => {
      const payload = action.payload as ReduxPayload;
      state.isLoading = false
      state.isErrorUpdate = true
      state.errorMessageUpdate = payload?.errors?.errorMessage || 'Error updating Voucher'
    })

    //delete Voucher
    builder.addCase(deleteVoucherAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteVoucherAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.isSuccess
      state.isErrorDelete = !action.payload?.isSuccess
      state.errorMessageDelete = action.payload?.message
      state.typeError = action.payload?.result?.errorMessage
    })
    builder.addCase(deleteVoucherAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDelete = true
      state.errorMessageDelete = action?.error.message || 'Error deleting Voucher'
    })

    //delete multiple Voucher
    builder.addCase(deleteMultipleVouchersAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleVouchersAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDeleteMultiple = !!action.payload?.isSuccess
      state.isErrorDeleteMultiple = !action.payload?.isSuccess
      state.errorMessageDeleteMultiple = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteMultipleVouchersAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDeleteMultiple = true
      state.errorMessageDeleteMultiple = action.error.message || 'Error deleting Voucher'
    })

  }
})

export const { resetInitialState } = voucherSlice.actions
export default voucherSlice.reducer
