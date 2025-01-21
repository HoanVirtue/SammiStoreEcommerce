// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Action Imports
import { createCityAsync, deleteMultipleCitiesAsync, deleteCityAsync, getAllCitiesAsync, serviceName, updateCityAsync } from './action'

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

  cities: {
    data: [],
    total: 0
  }
}

export const citySlice = createSlice({
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

    //get all Cities
    builder.addCase(getAllCitiesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllCitiesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.cities.data = Array.isArray(action?.payload?.data?.cities) ? action?.payload?.data?.cities : [];
      state.cities.total = action?.payload?.data?.totalCount
    })
    builder.addCase(getAllCitiesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.cities.data = []
      state.cities.total = 0
    })

    //create City
    builder.addCase(createCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateUpdate = !!action.payload?.data?._id
      state.isErrorCreateUpdate = !action.payload?.data?._id
      state.errorMessageCreateUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(createCityAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = action?.error?.message || 'Error creating City'
    })

    //update City
    builder.addCase(updateCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateUpdate = !!action.payload?.data?._id
      state.isErrorCreateUpdate = !action.payload?.data?._id
      state.errorMessageCreateUpdate = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(updateCityAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorCreateUpdate = true
      state.errorMessageCreateUpdate = action.error.message || 'Error updating City'
    })

    //delete City
    builder.addCase(deleteCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.errorMessageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteCityAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDelete = true
      state.errorMessageDelete = action?.error.message || 'Error deleting City'
    })

    //delete multiple City
    builder.addCase(deleteMultipleCitiesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleCitiesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDeleteMultiple = !!action.payload?.data
      state.isErrorDeleteMultiple = !action.payload?.data
      state.errorMessageDeleteMultiple = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(deleteMultipleCitiesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isErrorDeleteMultiple = true
      state.errorMessageDeleteMultiple = action.error.message || 'Error deleting City'
    })

  }
})

export const { resetInitialState } = citySlice.actions
export default citySlice.reducer
