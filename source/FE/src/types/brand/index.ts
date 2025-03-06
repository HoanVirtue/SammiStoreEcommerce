export type TParamsGetAllBrands = {
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

export type TParamsCreateBrand = {
    code: string,
    name: string,
    image: string,
    // slug: string
}

export type TParamsUpdateBrand = {
    id: string,
    code: string,
    name: string,
    image: string,
    // slug: string
}

export type TParamsDeleteBrand = {
    id: string,
}

export type TParamsDeleteMultipleBrands = {
    brandIds: string[],
}