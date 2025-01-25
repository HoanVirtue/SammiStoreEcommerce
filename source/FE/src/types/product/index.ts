export type TParamsGetAllProducts = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateProduct = {
    name: string,
    slug: string
}

export type TParamsUpdateProduct = {
    id: string,
    name: string,
    slug: string
}

export type TParamsDeleteProduct = {
    id: string,
}

export type TParamsDeleteMultipleProducts = {
    productTypeIds: string[],
}