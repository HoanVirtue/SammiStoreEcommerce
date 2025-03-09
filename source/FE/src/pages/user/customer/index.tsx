import { NextPage } from 'next'
import React from 'react'

//configs
import { PERMISSIONS } from 'src/configs/permission'
import ListCustomerPage from 'src/view/pages/user/customer/ListCustomer'

//Pages

type TProps = {}

const Customer: NextPage<TProps> = () => {
    return <ListCustomerPage />
}

Customer.permission = [PERMISSIONS.USER.CUSTOMER.VIEW]
export default Customer

