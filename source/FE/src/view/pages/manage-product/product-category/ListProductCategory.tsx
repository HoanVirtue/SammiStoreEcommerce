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
import { getProductCategoryColumns } from "src/configs/gridColumn";
const ListProductCategoryPage: NextPage = () => {
    const { t } = useTranslation();

    const columns = getProductCategoryColumns();

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
            deleteMultipleAction={deleteMultipleProductCategoriesAsync as unknown as (ids: { [key: number]: number[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdateProductCategory}
            permissionKey="MANAGE_PRODUCT.PRODUCT_CATEGORY"
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