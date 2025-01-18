import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views

type TProps = {}

const Order: NextPage<TProps> = () => {
    return <h1>Order</h1>
}

Order.permission = [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
export default Order

