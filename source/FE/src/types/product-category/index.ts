export type TParamsGetAllProductCategories = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateProductCategory = {
    name: string,
    slug: string
}

export type TParamsUpdateProductCategory = {
    id: string,
    name: string,
    slug: string
}

export type TParamsDeleteProductCategory = {
    id: string,
}

export type TParamsDeleteMultipleProductCategories = {
    productTypeIds: string[],
}