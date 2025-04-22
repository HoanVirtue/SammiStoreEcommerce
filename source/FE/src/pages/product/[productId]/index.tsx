import { NextPage } from 'next'
import { lazy, Suspense } from 'react'
import Spinner from 'src/components/spinner'
import NoNavLayout from 'src/view/layout/NoNavLayout'

//views
const ProductDetailPage = lazy(() => import('src/view/pages/product/ProductDetail'))

type TProps = {}

const ProductDetail: NextPage<TProps> = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ProductDetailPage />
        </Suspense>
    )
}

export default ProductDetail

ProductDetail.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>
ProductDetail.authGuard = false
ProductDetail.guestGuard = false
