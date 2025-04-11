"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getEmployeeFields } from "src/configs/gridConfig";
import CreateUpdateEmployee from "./components/CreateUpdateEmployee";
import {
  deleteMultipleEmployeesAsync,
  deleteEmployeeAsync,
  getAllEmployeesAsync,
} from "src/stores/employee/action";
import { resetInitialState } from "src/stores/employee";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListEmployeePage: NextPage = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: "employee_code",
      headerName: t("employee_code"),
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
      entityName="employee"
      columns={columns}
      fields={getEmployeeFields()}
      reduxSelector={(state: RootState) => ({
        data: state.employee.employees.data,
        total: state.employee.employees.total,
        ...state.employee,
      })}
      fetchAction={getAllEmployeesAsync}
      deleteAction={deleteEmployeeAsync}
      deleteMultipleAction={deleteMultipleEmployeesAsync as unknown as (ids: { [key: number]: number[] }) => any}
      resetAction={resetInitialState}
      CreateUpdateComponent={CreateUpdateEmployee}
      permissionKey="USER.EMPLOYEE"
      fieldMapping={{
        "employee_name": "name",
        "employee_code": "code",
        "full_name": "fullName",
      }}
      noDataText="no_data_employee"
    />
  );
};

export default ListEmployeePage;