"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Chip, ChipProps, styled, Typography } from "@mui/material";
import { getProductFields } from "src/configs/gridConfig";
import CreateUpdateProduct from "./components/CreateUpdateProduct";
import {
    deleteMultipleProductsAsync,
    deleteProductAsync,
    getAllProductsAsync,
} from "src/stores/product/action";
import { resetInitialState } from "src/stores/product";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";
import { useMemo } from "react";
import { formatPrice } from "src/utils";

const StyledPublicProduct = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#28c76f29",
    color: "#28c76f",
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))

const StyledPrivateProduct = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#da251d29",
    color: "#da251d",
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))

const ListProductPage: NextPage = () => {
    const { t } = useTranslation();

    const columns: GridColDef[] = useMemo(() => {
        return [
            {
                field: 'product_name',
                headerName: t('product_name'),
                flex: 1,
                minWidth: 200,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <Typography>{row?.name}</Typography>
                    )
                }
            },
            {
                field: 'brand',
                headerName: t('brand'),
                minWidth: 200,
                maxWidth: 200,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <Typography>{row?.brandName}</Typography>
                    )
                }
            },
            {
                field: 'product_category',
                headerName: t('product_category'),
                minWidth: 200,
                maxWidth: 200,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <Typography>{row?.categoryName}</Typography>
                    )
                }
            },
            {
                field: 'price',
                headerName: t('price'),
                minWidth: 150,
                maxWidth: 150,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <Typography>{`${formatPrice(row?.price)} VND`}</Typography>
                    )
                }
            },
            {
                field: 'stockQuantity',
                headerName: t('stock_quantity'),
                minWidth: 100,
                maxWidth: 100,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <Typography>{row?.stockQuantity}</Typography>
                    )
                }
            },
            {
                field: 'discount',
                headerName: t('discount'),
                minWidth: 100,
                maxWidth: 100,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <Typography>{row?.discount * 100}</Typography>
                    )
                }
            },
            {
                field: 'status',
                headerName: t('status'),
                flex: 1,
                minWidth: 140,
                maxWidth: 140,
                renderCell: (params: GridRenderCellParams) => {
                    const { row } = params
                    return (
                        <>
                            {row?.status ? (
                                <StyledPublicProduct label={t('public')} />
                            ) : (
                                <StyledPrivateProduct label={t('private')} />
                            )
                            }
                        </>
                    )
                }
            },
            // {
            //     field: 'created_at',
            //     headerName: t('created_at'),
            //     minWidth: 150,
            //     maxWidth: 150,
            //     renderCell: (params: GridRenderCellParams) => {
            //         const { row } = params
            //         return (
            //             <Typography>{formatDate(row?.createdAt, { dateStyle: "short", timeStyle: "short" })}</Typography>
            //         )
            //     }
            // },
        ] as const
    }, [t])
    return (
        <AdminPage
            entityName="product"
            columns={columns}
            fields={getProductFields()}
            reduxSelector={(state: RootState) => ({
                data: state.product.products.data,
                total: state.product.products.total,
                ...state.product,
            })}
            fetchAction={getAllProductsAsync}
            deleteAction={deleteProductAsync}
            deleteMultipleAction={deleteMultipleProductsAsync as unknown as (ids: { [key: string]: string[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdateProduct}
            permissionKey="MANAGE_PRODUCT.PRODUCT"
            fieldMapping={{
                "product_name": "name",
                "province_name": "provinceName",
                "province_code": "provinceCode",
            }}
            noDataText="no_data_product"
        />
    );
};

export default ListProductPage;