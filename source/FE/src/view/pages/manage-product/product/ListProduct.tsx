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
import { useState } from "react";


const ListProductPage: NextPage = () => {
    const columns = getProductColumns();

    const [currentTab, setCurrentTab] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState<number>(0);
    const [showCreateTab, setShowCreateTab] = useState(false);
    const [showUpdateTab, setShowUpdateTab] = useState(false);
    const [showDetailTab, setShowDetailTab] = useState(false);

    const handleTabChange = (newTab: number) => {
        setCurrentTab(newTab);
        if (newTab === 0) {
            setSelectedProductId(0);
        }
    };

    const handleDetailClick = (id: number) => {
        setSelectedProductId(id);
        setShowDetailTab(true);
        setCurrentTab(3);
    };

    const handleAddClick = () => {
        setCurrentTab(1);
        setShowCreateTab(true);
    };
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
            deleteAction={deleteProductAsync as unknown as (id: number) => any}
            deleteMultipleAction={deleteMultipleProductsAsync as unknown as (ids: { [key: number]: number[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateTabComponent={CreateUpdateProduct}
            permissionKey="MANAGE_PRODUCT.PRODUCT"
            fieldMapping={{
                "product_name": "name",
                "province_name": "provinceName",
                "province_code": "provinceCode",
            }}
            noDataText="no_data_product"
            showTab={true}
            showCreateTab={showCreateTab}
            showDetailTab={showDetailTab}
            showUpdateTab={showUpdateTab}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            onAddClick={handleAddClick}
            onDetailClick={handleDetailClick}

            onCloseCreateTab={() => setShowCreateTab(false)}
            onCloseUpdateTab={() => setShowUpdateTab(false)}
            onCloseDetailTab={() => setShowDetailTab(false)}
        />
    );
};

export default ListProductPage;