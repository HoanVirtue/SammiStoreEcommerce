export interface PropertyFilterModel {
    field: string;      
    operator: string;     
    filterValue: string;   
}

export type TParamsGetAllVouchers = {
    skip?: number;
    take?: number;
    filters?: string;
    orderBy?: string;
    dir?: string;
    type?: number | (1 | 2 | 3 | 4 | 5 | 6)
    paging?: boolean;
    restrictOrderBy?: boolean;
    keywords?: string;
    propertyFilterModels?: PropertyFilterModel[]; 
}

export type TParamsVouchers = {
    id: number;
    name: string;
    eventId: number;
    eventName: string;
    discountTypeId: number;
    discountName: string;
    discountValue: number;
    usageLimit: number;
    usedCount: number;
    startDate: Date;
    endDate: Date;
    isValid?: boolean;
}

export type TParamsCreateVoucher = {
    name: string;
    categoryId: number;
    brandId: number;
    productId: number;
    eventId: number;
    discountTypeId: number;
    discountValue: number;
    usageLimit: number;
    usedCount: number;
    startDate: Date;
    endDate: Date;
    conditions:{
        voucherId: number;
        conditionType: number;
        conditionValue: string;
    }
}

export type TParamsFetchListApplyVoucher = {
    details: Array<{
        cartId: number;
        productId: number;
        productName: string;
        price: number;
        quantity: number;
    }>
}

export interface TParamsApplyMyVoucher extends TParamsFetchListApplyVoucher {
}


export type TParamsApplyVoucher = {
    name: string;
    categoryId: number;
    brandId: number;
    productId: number;
    eventId: number;
    discountTypeId: number;
    discountValue: number;
    usageLimit: number;
    usedCount: number;
    startDate: Date;
    endDate: Date;
    conditions:{
        voucherId: number;
        conditionType: number;
        conditionValue: string;
    }
}

export interface TParamsUpdateVoucher extends TParamsCreateVoucher {
    id: number,
}

export type TParamsDeleteVoucher = {
    id: number,
}

export type TParamsDeleteMultipleVouchers = {
    ids: number[],
}