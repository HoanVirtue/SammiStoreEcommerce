// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { changePasswordAsync, registerAuthAsync, serviceName, updateAuthMeAsync } from './action'

//Type
import { UserDataType } from '@/src/contexts/types'

type TInitialState = {
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string,
  typeError: string,
  isSuccessUpdateMe: boolean,
  isErrorUpdateMe: boolean,
  messageUpdateMe: string,
  isSuccessChangePassword: boolean,
  isErrorChangePassword: boolean,
  messageChangePassword: string,
  userData: UserDataType | null
}


const initialState: TInitialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  // statusCode: 0
  typeError: '',
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isSuccessChangePassword: true,
  isErrorChangePassword: false,
  messageChangePassword: '',
  userData: null
}

export const authSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ""
      state.typeError = ""
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = ""
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = true
      state.messageChangePassword = ""
    }
  },
  extraReducers: builder => {

    //register
    builder.addCase(registerAuthAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = !!action.payload?.data?.email
      state.isError = !action.payload?.data?.email
      state.message = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(registerAuthAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ""
      state.typeError = ""
    })

    //update me
    builder.addCase(updateAuthMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateMe = !!action.payload?.data?.email
      state.isErrorUpdateMe = !action.payload?.data?.email
      state.messageUpdateMe = action.payload?.message
      state.typeError = action.payload?.typeError
      state.userData = action.payload?.data
    })
    builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = false
      state.messageUpdateMe = ""
      state.typeError = ""
      state.userData = null
    })

    //change password me
    builder.addCase(changePasswordAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(changePasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = !!action.payload?.data
      state.isErrorChangePassword = !action.payload?.data
      state.messageChangePassword = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(changePasswordAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = false
      state.messageChangePassword = ""
      state.typeError = ""
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
