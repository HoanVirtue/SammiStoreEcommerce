import { NextPage } from 'next'
import { lazy, Suspense } from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import Spinner from 'src/components/spinner'
//views
const ListPaymentMethod = lazy(() => import('src/view/pages/manage-category/payment-method/ListPaymentMethod'))

type TProps = {}

const PaymentMethod: NextPage<TProps> = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ListPaymentMethod />
        </Suspense>
    )
}

export default PaymentMethod

PaymentMethod.permission = [PERMISSIONS.SETTING.PAYMENT_METHOD.VIEW]