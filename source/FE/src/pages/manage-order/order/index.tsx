import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListOrderPage from 'src/view/pages/manage-order/order/ListOrder'

//views

type TProps = {}

const Order: NextPage<TProps> = () => {
    return <ListOrderPage />
}

Order.permission = [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
export default Order

