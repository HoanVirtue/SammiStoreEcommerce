"use client"

//React
import React from 'react'

//Next
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

//redux
import {  RootState } from 'src/stores'

//translation
import { useTranslation } from 'react-i18next'

//components
const CreateUpdateBanner = dynamic(() => import('./components/CreateUpdateBanner').then(mod => mod.default), { ssr: false }) as React.FC<any>
const AdminPage = dynamic(() => import('src/components/admin-page'), { ssr: false })
const Image = dynamic(() => import('src/components/image'), { ssr: false })

import { deleteMultipleBannersAsync, deleteBannerAsync, getAllBannersAsync } from 'src/stores/banner/action'
import { resetInitialState } from 'src/stores/banner'
import { getBannerFields } from 'src/configs/gridConfig'
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
            deleteMultipleAction={deleteMultipleBannersAsync as unknown as (ids: { [key: number]: number[] }) => any}
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
