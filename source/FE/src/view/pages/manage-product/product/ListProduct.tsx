"use client";

import { NextPage } from "next";
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
import { getProductColumns } from "src/configs/gridColumn";


const ListProductPage: NextPage = () => {
    const columns = getProductColumns();
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