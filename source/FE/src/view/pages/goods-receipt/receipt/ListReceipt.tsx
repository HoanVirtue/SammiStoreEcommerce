"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import { getReceiptFields } from "src/configs/gridConfig";
import React from "react";

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
import { getReceiptColumns } from "src/configs/gridColumn";
import CreateNewProduct from "./components/CreateNewProduct";

const ListReceiptPage: NextPage = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [selectedReceiptId, setSelectedReceiptId] = React.useState<number>(0);
  const [showCreateTab, setShowCreateTab] = React.useState(false);
  const [showUpdateTab, setShowUpdateTab] = React.useState(false);
  const [showDetailTab, setShowDetailTab] = React.useState(false);
  const [showCreateNewTab, setShowCreateNewTab] = React.useState(false);

  const columns = getReceiptColumns()

  const handleTabChange = (newTab: number) => {
    setCurrentTab(newTab);
    if (newTab === 0) {
      setSelectedReceiptId(0);
    }
  };

  const handleDetailClick = (id: number) => {
    setSelectedReceiptId(id);
    setShowDetailTab(true);
    setCurrentTab(3);
  };

  const handleAddClick = () => {
    setCurrentTab(1);
    setShowCreateTab(true);
  };

  const handleCreateNewClick = () => {
    setCurrentTab(4);
    setShowCreateNewTab(true);
  };

  const handleCloseCreateNewTab = () => {
    setCurrentTab(1);
    setShowCreateNewTab(false);
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
      <AdminPage
        entityName="receipt"
        columns={columns}
        fields={getReceiptFields()}
        reduxSelector={(state: RootState) => ({
          data: state.receipt.receipts.data,
          total: state.receipt.receipts.total,
          ...state.receipt,
        })}
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
        onDetailClick={handleDetailClick}
        onCreateNewClick={handleCreateNewClick}

        hideAddButton={false}
        disableUpdateButton={true}
        disableDeleteButton={true}  
        showDetailButton={true}

        onCloseCreateTab={() => setShowCreateTab(false)}
        onCloseDetailTab={() => setShowDetailTab(false)}
        onCloseCreateNewTab={handleCloseCreateNewTab}

        hideTableHeader={true}
        showUpdateReceiptStatusHeader={true}
        
      />
    </Box>
  );
};

export default ListReceiptPage;