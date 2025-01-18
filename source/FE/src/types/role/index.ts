export type TParamsGetAllRoles = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateRole = {
    name: string,
}

export type TParamsUpdateRole = {
    name: string,
    id: string,
    permissions?: string[]
}
