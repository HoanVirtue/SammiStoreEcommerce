import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListBrand from '../../../view/pages/manage-product/brand/ListBrand'

//views

type TProps = {}

const Brand: NextPage<TProps> = () => {
    return <ListBrand />
}

Brand.permission = [PERMISSIONS.MANAGE_PRODUCT.BRAND.VIEW]
export default Brand

