import { NextPage } from 'next'
import React from 'react'

//configs
import { PERMISSIONS } from 'src/configs/permission'

//Pages
import ListUserPage from 'src/view/pages/system/user/ListUser'

type TProps = {}

const User: NextPage<TProps> = () => {
    return <ListUserPage />
}

User.permission = [PERMISSIONS.SYSTEM.USER.VIEW]
export default User

