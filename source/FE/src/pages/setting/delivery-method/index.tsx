import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListDeliveryMethod from 'src/view/pages/setting/delivery-method/ListDeliveryMethod'

//views

type TProps = {}

const DeliveryMethod: NextPage<TProps> = () => {
    return <ListDeliveryMethod />
}

export default DeliveryMethod

DeliveryMethod.permission = [PERMISSIONS.SETTING.DELIVERY_METHOD.VIEW]

