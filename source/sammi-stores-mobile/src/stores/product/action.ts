import { createAsyncThunk } from "@reduxjs/toolkit";

//services
import { createProduct, deleteMultipleProducts, deleteProduct, getAllLikedProduct, getAllProducts, getAllViewedProduct, likeProduct, unlikeProduct, updateProduct } from "../../services/product";

//types
import { TParamsCreateProduct, TParamsDeleteMultipleProducts, TParamsGetAllProducts, TParamsUpdateProduct } from "../../types/product";

export const serviceName = 'product'

export const getAllProductsAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetAllProducts }) => {
    const response = await getAllProducts(data)
    return response
})

export const createProductAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateProduct) => {
    const response = await createProduct(data)
    return response
})

export const updateProductAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsUpdateProduct) => {
    const response = await updateProduct(data)
    return response
})

export const deleteProductAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
    const response = await deleteProduct(id)
    return response
})

export const deleteMultipleProductsAsync = createAsyncThunk(`${serviceName}/delete-multiple`, async (data: TParamsDeleteMultipleProducts) => {
    const response = await deleteMultipleProducts(data)
    return response
})

export const likeProductAsync = createAsyncThunk(`${serviceName}/like`, async (data: {productId: string}) => {
    const response = await likeProduct(data)
    return response
})


export const unlikeProductAsync = createAsyncThunk(`${serviceName}/unlike`, async (data: {productId: string}) => {
    const response = await unlikeProduct(data)
    return response
})

export const getAllLikedProductsAsync = createAsyncThunk(`${serviceName}/get-all-liked`, async (data: { params: TParamsGetAllProducts }) => {
    const response = await getAllLikedProduct(data)
    return response
})

export const getAllViewedProductsAsync = createAsyncThunk(`${serviceName}/get-all-viewed`, async (data: { params: TParamsGetAllProducts }) => {
    const response = await getAllViewedProduct(data)
    return response
})
