export type TParamsGetAllCities = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateCity = {
    name: string,
}

export type TParamsUpdateCity = {
    id: string,
    name: string,
}

export type TParamsDeleteCity = {
    id: string,
}

export type TParamsDeleteMultipleCities = {
    cityIds: string[],
}