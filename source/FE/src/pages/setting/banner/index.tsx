import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListProvincePage from 'src/view/pages/address/province/ListProvince'
import ListDeliveryMethod from 'src/view/pages/setting/delivery-method/ListDeliveryMethod'

//views

type TProps = {}

const Banner: NextPage<TProps> = () => {
    return <ListProvincePage />
}

export default Banner

Banner.permission = [PERMISSIONS.SETTING.DELIVERY_METHOD.VIEW]

