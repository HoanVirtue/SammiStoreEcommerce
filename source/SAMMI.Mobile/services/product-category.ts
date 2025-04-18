import { API_ENDPOINT } from "@/configs/api"
import instance from "@/helpers/axios"
import { TParamsCreateProductCategory, TParamsDeleteMultipleProductCategories, TParamsGetAllProductCategories, TParamsUpdateProductCategory } from "@/types/product-category"

export const getAllProductCategories = async (data: {params: TParamsGetAllProductCategories}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getProductCategoryCode = async (data: {params: TParamsGetAllProductCategories}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/get-code-by-last-id`, data)
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
    // const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/${data.id}`, data)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteProductCategory = async (id: number) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getProductCategoryDetail = async (id: number) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteMultipleProductCategories = async (data: TParamsDeleteMultipleProductCategories) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_CATEGORY.INDEX}`, {data})
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