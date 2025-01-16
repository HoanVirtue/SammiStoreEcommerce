import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//Pages
import ListRolePage from 'src/view/pages/system/role/ListRole'

//views

type TProps = {}

const Role: NextPage<TProps> = () => {
    return (
        <ListRolePage />
    )
}

Role.permission = [PERMISSIONS.SYSTEM.ROLE.VIEW]
export default Role

