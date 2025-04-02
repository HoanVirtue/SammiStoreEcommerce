"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography, Box, Tabs, Tab } from "@mui/material";
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

const ListReceiptPage: NextPage = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [selectedReceiptId, setSelectedReceiptId] = React.useState<string>("");

  const columns = getReceiptColumns()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleDetailClick = (id: string) => {
    setSelectedReceiptId(id);
    setCurrentTab(2); // Switch to detail tab
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={t("list_receipt")} />
          <Tab label={t("create_receipt")} />
          <Tab label={t("receipt_detail")} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {currentTab === 0 ? (
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
            deleteMultipleAction={deleteMultipleReceiptsAsync as unknown as (ids: { [key: string]: string[] }) => any}
            resetAction={resetInitialState}
            permissionKey="GOODS_RECEIPT.RECEIPT"
            fieldMapping={{
              "receipt_name": "name",
              "receipt_code": "code",
              "postal_code": "postalCode",
            }}
            noDataText="no_data_receipt"
            onAddClick={() => setCurrentTab(1)}
            onDetailClick={handleDetailClick}
            showDetailButton={true}
          />
        ) : currentTab === 1 ? (
          <CreateUpdateReceipt />
        ) : (
          <ReceiptDetail id={selectedReceiptId} onClose={() => setCurrentTab(0)} />
        )}
      </Box>
    </Box>
  );
};

export default ListReceiptPage;