export type TParamsCreatePaymentUrl = {
    totalPrice: number,
    orderId: string,
    language: string
}

export type TParamsGetVNPayPaymentIpn = {
    vnp_SecureHash: number,
    vnp_TxnRef: string,
    vnp_ResponseCode: string
    orderId: string
}
