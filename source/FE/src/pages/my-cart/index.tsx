import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import MyCartPage from 'src/view/pages/my-cart'

//views

type TProps = {}

const MyCart: NextPage<TProps> = () => {
    return <MyCartPage />
}

export default MyCart

MyCart.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

