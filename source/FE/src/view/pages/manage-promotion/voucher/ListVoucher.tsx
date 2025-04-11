"use client";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FC } from "react";

import {
    deleteMultipleVouchersAsync,
    deleteVoucherAsync,
    getAllVouchersAsync,
} from "src/stores/voucher/action";
import { resetInitialState } from "src/stores/voucher";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";
import { getVoucherColumns } from "src/configs/gridColumn";
import { getVoucherFields } from "src/configs/gridConfig";
import { useState } from "react";

const CreateUpdateVoucher = dynamic(() => import("./components/CreateUpdateVoucher"), {
    ssr: false
}) as FC<any>;

const ListVoucherPage: NextPage = () => {
    const columns = getVoucherColumns();

    const [currentTab, setCurrentTab] = useState(0);
    const [selectedVoucherId, setSelectedVoucherId] = useState<number>(0);
    const [showCreateTab, setShowCreateTab] = useState(false);
    const [showUpdateTab, setShowUpdateTab] = useState(false);
    const [showDetailTab, setShowDetailTab] = useState(false);

    const handleTabChange = (newTab: number) => {
        setCurrentTab(newTab);
        if (newTab === 0) {
            setSelectedVoucherId(0);
        }
    };

    const handleDetailClick = (id: number) => {
        setSelectedVoucherId(id);
        setShowDetailTab(true);
        setCurrentTab(3);
    };

    const handleAddClick = () => {
        setCurrentTab(1);
        setShowCreateTab(true);
    };

    return (
        <AdminPage
            entityName="voucher"
            columns={columns}
            fields={getVoucherFields()}
            reduxSelector={(state: RootState) => ({
                data: state.voucher.vouchers.data,
                total: state.voucher.vouchers.total,
                ...state.voucher,
            })}
            fetchAction={getAllVouchersAsync}
            deleteAction={deleteVoucherAsync}
            deleteMultipleAction={deleteMultipleVouchersAsync as unknown as (ids: { [key: number]: number[] }) => any}
            resetAction={resetInitialState}
            showTab={true}
            showCreateTab={showCreateTab}
            showUpdateTab={showUpdateTab}
            showDetailTab={showDetailTab}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            onAddClick={handleAddClick}
            onDetailClick={handleDetailClick}
            CreateUpdateTabComponent={CreateUpdateVoucher}
            permissionKey="MANAGE_PROMOTION.VOUCHER"
            fieldMapping={{
                "voucher_name": "name",
                "voucher_code": "code",
                "event_name": "eventName",
                "start_date": "startDate",
                "end_date": "endDate",
                "discount_name": "discountName",
                "discount_value": "discountValue",
                "usage_limit": "usageLimit",
                "used_count": "usedCount",
            }}
            noDataText="no_data_voucher"
        />
    );
};

export default ListVoucherPage;