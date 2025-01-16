import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

//views
import BlankLayout from 'src/view/layout/BlankLayout'

const LoginPage = dynamic(() => import('src/view/pages/login'), {
    ssr: false
})

type TProps = {}

const Login: NextPage<TProps> = () => {
    return (
        <LoginPage />
    )
}

export default Login

Login.getLayout = (page: React.ReactNode) =><BlankLayout>{page}</BlankLayout>
Login.guestGuard = true
