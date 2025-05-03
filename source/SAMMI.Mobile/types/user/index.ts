export type TParamsGetAllUsers = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateUser = {
    firstName?: string,
    middleName?: string,
    lastName?: string,
    email: string,
    password?: string,
    phoneNumber?: string,
    role: string,
    city?: string,
    address?: string,
    status?: number,
    avatar?: string
}

export type TParamsUpdateUser = {
    id: number,
    firstName?: string,
    lastName?: string,
    email: string,
    password?: string,
    phoneNumber?: string,
    role: string,
    city?: string,
    address?: string,
    status?: number,
    avatar?: string
}

export type TParamsDeleteUser = {
    name: string,
    id: number,
}

export type TParamsDeleteMultipleUsers = {
    userIds: number[],
}

export type TParamsUser = {
    id: number;
    code: string;
    type?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    streetAddress?: string;
    wardId?: number;
    wardName?: string;
    districtId?: number;
    districtName?: string;
    provinceId?: number;
    provinceName?: string;
    username?: string;
    avatar?: string;
    birthday?: string; // ISO string (e.g., "2024-05-03T00:00:00")
    idCardNumber?: string;
    gender?: boolean;
}