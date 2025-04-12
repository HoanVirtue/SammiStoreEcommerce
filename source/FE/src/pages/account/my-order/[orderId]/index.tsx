import { NextPage } from 'next'
import React from 'react'
import AccountLayout from 'src/view/layout/AccountLayout'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import MyOrderDetailPage from 'src/view/pages/account/my-order/OrderDetail'

//views

type TProps = {}

const MyOrderDetail: NextPage<TProps> = () => {
    return <MyOrderDetailPage />
}

export default MyOrderDetail

MyOrderDetail.getLayout = (page: React.ReactNode) => <NoNavLayout>
    <AccountLayout>
        {page}
    </AccountLayout>
</NoNavLayout>

