// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { createReviewAsync, deleteMultipleReviewAsync, deleteMyReviewAsync, deleteReviewAsync, getAllReviewsAsync, serviceName, updateMyReviewAsync, updateReviewAsync } from './action'

// ** Action Imports

const initialState = {
  isLoading: false,

  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessageCreate: '',

  isSuccessUpdate: false,
  isErrorUpdate: false,
  errorMessageUpdate: '',

  isSuccessMyUpdate: false,
  isErrorMyUpdate: false,
  errorMessageMyUpdate: '',

  isSuccessDelete: false,
  isErrorDelete: false,
  errorMessageDelete: '',
  
  isSuccessMyDelete: false,
  isErrorMyDelete: false,
  errorMessageMyDelete: '',

  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  errorMessageMultipleDelete: '',


  typeError: '',
  reviews: {
    data: [],
    total: 0
  }
}

export const reviewSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.isLoading = false
      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.errorMessageCreate = ''

      state.isSuccessUpdate = false
      state.isErrorUpdate = true
      state.errorMessageUpdate = ''

      state.isSuccessMyUpdate = false
      state.isErrorMyUpdate = true
      state.errorMessageMyUpdate = ''

      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.errorMessageDelete = ''

      state.isSuccessMyDelete = false
      state.isErrorMyDelete = true
      state.errorMessageMyDelete = ''

      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.errorMessageMultipleDelete = ''

      state.typeError = ''
    }

  },
  extraReducers: builder => {
    //get all Review
    builder.addCase(getAllReviewsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllReviewsAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.reviews.data = Array.isArray(action?.payload?.data?.reviews) ? action?.payload?.data?.reviews : [];
      state.reviews.total = action?.payload?.data?.totalCount
    })
    builder.addCase(getAllReviewsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.reviews.data = []
      state.reviews.total = 0
    })

    //create Review
    builder.addCase(createReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createReviewAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreate = !!action.payload?.data?._id
      state.isErrorCreate = !action.payload?.data?._id
      state.errorMessageCreate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(createReviewAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCreate = true
      state.errorMessageCreate = action?.error?.message || 'Error creating Review'
    })


    //update Review
    builder.addCase(updateReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateReviewAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdate = !!action.payload?.data?._id
      state.isErrorUpdate = !action.payload?.data?._id
      state.errorMessageUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(updateReviewAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorUpdate = true
      state.errorMessageUpdate = action.error.message || 'Error updating Review'
    })

    //update my Review
    builder.addCase(updateMyReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateMyReviewAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMyUpdate = !!action.payload?.data?._id
      state.isErrorMyUpdate = !action.payload?.data?._id
      state.errorMessageMyUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(updateMyReviewAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorMyUpdate = true
      state.errorMessageMyUpdate = action.error.message || 'Error updating my Review'
    })

    //delete Review
    builder.addCase(deleteReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteReviewAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.errorMessageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteReviewAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDelete = true
      state.errorMessageDelete = action?.error.message || 'Error deleting Review'
    })

    //delete my Review
    builder.addCase(deleteMyReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMyReviewAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMyDelete = !!action.payload?.data?._id
      state.isErrorMyDelete = !action.payload?.data?._id
      state.errorMessageMyDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteMyReviewAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorMyDelete = true
      state.errorMessageMyDelete = action?.error.message || 'Error deleting My Review'
    })

    //delete multiple Review
    builder.addCase(deleteMultipleReviewAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleReviewAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data?._id
      state.isErrorMultipleDelete = !action.payload?.data?._id
      state.errorMessageMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteMultipleReviewAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorMultipleDelete = true
      state.errorMessageMultipleDelete = action?.error.message || 'Error deleting multiple Review'
    })
  }
})

export const { resetInitialState } = reviewSlice.actions
export default reviewSlice.reducer
