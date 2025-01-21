import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListPaymentMethod from 'src/view/pages/setting/payment-method/ListPaymentMethod'

//views

type TProps = {}

const PaymentMethod: NextPage<TProps> = () => {
    return <ListPaymentMethod />
}

export default PaymentMethod

PaymentMethod.permission = [PERMISSIONS.SETTING.PAYMENT_METHOD.VIEW]