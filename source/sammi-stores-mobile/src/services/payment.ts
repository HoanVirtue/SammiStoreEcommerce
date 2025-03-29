import { API_ENDPOINT } from "../configs/api"
import instance from "../helpers/axios"
import { TParamsCreatePaymentUrl, TParamsGetVNPayPaymentIpn } from "../types/payment"


export const createVNPayPaymentUrl = async (data: TParamsCreatePaymentUrl) => {
    try {
        const res = await instance.post(`${API_ENDPOINT.PAYMENT.VNPAY.INDEX}/create-payment-url`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const getVNPayPaymentIpn = async (data: {params: TParamsGetVNPayPaymentIpn}) => {
    try {
        const res = await instance.get(`${API_ENDPOINT.PAYMENT.VNPAY.INDEX}/vnpay-ipn`, data)
        return res.data
    } catch (error) {
        return error
    }
}
