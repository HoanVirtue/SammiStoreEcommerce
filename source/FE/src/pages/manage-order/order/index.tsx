import { NextPage } from 'next'
import { lazy, Suspense } from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import Spinner from 'src/components/spinner'
//views
// Dynamically import the ListOrder component
const ListOrderPage = lazy(() => import('src/view/pages/manage-order/order/ListOrder'))

type TProps = {}

const Order: NextPage<TProps> = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ListOrderPage />
        </Suspense>
    )
}

Order.permission = [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
export default Order

