"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getSupplierFields } from "src/configs/gridConfig";
import CreateUpdateSupplier from "./components/CreateUpdateSupplier";
import {
  deleteMultipleSuppliersAsync,
  deleteSupplierAsync,
  getAllSuppliersAsync,
} from "src/stores/supplier/action";
import { resetInitialState } from "src/stores/supplier";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListSupplierPage: NextPage = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: "supplier_code",
      headerName: t("supplier_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "name",
      headerName: t("name"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.fullName}</Typography>,
    },
    {
      field: "phone",
      headerName: t("phone"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.phone}</Typography>,
    },
    {
      field: "email",
      headerName: t("email"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.email}</Typography>,
    },
    {
      field: "gender",
      headerName: t("gender"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>
          {params.row.gender === 1 ? t("male") : params.row.gender === 0 ? t("female") : t("unknown")}
        </Typography>
      ),
    },

  ];

  return (
    <AdminPage
      entityName="supplier"
      columns={columns}
      fields={getSupplierFields()}
      reduxSelector={(state: RootState) => ({
        data: state.supplier.suppliers.data,
        total: state.supplier.suppliers.total,
        ...state.supplier,
      })}
      fetchAction={getAllSuppliersAsync}
      deleteAction={deleteSupplierAsync}
      deleteMultipleAction={deleteMultipleSuppliersAsync as unknown as (ids: { [key: string]: string[] }) => any}
      resetAction={resetInitialState}
      CreateUpdateComponent={CreateUpdateSupplier}
      permissionKey="USER.SUPPLIER"
      fieldMapping={{
        "supplier_name": "name",
        "supplier_code": "code",
        "full_name": "fullName",
      }}
      noDataText="no_data_supplier"
    />
  );
};

export default ListSupplierPage;