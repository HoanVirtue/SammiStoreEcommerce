import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import DashboardPage from 'src/view/pages/dashboard'

//views

type TProps = {}

const Dashboard: NextPage<TProps> = () => {
    return <DashboardPage />
}

Dashboard.permission = [PERMISSIONS.DASHBOARD]
export default Dashboard

