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

type TProps = {}

const ListBanner: NextPage<TProps> = () => {
    const { t } = useTranslation()

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('banner_name'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.name}</Typography>
            )
        },

        {
            field: 'level',
            headerName: t('banner_level'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.level}</Typography>
            )
        },

        {
            field: 'imageCommand',
            headerName: t('banner_image'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Image src={params.row.imageUrl} alt={params.row.name} width={50} height={50} />
            )
        },

        {
            field: 'createdAt',
            headerName: t('created_at'),
            minWidth: 220,
            maxWidth: 220,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{formatDate(params.row.createdDate, { dateStyle: "short", timeStyle: "short" })}</Typography>
            )
        }
    ]

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
