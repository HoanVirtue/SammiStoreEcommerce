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
    id: string,
}

export type TParamsDeleteVoucher = {
    id: string,
}

export type TParamsDeleteMultipleVouchers = {
    voucherIds: string[],
}