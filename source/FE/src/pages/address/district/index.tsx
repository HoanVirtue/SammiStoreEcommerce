import { NextPage } from 'next'
import { lazy, Suspense } from 'react'
import Spinner from 'src/components/spinner'
import { PERMISSIONS } from 'src/configs/permission'

//views
const ListDistrictPage = lazy(() => import('src/view/pages/address/district/ListDistrict'))

type TProps = {}

const District: NextPage<TProps> = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ListDistrictPage />
        </Suspense>
    )
}

export default District

District.permission = [PERMISSIONS.ADDRESS.DISTRICT.VIEW]
