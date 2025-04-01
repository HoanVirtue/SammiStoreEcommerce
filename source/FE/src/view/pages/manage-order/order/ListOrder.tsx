"use client"

//React
import React, { useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Chip, ChipProps, Typography, useTheme, Box, Tabs, Tab } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

//redux
import { RootState } from 'src/stores'

//translation
import { useTranslation } from 'react-i18next'

import { resetInitialState } from 'src/stores/user'
import { styled } from '@mui/material'
import { deleteOrderAsync, getAllManageOrderAsync } from 'src/stores/order/action'
import OrderDetail from './components/OrderDetail'
import AdminPage from 'src/components/admin-page'
import { getOrderFields } from 'src/configs/gridConfig'
import { formatDate } from 'src/utils'
import { getOrderColumns } from 'src/configs/gridColumn'

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

const ListOrderPage: NextPage<TProps> = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState(0)
    const [selectedOrderId, setSelectedOrderId] = useState<string>("")
    const [showDetailTab, setShowDetailTab] = useState(false)

    const STYLED_ORDER_STATUS = {
        0: {
            label: 'wait_payment',
            background: "orange"
        },
        1: {
            label: 'wait_delivery',
            background: theme.palette.warning.main
        },
        2: {
            label: 'completed',
            background: theme.palette.success.main
        },
        3: {
            label: 'cancelled',
            background: theme.palette.error.main
        },
        4: {
            label: 'all',
            background: "white"
        },
    }

    const columns = getOrderColumns()

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        if (newValue === 0) {
            setSelectedOrderId("")
        }
    }

    const handleDetailClick = (id: string) => {
        setSelectedOrderId(id)
        setShowDetailTab(true)
        setCurrentTab(1)
    }

    return (
        <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label={t("list_order")} />
                    {showDetailTab && <Tab label={t("order_detail")} />}
                </Tabs>
            </Box>

            <Box sx={{ mt: 2 }}>
                {currentTab === 0 ? (
                    <AdminPage
                        entityName="order"
                        columns={columns}
                        reduxSelector={(state: RootState) => ({
                            data: state.order.orderProducts.data,
                            total: state.order.orderProducts.total,
                            ...state.order,
                        })}
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
                        onDetailClick={handleDetailClick}
                        hiddenAddButton={true}
                    />
                ) : (
                    <OrderDetail id={selectedOrderId} onClose={() => setCurrentTab(0)} />
                )}
            </Box>
        </Box>
    )
}

export default ListOrderPage
