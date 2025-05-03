"use client";

import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { getReceiptFields } from "src/configs/gridConfig";
import React, { useCallback, useMemo, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { getReceiptColumns } from "src/configs/gridColumn";

import {
  deleteMultipleReceiptsAsync,
  deleteReceiptAsync,
  getAllReceiptsAsync,
} from "src/stores/receipt/action";
import { resetInitialState } from "src/stores/receipt";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";
import CreateUpdateReceipt from "./components/CreateUpdateReceipt";
import ReceiptDetail from "./components/ReceiptDetail";
import CreateNewProduct from "./components/CreateNewProduct";

// Create a memoized selector for receipt data
const createReceiptSelector = createSelector(
  (state: RootState) => state.receipt.receipts.data,
  (state: RootState) => state.receipt.receipts.total,
  (state: RootState) => state.receipt,
  (data, total, receiptState) => ({
    data,
    total,
    ...receiptState,
  })
);

const ListReceiptPage: NextPage = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedReceiptId, setSelectedReceiptId] = useState<number>(0);
  const [showCreateTab, setShowCreateTab] = useState(false);
  const [showUpdateTab, setShowUpdateTab] = useState(false);
  const [showDetailTab, setShowDetailTab] = useState(false);
  const [showCreateNewTab, setShowCreateNewTab] = useState(false);

  // Memoize columns
  const columns = useMemo(() => getReceiptColumns(), []);
  
  // Memoize handlers
  const handleTabChange = (newTab: number) => {
    setCurrentTab(newTab);
    if (newTab === 0) {
      setSelectedReceiptId(0);
    }
  }

  const handleDetailClick = (id: number) => {
    setSelectedReceiptId(id);
    setShowDetailTab(true);
    setCurrentTab(3);
  };

  const handleAddClick = () => {
    setCurrentTab(1);
    setShowCreateTab(true);
  };

  const handleUpdateClick = () => {
    setCurrentTab(2);
    setShowUpdateTab(true);
  }

  const handleCreateNewClick = () => {
    setCurrentTab(4);
    setShowCreateNewTab(true);
  }

  const handleCloseCreateNewTab = () => {
    setCurrentTab(1);
    setShowCreateNewTab(false);
  }

  const handleCloseUpdateTab = () => {
    setCurrentTab(0);
    setShowUpdateTab(false);
  }

  const handleCloseCreateTab = () => {
    setShowCreateTab(false);
    setCurrentTab(0);
  }

  const handleCloseDetailTab = () => {
    setShowDetailTab(false);
    setCurrentTab(0);
  }

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
      <AdminPage
        entityName="receipt"
        columns={columns}
        fields={getReceiptFields()}
        reduxSelector={createReceiptSelector}
        fetchAction={getAllReceiptsAsync}
        deleteAction={deleteReceiptAsync}
        deleteMultipleAction={deleteMultipleReceiptsAsync as unknown as (ids: { [key: number]: number[] }) => any}
        resetAction={resetInitialState}
        CreateUpdateTabComponent={CreateUpdateReceipt}
        CreateNewTabComponent={CreateNewProduct}
        DetailComponent={ReceiptDetail}
        permissionKey="GOODS_RECEIPT.RECEIPT"
        fieldMapping={{
          "receipt_name": "name",
          "receipt_code": "code",
          "postal_code": "postalCode",
        }}
        noDataText="no_data_receipt"
        showTab={true}
        showCreateTab={showCreateTab}
        showDetailTab={showDetailTab}
        showUpdateTab={showUpdateTab}
        showCreateNewTab={showCreateNewTab}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onAddClick={handleAddClick}
        onUpdateClick={handleUpdateClick}
        onDetailClick={handleDetailClick}
        onCreateNewClick={handleCreateNewClick}
        hideAddButton={false}
        showDetailButton={true}
        onCloseCreateTab={handleCloseCreateTab}
        onCloseDetailTab={handleCloseDetailTab}
        onCloseCreateNewTab={handleCloseCreateNewTab}
        onCloseUpdateTab={handleCloseUpdateTab}
        hideTableHeader={true}
        showUpdateReceiptStatusHeader={true}
      />
    </Box>
  );
};

export default React.memo(ListReceiptPage);