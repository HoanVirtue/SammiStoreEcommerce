"use client"

//React
import React, { useCallback, useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Chip, ChipProps, Typography, useTheme, Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

//redux
import { RootState } from 'src/stores'
import { createSelector } from '@reduxjs/toolkit'

//translation
import { useTranslation } from 'react-i18next'

import { resetInitialState } from 'src/stores/user'
import { styled } from '@mui/material'
import { deleteOrderAsync, getAllManageOrderAsync } from 'src/stores/order/action'
import OrderDetail from './components/OrderDetail'
import dynamic from 'next/dynamic'
import { getOrderFields } from 'src/configs/gridConfig'
import { formatDate } from 'src/utils'
import { getOrderColumns } from 'src/configs/gridColumn'
import Spinner from 'src/components/spinner'
import AdminPage from 'src/components/admin-page'

type TProps = {}

interface TStatusChip extends ChipProps {
    background: string
}

const StyledOrderStatus = styled(Chip)<TStatusChip>(({ theme, background }) => ({
    backgroundColor: background,
    color: theme.palette.common.white,
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))

// Create a memoized selector for order data
const createOrderSelector = createSelector(
    (state: RootState) => state.order.orderProducts.data,
    (state: RootState) => state.order.orderProducts.total,
    (state: RootState) => state.order,
    (data, total, orderState) => ({
        data,
        total,
        ...orderState,
    })
);

// Dynamic import for AdminPage
const AdminPageComponent = dynamic(() => import("src/components/admin-page"), {
    loading: () => <Spinner />,
    ssr: false
});

const ListOrderPage: NextPage<TProps> = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState(0)
    const [selectedOrderId, setSelectedOrderId] = useState<number>(0)
    const [showCreateTab, setShowCreateTab] = useState(false)
    const [showUpdateTab, setShowUpdateTab] = useState(false)
    const [showDetailTab, setShowDetailTab] = useState(false)

    // Memoize columns
    const columns = useMemo(() => getOrderColumns(), [])
    
    // Use the memoized selector
    const orderSelector = useCallback((state: RootState) => createOrderSelector(state), [])

    const handleTabChange = useCallback((newTab: number) => {
        setCurrentTab(newTab)
        if (newTab === 0) {
            setSelectedOrderId(0)
        }
    }, [])

    const handleDetailClick = useCallback((id: number) => {
        setSelectedOrderId(id)
        setShowDetailTab(true)
        setCurrentTab(3)
    }, [])

    const handleAddClick = useCallback(() => {
        setCurrentTab(1)
        setShowCreateTab(true)
    }, [])

    return (
        <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
            <AdminPageComponent
                entityName="order"
                columns={columns}
                reduxSelector={orderSelector}
                fields={getOrderFields()}
                fetchAction={getAllManageOrderAsync}
                deleteAction={deleteOrderAsync}
                deleteMultipleAction={() => { }}
                resetAction={resetInitialState}
                permissionKey="SYSTEM.MANAGE_ORDER.ORDER"
                noDataText="no_data_order"
                fieldMapping={{
                    "fullname": "customerName",
                }}
                DetailComponent={OrderDetail}
                showTab={true}
                showCreateTab={showCreateTab}
                showDetailTab={showDetailTab}
                currentTab={currentTab}
                onTabChange={handleTabChange}
                onDetailClick={handleDetailClick}
                onCloseDetailTab={() => setShowDetailTab(false)}
                hideAddButton={true}
                hideUpdateButton={true}
                hideDeleteButton={true}
                showDetailButton={true}
                showOrderFilter={true}
                hideTableHeader={true}
                showUpdateOrderStatusHeader={true}
            />
        </Box>
    )
}

export default ListOrderPage
