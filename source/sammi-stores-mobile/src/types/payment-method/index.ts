export type TParamsGetAllPaymentMethods = {
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

export type TParamsCreatePaymentMethod = {
    name: string,
}

export type TParamsUpdatePaymentMethod = {
    id: string,
    name: string,
}

export type TParamsDeletePaymentMethod = {
    id: string,
}

export type TParamsDeleteMultiplePaymentMethods = {
    paymentTypeIds: string[],
}