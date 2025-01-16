import { NextPage } from 'next'
import React from 'react'

//views
import NoNavLayout from 'src/view/layout/NoNavLayout'
import ChangePasswordPage from 'src/view/pages/change-password'

type TProps = {}

const ChangePassword: NextPage<TProps> = () => {
    return (
        <ChangePasswordPage />
    )
}

export default ChangePassword

ChangePassword.getLayout = (page: React.ReactNode) =><NoNavLayout>{page}</NoNavLayout>