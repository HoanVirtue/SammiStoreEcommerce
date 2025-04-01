"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Grid, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

//redux
import { AppDispatch, RootState } from 'src/stores'

//translation
import { useTranslation } from 'react-i18next'

//components
import CreateUpdateBanner from './components/CreateUpdateBanner'

import { deleteMultipleBannersAsync, deleteBannerAsync, getAllBannersAsync } from 'src/stores/banner/action'
import { resetInitialState } from 'src/stores/banner'
import { formatDate } from 'src/utils'
import AdminPage from 'src/components/admin-page'
import { getBannerFields } from 'src/configs/gridConfig'
import Image from 'src/components/image'
import { getBannerColumns } from 'src/configs/gridColumn'
type TProps = {}

const ListBanner: NextPage<TProps> = () => {
    const { t } = useTranslation()

    const columns = getBannerColumns()

    return (
        <AdminPage
            entityName="banner"
            columns={columns}
            fields={getBannerFields()}
            reduxSelector={(state: RootState) => ({
                data: state.banner.banners.data,
                total: state.banner.banners.total,
                ...state.banner
            })}
            fetchAction={getAllBannersAsync}
            deleteAction={deleteBannerAsync}
            deleteMultipleAction={deleteMultipleBannersAsync as unknown as (ids: { [key: string]: string[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdateBanner}
            permissionKey="SETTING.BANNER"
            fieldMapping={{
                "banner_name": "name",
                "created_at": "createdAt"
            }}
            noDataText="no_data_banner"
        />
    )
}

export default ListBanner
