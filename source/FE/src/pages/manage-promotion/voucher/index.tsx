import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views
import ListVoucherPage from 'src/view/pages/manage-promotion/voucher/ListVoucher'

type TProps = {}

    const Voucher: NextPage<TProps> = () => {
    return <ListVoucherPage />
}

export default Voucher

Voucher.permission = [PERMISSIONS.MANAGE_PROMOTION.VOUCHER.VIEW]
