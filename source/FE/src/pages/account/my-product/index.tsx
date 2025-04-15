import { NextPage } from 'next'
import React from 'react'
import AccountLayout from 'src/view/layout/AccountLayout'
import NoNavLayout from 'src/view/layout/NoNavLayout'

//views
import MyProductPage from 'src/view/pages/account/my-product'

type TProps = {}

const MyProduct: NextPage<TProps> = () => {
    return <MyProductPage />
}

export default MyProduct

MyProduct.getLayout = (page: React.ReactNode) => <NoNavLayout>
    <AccountLayout>
        {page}
    </AccountLayout>
</NoNavLayout>

