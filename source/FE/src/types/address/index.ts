export interface PropertyFilterModel {
    field: string;      
    operator: string;     
    filterValue: string;   
}

export type TParamsGetAllAddresses = {
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

export type TParamsCreateAddress = {
    streetAddress: string;
    wardId: number;
    isDefault?: boolean;
}

export interface TParamsUpdateAddress extends TParamsCreateAddress {
    id: string,
}

export type TParamsDeleteAddress = {
    id: string,
}

export type TParamsDeleteMultipleAddresses = {
    addressIds: string[],
}