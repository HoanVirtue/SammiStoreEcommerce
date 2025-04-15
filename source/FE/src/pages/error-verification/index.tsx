import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import ErrorVerificationPage from 'src/view/pages/error-verification'

//views

type TProps = {}

const ErrorVerification: NextPage<TProps> = () => {
    return <ErrorVerificationPage />
}

export default ErrorVerification

ErrorVerification.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

