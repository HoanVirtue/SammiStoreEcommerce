import { NextPage } from 'next'
import React from 'react'

//configs
import { PERMISSIONS } from 'src/configs/permission'
import ListSupplierPage from 'src/view/pages/user/supplier/ListSupplier'

//Pages

type TProps = {}

const Supplier: NextPage<TProps> = () => {
    return <ListSupplierPage />
}

Supplier.permission = [PERMISSIONS.USER.SUPPLIER.VIEW]
export default Supplier

