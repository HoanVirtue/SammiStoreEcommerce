import axios from "axios"
import { API_ENDPOINT } from "src/configs/api"
import instance from "src/helpers/axios"
import { TParamsCreateCart } from "src/types/cart"
import { TParamsCreateProduct, TParamsDeleteMultipleProducts, TParamsGetAllProducts, TParamsGetRelatedProduct, TParamsUpdateProduct } from "src/types/product"

export const getAllProducts = async (data: {params: TParamsGetAllProducts}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getAllProductsPublic = async (data: {params: TParamsGetAllProducts}) => {
    try {
        const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createCart = async (data: TParamsCreateCart) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.CART.INDEX}`, data)
        return res.data
    }
    catch (error: any) {
        return error?.response?.data
    }
}


export const updateProduct = async (data: TParamsUpdateProduct) => {
    const { id, ...rests } = data
    try {
        const res = await instance.put(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${data.id}`, data)
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

export const getProductDetailPublic = async (id: string) => {
    try {
        const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public/${id}`)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getProductDetailPublicBySlug = async (slug: string) => {
    try {

        const data = {params: {isPublic: true}}

        const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public/slug/${slug}`, data)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getListRelatedProductBySlug = async (data: {params: TParamsGetRelatedProduct}) => {
    try {
        const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/related`, data)
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


export const likeProduct = async (data: {productId: string }) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/like`, data)
        if(res?.data?.status === "Success") {
            return {
                data: {id: 1}
            }
        }
        return {
            data: null
        }
    } catch (error: any) {
        return error?.response?.data
    }
}

export const unlikeProduct = async (data: {productId: string }) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/unlike`, data)
        if(res?.data?.status === "Success") {
            return {
                data: {_id: 1}
            }
        }
        return {
            data: null
        }
    } catch (error: any) {
        return error?.response?.data
    }
}


export const getAllLikedProduct = async (data: {params: TParamsGetAllProducts}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/liked/me`, data)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getAllViewedProduct = async (data: {params: TParamsGetAllProducts}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/viewed/me`, data)
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}