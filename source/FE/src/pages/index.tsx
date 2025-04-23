'use client'
import Head from 'next/head'
import { lazy, Suspense } from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import Spinner from 'src/components/spinner'
// Dynamically import the Home component
const HomePage = lazy(() => import('src/view/pages/home'))

export default function Home() {
  return (
    <>
      <Head>
        <title>Sammi Stores</title>
        <meta name='description' content='Cửa hàng mỹ phẩm' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <meta httpEquiv='Content-Security-Policy' content="default-src 'self'; script-src 'self'" /> */}
        <link rel='icon' href='/favicon.icon' />
      </Head>
      <Suspense fallback={<Spinner />}>
        <HomePage />
      </Suspense>
    </>
  )
}

Home.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>
Home.guestGuard = false
Home.authGuard = false