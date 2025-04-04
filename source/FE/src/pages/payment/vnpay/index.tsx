import { NextPage } from 'next'
import React from 'react'
import BlankLayout from 'src/view/layout/BlankLayout'
import NoNavLayout from 'src/view/layout/NoNavLayout'

//views
import PaymentPage from 'src/view/pages/payment/vnpay'


type TProps = {}

const Payment: NextPage<TProps> = () => {
    return <PaymentPage />
}

export default Payment

Payment.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

