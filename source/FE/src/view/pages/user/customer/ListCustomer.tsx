"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getCustomerFields } from "src/configs/gridConfig";
import CreateUpdateCustomer from "./components/CreateUpdateCustomer";
import {
  deleteMultipleCustomersAsync,
  deleteCustomerAsync,
  getAllCustomersAsync,
} from "src/stores/customer/action";
import { resetInitialState } from "src/stores/customer";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListCustomerPage: NextPage = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: "customer_code",
      headerName: t("customer_code"),
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
      entityName="customer"
      columns={columns}
      fields={getCustomerFields()}
      reduxSelector={(state: RootState) => ({
        data: state.customer.customers.data,
        total: state.customer.customers.total,
        ...state.customer,
      })}
      fetchAction={getAllCustomersAsync}
      deleteAction={deleteCustomerAsync}
      deleteMultipleAction={deleteMultipleCustomersAsync as unknown as (ids: { [key: number]: number[] }) => any}
      resetAction={resetInitialState}
      CreateUpdateComponent={CreateUpdateCustomer}
      permissionKey="USER.CUSTOMER"
      fieldMapping={{
        "customer_name": "name",
        "customer_code": "code",
        "full_name": "fullName",
      }}
      noDataText="no_data_customer"
    />
  );
};

export default ListCustomerPage;