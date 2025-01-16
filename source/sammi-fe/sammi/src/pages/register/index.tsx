import { NextPage } from 'next'
import React from 'react'

//views
import BlankLayout from 'src/view/layout/BlankLayout'
import RegisterPage from 'src/view/pages/register'


type TProps = {}

const Register: NextPage<TProps> = () => {
    return (
        <RegisterPage />
    )
}

export default Register

Register.getLayout = (page: React.ReactNode) =><BlankLayout>{page}</BlankLayout>
Register.guestGuard = true