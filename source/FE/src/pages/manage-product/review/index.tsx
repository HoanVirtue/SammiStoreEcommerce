import { NextPage } from 'next'
import { lazy, Suspense } from 'react'
import Spinner from 'src/components/spinner'
//views
const ListReviewPage = lazy(() => import('src/view/pages/manage-product/review/ListReview'))

//views

type TProps = {}

const Review: NextPage<TProps> = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ListReviewPage />
        </Suspense>
    )
}

export default Review

