import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListProductCategory from 'src/view/pages/manage-product/product-category/ListProductCategory'

//views

type TProps = {}

const ProductCategory: NextPage<TProps> = () => {
    return <ListProductCategory />
}

ProductCategory.permission = [PERMISSIONS.MANAGE_PRODUCT.PRODUCT_CATEGORY.VIEW]
export default ProductCategory

