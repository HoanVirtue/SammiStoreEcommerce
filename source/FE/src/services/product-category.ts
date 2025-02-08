import axios from "axios"
import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateProductCategory, TParamsDeleteMultipleProductCategories, TParamsGetAllProductCategories, TParamsUpdateProductCategory } from "src/types/product-category"

export const getAllProductCategories = async (data: {params: TParamsGetAllProductCategories}) => {
    try {
        const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}`, data)
        console.log(res)
        return res.data
    } catch (error) {
        return error
    }
}

export const createProductCategory = async (data: TParamsCreateProductCategory) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}`, data)
        return res.data
    }
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateProductCategory = async (data: TParamsUpdateProductCategory) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/${id}`, rests)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteProductCategory = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getProductCategoryDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteMultipleProductCategories = async (data: TParamsDeleteMultipleProductCategories) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/delete-many`, {data})
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