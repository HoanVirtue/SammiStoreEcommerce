import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views
import ListDistrictPage from 'src/view/pages/address/district/ListDistrict'

type TProps = {}

const District: NextPage<TProps> = () => {
    return <ListDistrictPage />
}

export default District

// District.permission = [PERMISSIONS.SETTING.DISTRICT.VIEW]
