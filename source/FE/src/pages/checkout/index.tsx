import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import CheckoutPage from 'src/view/pages/checkout'

//views

type TProps = {}

const Checkout: NextPage<TProps> = () => {
    return <CheckoutPage />
}

export default Checkout

Checkout.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

