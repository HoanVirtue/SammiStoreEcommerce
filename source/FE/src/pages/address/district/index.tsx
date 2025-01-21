import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views
import ListCityPage from 'src/view/pages/address/city/ListCity'

type TProps = {}

const City: NextPage<TProps> = () => {
    return <ListCityPage />
}

export default City

City.permission = [PERMISSIONS.SETTING.CITY.VIEW]
