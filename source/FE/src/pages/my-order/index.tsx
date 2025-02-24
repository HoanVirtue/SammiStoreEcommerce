import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import MyOrderPage from 'src/view/pages/my-order'

//views

type TProps = {}

const MyOrder: NextPage<TProps> = () => {
    return <MyOrderPage />
}

export default MyOrder

MyOrder.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

