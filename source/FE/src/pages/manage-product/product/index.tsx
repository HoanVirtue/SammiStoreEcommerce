import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListProduct from 'src/view/pages/manage-product/product/ListProduct'

//views

type TProps = {}

const Product: NextPage<TProps> = () => {
    return <ListProduct />
}

Product.permission = [PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW]
export default Product

