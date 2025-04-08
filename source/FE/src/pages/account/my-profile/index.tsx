import { NextPage } from 'next'
import React from 'react'
import AccountLayout from 'src/view/layout/AccountLayout'
import NoNavLayout from 'src/view/layout/NoNavLayout'

//views
import MyProfilePage from 'src/view/pages/account/my-profile'

type TProps = {}

const MyProfile: NextPage<TProps> = () => {
    return <MyProfilePage />
}

export default MyProfile

MyProfile.getLayout = (page: React.ReactNode) => (
    <NoNavLayout>
        <AccountLayout>{page}</AccountLayout>
    </NoNavLayout>
)
