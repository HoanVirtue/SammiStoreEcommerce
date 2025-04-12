export type TParamsGetAllCustomers = {
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

export type TParamsCreateCustomer = {
    roleIds: number[];
    code: string;
    identityGuid: string;
    type: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phone: string;
    streetAddress: string | null;
    wardId: number;
    username: string;
    password: string;
    gender: number;
    securityStamp: string;
}

export interface TParamsUpdateCustomer extends TParamsCreateCustomer {
    id: number
}

export type TParamsDeleteCustomer = {
    name: string,
    id: number,
}

export type TParamsDeleteMultipleCustomers = {
    customerIds: number[],
}