import { NextPage } from 'next'
import React from 'react'
import NoNavLayout from 'src/view/layout/NoNavLayout'
import CollectionPage from 'src/view/pages/collection/all'


//views

type TProps = {}

const Collection: NextPage<TProps> = () => {
    return <CollectionPage />
}

export default Collection

Collection.getLayout = (page: React.ReactNode) => <NoNavLayout>{page}</NoNavLayout>

