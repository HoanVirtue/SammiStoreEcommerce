import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'

//views
import ProductDetailPage from 'src/view/pages/product/ProductDetail'

type TProps = {}

const ProductDetail: NextPage<TProps> = () => {
    return <ProductDetailPage />
}

export default ProductDetail

ProductDetail.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>
ProductDetail.authGuard = false
ProductDetail.guestGuard = false
