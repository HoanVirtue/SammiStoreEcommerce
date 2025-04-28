import { NextPage } from 'next'
import { lazy, Suspense } from 'react'
import { PERMISSIONS } from 'src/configs/permission'
//views
// Dynamically import the Dashboard component
const DashboardPage = lazy(() => import('src/view/pages/dashboard'))

type TProps = {}

const Dashboard: NextPage<TProps> = () => {
    return (
        <Suspense fallback={<></>}>
            <DashboardPage />
        </Suspense>
    )
}

Dashboard.permission = [PERMISSIONS.DASHBOARD]
export default Dashboard

