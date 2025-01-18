import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views

type TProps = {}

const Dashboard: NextPage<TProps> = () => {
    return <h1>Dashboard</h1>
}

Dashboard.permission = [PERMISSIONS.DASHBOARD]
export default Dashboard

