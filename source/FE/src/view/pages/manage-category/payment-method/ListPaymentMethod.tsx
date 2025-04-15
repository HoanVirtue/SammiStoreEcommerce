"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

//redux
import { RootState } from 'src/stores'

//components
const CreateUpdatePaymentMethod = dynamic(() => import('./components/CreateUpdatePaymentMethod'), {
    ssr: false
}) as React.FC<any>

import { deleteMultiplePaymentMethodsAsync, deletePaymentMethodAsync, getAllPaymentMethodsAsync } from 'src/stores/payment-method/action'
import { resetInitialState } from 'src/stores/payment-method'

import AdminPage from 'src/components/admin-page'
import { getPaymentMethodFields } from 'src/configs/gridConfig'
import { getPaymentMethodColumns } from 'src/configs/gridColumn'
type TProps = {}

const ListPaymentMethod: NextPage<TProps> = () => {

    const columns = getPaymentMethodColumns()

    return (
        <AdminPage
            entityName="payment_method"
            columns={columns}
            fields={getPaymentMethodFields()}
            reduxSelector={(state: RootState) => ({
                data: state.paymentMethod.paymentMethods.data,
                total: state.paymentMethod.paymentMethods.total,
                ...state.paymentMethod
            })}
            fetchAction={getAllPaymentMethodsAsync}
            deleteAction={deletePaymentMethodAsync}
            deleteMultipleAction={deleteMultiplePaymentMethodsAsync as unknown as (ids: { [key: number]: number[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdatePaymentMethod}
            permissionKey="SETTING.PAYMENT_METHOD"
            fieldMapping={{
                "payment_method_name": "name",
                "created_at": "createdAt"
            }}
            noDataText="no_data_payment_method"
        />
    )
}

export default ListPaymentMethod
