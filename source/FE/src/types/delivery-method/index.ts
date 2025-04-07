export type TParamsGetAllDeliveryMethods = {
    limit?: number,
    page?: number,
    search?: string,
    order?: string
}

export type TParamsCreateDeliveryMethod = {
    name: string,
    price: string
}

export type TParamsUpdateDeliveryMethod = {
    id: string,
    name: string,
    price: string
}

export type TParamsDeleteDeliveryMethod = {
    id: string,
}

export type TParamsDeleteMultipleDeliveryMethods = {
    deliveryTypeIds: string[],
}

export type TParamsGetCaculatedFee = {
    wardId: number,
    totalAmount: number,
}