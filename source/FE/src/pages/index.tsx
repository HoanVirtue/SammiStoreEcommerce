'use client'
import Head from 'next/head'
import { lazy, Suspense } from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import Spinner from 'src/components/spinner'
import { GetStaticProps } from 'next'
import { fetchStaticData, getRevalidationTime } from 'src/utils/staticFetching'
// Import services needed for home page data
// Example: import { getHomePageData } from 'src/services/home'

// Define type for home page data
interface HomePageProps {
  initialData: any;
}

// Dynamically import the Home component
const HomePage = lazy(() => import('src/view/pages/home'))

export default function Home({ initialData }: HomePageProps) {
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
        <HomePage initialData={initialData} />
      </Suspense>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Use the helper function for fetching home page data with error handling
  // Example implementation - replace with actual service calls for your homepage
  const homeData = await fetchStaticData(
    async () => {
      // Replace with actual API calls for your homepage data
      // For example:
      // const featuredProducts = await getFeaturedProducts();
      // const categories = await getCategories();
      // return { featuredProducts, categories };
      
      return {}; // Replace with actual data fetching
    },
    {}, // Fallback empty object if fetch fails
  );
  
  return {
    props: {
      initialData: homeData,
    },
    // Use appropriate revalidation time for the homepage
    revalidate: getRevalidationTime('home'),
  }
}

Home.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>
Home.guestGuard = false
Home.authGuard = false