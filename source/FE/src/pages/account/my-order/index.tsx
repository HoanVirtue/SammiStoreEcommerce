import { NextPage } from 'next'
import React from 'react'
import AccountLayout from 'src/view/layout/AccountLayout'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import MyOrderPage from 'src/view/pages/account/my-order'

//views

type TProps = {}

const MyOrder: NextPage<TProps> = () => {
    return <MyOrderPage />
}

export default MyOrder

MyOrder.getLayout = (page: React.ReactNode) => (
    <NoNavLayout>
        <AccountLayout>{page}</AccountLayout>
    </NoNavLayout>
)
