export type TParamsGetAllProductCategories = {
    skip?: number;
    take?: number;
    filters?: string;
    orderBy?: string;
    dir?: string;
    type?: number | (1 | 2 | 3 | 4 | 5 | 6)
    paging?: boolean;
    restrictOrderBy?: boolean;
    keywords?: string;
}

export type TParamsCreateProductCategory = {
    code: string,
    name: string,
    parentId?: string,
    parentName?: string,
    level?: number,
    // slug: string
}

export type TParamsUpdateProductCategory = {
    id: string,
    code: string,
    name: string,
    parentId?: string,
    parentName?: string,
    level?: number,
    // slug: string
}

export type TParamsDeleteProductCategory = {
    id: string,
}

export type TParamsDeleteMultipleProductCategories = {
    productCategoryIds: string[],
}