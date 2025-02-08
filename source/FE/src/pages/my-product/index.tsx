import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'

//views
import MyProductPage from 'src/view/pages/my-product'

type TProps = {}

const MyProduct: NextPage<TProps> = () => {
    return <MyProductPage />
}

export default MyProduct

MyProduct.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

