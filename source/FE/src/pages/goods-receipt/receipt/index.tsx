import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views
import ListReceiptPage from 'src/view/pages/goods-receipt/receipt/ListReceipt'

type TProps = {}

const Receipt: NextPage<TProps> = () => {
    return <ListReceiptPage />
}

export default Receipt

Receipt.permission = [PERMISSIONS.GOODS_RECEIPT.RECEIPT_LIST.VIEW]
