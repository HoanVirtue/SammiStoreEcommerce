import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateProduct, TParamsDeleteMultipleProducts, TParamsGetAllProducts, TParamsUpdateProduct } from "src/types/product"

export const getAllProducts = async (data: {params: TParamsGetAllProducts}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`, data)
        console.log(res)
        return res.data
    } catch (error) {
        return error
    }
}

export const createProduct = async (data: TParamsCreateProduct) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`, data)
        return res.data
    }
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateProduct = async (data: TParamsUpdateProduct) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`, rests)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteProduct = async (id: string) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getProductDetail = async (id: string) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const deleteMultipleProducts = async (data: TParamsDeleteMultipleProducts) => {
    try {
        const res = await instance.delete(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/delete-many`, {data})
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