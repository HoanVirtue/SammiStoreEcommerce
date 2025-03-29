import axios from "axios"
import { API_ENDPOINT } from "../configs/api"
import instance from "../helpers/axios"
import { TParamsCreateCity, TParamsDeleteMultipleCities, TParamsGetAllCities, TParamsUpdateCity } from "../types/city"

export const getAllCities = async (data: {params: TParamsGetAllCities}) => {
    try {
        const res = await axios.get(`${API_ENDPOINT.ADDRESS.CITY.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createCity = async (data: TParamsCreateCity) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.ADDRESS.CITY.INDEX}`, data)
        return res.data
    } 
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateCity = async (data: TParamsUpdateCity) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.ADDRESS.CITY.INDEX}/${id}`, rests)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteCity = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.ADDRESS.CITY.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getCityDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.ADDRESS.CITY.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteMultipleCities = async (data: TParamsDeleteMultipleCities) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.ADDRESS.CITY.INDEX}/delete-many`, {data})
        if(res?.data?.status === "Success") {
            return {
                data: []
            }
        }
        return {
            data: null
        }
    } catch (error: any) {
        return error?.response?.data
    }
}