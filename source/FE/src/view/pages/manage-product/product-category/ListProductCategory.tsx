"use client";

// React và Next.js imports
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FC } from "react";


// Third-party imports
import { useTranslation } from "react-i18next";

// Config imports
import { getProductCategoryFields } from "src/configs/gridConfig";
import { getProductCategoryColumns } from "src/configs/gridColumn";

// Store imports
import { RootState } from "src/stores";
import { resetInitialState } from "src/stores/product-category";
import {
    deleteMultipleProductCategoriesAsync,
    deleteProductCategoryAsync,
    getAllProductCategoriesAsync,
} from "src/stores/product-category/action";
import Spinner from "src/components/spinner";

// Dynamic imports cho các components lớn
const AdminPage = dynamic(() => import("src/components/admin-page"), {
    loading: () => <Spinner />,
    ssr: false
});

const CreateUpdateProductCategory = dynamic(
    () => import("./components/CreateUpdateProductCategory").then(mod => mod.default),
    {
        loading: () => <Spinner />,
        ssr: false
    }
) as FC<any>;

const ListProductCategoryPage: NextPage = () => {
    const { t } = useTranslation();

    // Lấy columns từ config
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

// Sử dụng React.memo để tránh re-render không cần thiết
export default ListProductCategoryPage;