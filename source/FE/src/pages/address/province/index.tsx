import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListProvincePage from 'src/view/pages/address/province/ListProvince'

//views

type TProps = {}

const Province: NextPage<TProps> = () => {
    return <ListProvincePage />
}

export default Province

Province.permission = [PERMISSIONS.SETTING.PROVINCE.VIEW]
