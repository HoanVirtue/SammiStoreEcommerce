"use client"

// React & Next.js imports
import React, { useCallback, memo } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

// Redux imports
import { RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'

// Translation imports
import { useTranslation } from 'react-i18next'

// Components - Dynamic imports with loading fallback
const CreateUpdateBanner = dynamic(
    () => import('./components/CreateUpdateBanner').then(mod => mod.default),
    {
        ssr: false,
        loading: () => <Spinner />
    }
) as React.FC<any>

const AdminPage = dynamic(
    () => import('src/components/admin-page'),
    {
        ssr: false,
        loading: () => <Spinner />
    }
)

const Image = dynamic(
    () => import('src/components/image'),
    {
        ssr: false,
        loading: () => <Spinner />
    }
)

// Redux actions & selectors
import {
    deleteMultipleBannersAsync,
    deleteBannerAsync,
    getAllBannersAsync
} from 'src/stores/banner/action'
import { resetInitialState } from 'src/stores/banner'

// Configurations
import { getBannerFields } from 'src/configs/gridConfig'
import { getBannerColumns } from 'src/configs/gridColumn'
import Spinner from 'src/components/spinner'

// Types
type TProps = {}

// Component chính hiển thị danh sách banner
const ListBanner: NextPage<TProps> = memo(() => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    // Lấy danh sách cột cho grid
    const columns = useCallback(() => getBannerColumns(), [])

    // Selector để lấy dữ liệu từ Redux store
    const bannerSelector = useCallback((state: RootState) => ({
        data: state.banner.banners.data,
        total: state.banner.banners.total,
        ...state.banner
    }), [])

    return (
        <AdminPage
            entityName="banner"
            columns={columns()}
            fields={getBannerFields()}
            reduxSelector={bannerSelector}
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
})

// Đặt tên cho component để dễ debug
ListBanner.displayName = 'ListBanner'

export default ListBanner
