'use client'
import { useTheme } from '@mui/material'
import Head from 'next/head'
import { useSettings } from 'src/hooks/useSettings'
import NoNavLayout from 'src/view/layout/NoNavLayout'

export default function Home() {
  const theme = useTheme()
  const { settings } = useSettings()
  console.log('theme', { theme, settings })

  return (
    <>
      <Head>
        <title>SammiShop</title>
        <meta name='description' content='Online Cosmetic Shop' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <meta httpEquiv='Content-Security-Policy' content="default-src 'self'; script-src 'self'" /> */}
        <link rel='icon' href='/favicon.icon' />
      </Head>
    </>
  )
}

Home.getLayout = (page: React.ReactNode) =><NoNavLayout>{page}</NoNavLayout>
Home.guestGuard = false
Home.authGuard = false