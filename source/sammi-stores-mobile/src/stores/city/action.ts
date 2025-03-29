import { createAsyncThunk } from "@reduxjs/toolkit";

//services
import { createCity, deleteMultipleCities, deleteCity, getAllCities, updateCity } from "../../services/city";

//types
import { TParamsCreateCity, TParamsDeleteMultipleCities, TParamsGetAllCities, TParamsUpdateCity } from "../../types/city";

export const serviceName = 'city'

export const getAllCitiesAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetAllCities }) => {
    const response = await getAllCities(data)
    return response
})

export const createCityAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateCity) => {
    const response = await createCity(data)
    return response
})

export const updateCityAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsUpdateCity) => {
    const response = await updateCity(data)
    return response
})

export const deleteCityAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
    const response = await deleteCity(id)
    return response
})

export const deleteMultipleCitiesAsync = createAsyncThunk(`${serviceName}/delete-multiple`, async (data: TParamsDeleteMultipleCities) => {
    const response = await deleteMultipleCities(data)
    return response
})