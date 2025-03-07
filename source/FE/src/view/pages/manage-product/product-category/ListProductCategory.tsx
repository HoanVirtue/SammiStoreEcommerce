"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getProductCategoryFields } from "src/configs/gridConfig";
import CreateUpdateProductCategory from "./components/CreateUpdateProductCategory";
import {
    deleteMultipleProductCategoriesAsync,
    deleteProductCategoryAsync,
    getAllProductCategoriesAsync,
} from "src/stores/product-category/action";
import { resetInitialState } from "src/stores/product-category";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListProductCategoryPage: NextPage = () => {
    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: 'code',
            headerName: t('product_category_code'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.code}</Typography>
                )
            }
        },
        {
            field: 'name',
            headerName: t('product_category_name'),
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
            field: 'parentName',
            headerName: t('parent_name'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.parentName}</Typography>
                )
            }
        },
        {
            field: 'level',
            headerName: t('category_level'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.level}</Typography>
                )
            }
        },
        // {
        //     field: 'slug',
        //     headerName: t('slug'),
        //     minWidth: 200,
        //     maxWidth: 200,
        //     renderCell: (params: GridRenderCellParams) => {
        //         const { row } = params
        //         return (
        //             <Typography>{row?.slug}</Typography>
        //         )
        //     }
        // },
    ];

    return (
        <AdminPage
            entityName="product_category"
            columns={columns}
            fields={getProductCategoryFields()}
            reduxSelector={(state: RootState) => ({
                data: state.productCategory.productCategories.data,
                total: state.productCategory.productCategories.total,
                ...state.productCategory,
            })}
            fetchAction={getAllProductCategoriesAsync}
            deleteAction={deleteProductCategoryAsync}
            deleteMultipleAction={deleteMultipleProductCategoriesAsync as unknown as (ids: { [key: string]: string[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdateProductCategory}
            permissionKey="ADDRESS.productCategory"
            fieldMapping={{
                "ProductCategory_name": "name",
                "ProductCategory_code": "code",
                "province_name": "provinceName",
                "province_code": "provinceCode",
            }}
            noDataText="no_data_ProductCategory"
        />
    );
};

export default ListProductCategoryPage;