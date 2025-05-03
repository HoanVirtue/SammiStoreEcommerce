// import { EditorState } from "draft-js"

export type ProductImage = {
    imageUrl: string;
    imageBase64: string;
    publicId: string;
    typeImage: string;
    value: string;
    id: number;
    displayOrder: number;
}

export type TParamsGetAllProducts = {
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

export type TParamsGetSuggest = {
    keyWord: string;
    size: number;
}

export type TParamsSuggestProduct = {
    id: number;
    code: string;
    name: string;
    price?: number;
    discount?: number;
    newPrice?: number;
    productImage?: string;
}

// export type TParamsCreateProduct = {
//     name: string,
//     type: string,
//     location: string,
//     discount: number,
//     price: number,
//     description: string,
//     slug: string,
//     countInStock: number,
//     status: number,
//     discountStartDate: Date | null,
//     discountEndDate: Date | null,
//     image: string
// }

export type TProduct = {
    id: number;
    code: string;
    name: string;
    stockQuantity: number;
    price: number;
    discount: number;
    ingredient: string;
    uses: string;
    usageGuide: string;
    brandId: number;
    categoryId: number;
    status: number;
    startDate?: Date | null;
    endDate?: Date | null;
    images: ProductImage[];
}

export type TParamsCreateProduct = {
    code: string;
    name: string;
    stockQuantity: number;
    price: number;
    discount: number;
    ingredient: string;
    uses: string;
    usageGuide: string;
    brandId: number;
    categoryId: number;
    status: number;
    startDate?: string;
    endDate?: string;
    images: ProductImage[];
};

export interface TParamsUpdateProduct{
    id: number,
    code: string;
    name: string;
    stockQuantity: number;
    price: number;
    discount?: number;
    ingredient: string;
    uses: string;
    usageGuide: string;
    brandId: number;
    categoryId: number;
    status: number;
    startDate?: string;
    endDate?: string;
    existImages?: ProductImage[];
    newImages?: ProductImage[];
};


export type TParamsDeleteProduct = {
    id: number,
}

export type TParamsDeleteMultipleProducts = {
    productIds: number[],
}


export type TParamsGetRelatedProduct = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
    slug: string
}