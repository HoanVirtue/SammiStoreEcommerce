import { createAsyncThunk } from "@reduxjs/toolkit";

//services
import { createUser, deleteUser, getAllUsers, updateUser } from "src/services/user";

//types
import { TParamsCreateUser, TParamsGetAllUsers, TParamsUpdateUser } from "src/types/user";

export const serviceName = 'user'

export const getAllUsersAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetAllUsers }) => {
    const response = await getAllUsers(data)
    return response
})

export const createUserAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateUser) => {
    const response = await createUser(data)
    return response
})

export const updateUserAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsUpdateUser) => {
    const response = await updateUser(data)
    return response
})

export const deleteUserAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
    const response = await deleteUser(id)
    return response
})