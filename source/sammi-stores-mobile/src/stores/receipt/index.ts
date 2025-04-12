// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Action Imports
import { createReceiptAsync, deleteMultipleReceiptsAsync, deleteReceiptAsync, getAllReceiptsAsync, serviceName, updateReceiptAsync } from './action'

interface ReceiptPayload {
  result?: {
    subset?: any[];
    id?: string;
    errorMessage?: string;
    totalItemCount?: number;
  };
  message?: string;
  isSuccess?: boolean;
  errors?: {
    memberName: string,
    errorMessage: string
  }
}

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

  receipts: {
    data: [],
    total: 0
  }
}

export const receiptSlice = createSlice({
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

    //get all Receipts
    builder.addCase(getAllReceiptsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllReceiptsAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.receipts.data = Array.isArray(action?.payload?.result?.subset) ? action?.payload?.result?.subset : [];
      state.receipts.total = action?.payload?.result?.totalItemCount
    })
    builder.addCase(getAllReceiptsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.receipts.data = []
      state.receipts.total = 0
    })

    //create Receipt
    builder.addCase(createReceiptAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createReceiptAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateUpdate = !!action.payload?.isSuccess
      state.isErrorCreateUpdate = !action.payload?.isSuccess
      state.errorMessageCreateUpdate = action.payload?.message
      state.typeError = action.payload?.errors
    })
    builder.addCase(createReceiptAsync.rejected, (state, action) => {
      const payload = action.payload as ReceiptPayload;
      state.isLoading = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = payload?.errors?.errorMessage || 'Error creating Receipt'
    })

    //update Receipt
    builder.addCase(updateReceiptAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateReceiptAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateUpdate = !!action.payload?.isSuccess
      state.isErrorCreateUpdate = !action.payload?.isSuccess
      state.typeError = action.payload?.errors
    })
    builder.addCase(updateReceiptAsync.rejected, (state, action) => {
        const payload = action.payload as ReceiptPayload;
      state.isLoading = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = payload?.errors?.errorMessage || 'Error updating Receipt'
    })

    //delete Receipt
    builder.addCase(deleteReceiptAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteReceiptAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.isSuccess
      state.isErrorDelete = !action.payload?.isSuccess
      state.errorMessageDelete = action.payload?.message
      state.typeError = action.payload?.result?.errorMessage
    })
    builder.addCase(deleteReceiptAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDelete = true
      state.errorMessageDelete = action?.error.message || 'Error deleting Receipt'
    })

    //delete multiple Receipt
    builder.addCase(deleteMultipleReceiptsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleReceiptsAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDeleteMultiple = !!action.payload?.isSuccess
      state.isErrorDeleteMultiple = !action.payload?.isSuccess
      state.errorMessageDeleteMultiple = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteMultipleReceiptsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDeleteMultiple = true
      state.errorMessageDeleteMultiple = action.error.message || 'Error deleting Receipt'
    })

  }
})

export const { resetInitialState } = receiptSlice.actions
export default receiptSlice.reducer
