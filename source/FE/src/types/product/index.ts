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
    location: string,
    discount: number,
    price: number,
    description: string,
    slug: string,
    countInStock: number,
    status: number,
    discountStartDate: Date | null,
    discountEndDate: Date | null,
    image: string
}

export type TParamsUpdateProduct = {
    id: string,
    name: string,
    type: string,
    location: string,
    discount: number,
    price: number,
    description: string,
    slug: string,
    countInStock: number,
    status: number,
    discountStartDate: Date | null,
    discountEndDate: Date | null,
    image: string
}

export type TParamsDeleteProduct = {
    id: string,
}

export type TParamsDeleteMultipleProducts = {
    productIds: string[],
}

export type TProduct = {
    _id: string,
    averageRating: number,
    createdAt: Date | null,
    image: string,
    price: number,
    name: string,
    slug: string,
    totalLike: number,
    countInStock: number,
    discountStartDate?: Date | null,
    discountEndDate?: Date | null,
    discount: number,
    totalReviews: number,
    sold: number,
    location: {
        name: string,   
        _id: string
    },
    likedBy: string[],
}

export type TParamsGetRelatedProduct = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
    slug: string   
}