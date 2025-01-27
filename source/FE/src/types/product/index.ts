import { EditorState } from "draft-js"

export type TParamsGetAllProducts = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateProduct = {
    name: string,
    type: string,
    discount?: number,
    price: number,
    description: EditorState,
    slug: string,
    countInStock: number,
    status: number,
    discountStartDate?: Date | null,
    discountEndDate?: Date | null,
    image: string
}

export type TParamsUpdateProduct = {
    id: string,
    name: string,
    type: string,
    discount?: number,
    price: number,
    description: EditorState,
    slug: string,
    countInStock: number,
    status: number,
    discountStartDate?: Date | null,
    discountEndDate?: Date | null,
    image: string
}

export type TParamsDeleteProduct = {
    id: string,
}

export type TParamsDeleteMultipleProducts = {
    productIds: string[],
}