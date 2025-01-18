"use client"
import { NextPage } from 'next'
import React, { ReactElement } from 'react'

//views
import BlankLayout from 'src/view/layout/BlankLayout'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import RegisterPage from 'src/view/pages/register'
import UserPage from 'src/view/pages/user'


type TProps = {}

const tabContentList = (): { [key: string]: ReactElement } => ({
    account: <></>,
    notifications: <></>,
    connections: <></>
  })

const User: NextPage<TProps> = () => {
    return (
        <UserPage />
    )
}

export default User
User.getLayout = (page: React.ReactNode) =><NoNavLayout>{page}</NoNavLayout>

