export type TParamsGetAllPaymentMethods = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreatePaymentMethod = {
    name: string,
    type: string
}

export type TParamsUpdatePaymentMethod = {
    id: string,
    name: string,
    type: string
}

export type TParamsDeletePaymentMethod = {
    id: string,
}

export type TParamsDeleteMultiplePaymentMethods = {
    paymentMethodIds: string[],
}