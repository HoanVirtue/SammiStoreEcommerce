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

const ListReceiptPage: NextPage = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState(0);

  const columns: GridColDef[] = [
    {
      field: "receipt_name",
      headerName: t("receipt_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
    },
    {
      field: "receipt_code",
      headerName: t("receipt_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "postal_code",
      headerName: t("postal_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.postalCode}</Typography>,
    },

  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={t("list_receipt")} />
          <Tab label={t("create_receipt")} />
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
          />
        ) : (
          <CreateUpdateReceipt />
        )}
      </Box>
    </Box>
  );
};

export default ListReceiptPage;