import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListWardPage from '../../../view/pages/address/ward/ListWard'

//views

type TProps = {}

const Ward: NextPage<TProps> = () => {
    return <ListWardPage />
}

export default Ward

Ward.permission = [PERMISSIONS.ADDRESS.WARD.VIEW]
