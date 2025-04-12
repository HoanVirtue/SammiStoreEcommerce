"use client";

// React & Next.js imports
import { NextPage } from "next";
import { memo, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Material UI imports
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

// Components imports
const AdminPage = dynamic(() => import("src/components/admin-page"), {
  loading: () => <Spinner />,
  ssr: false
});

// Config imports
import { getEmployeeFields } from "src/configs/gridConfig";
import Spinner from 'src/components/spinner';

// Redux imports
import { RootState } from "src/stores";
import {
  deleteMultipleEmployeesAsync,
  deleteEmployeeAsync,
  getAllEmployeesAsync,
} from "src/stores/employee/action";
import { resetInitialState } from "src/stores/employee";

// Component imports
const CreateUpdateEmployee = dynamic(() => import("./components/CreateUpdateEmployee"), {
  loading: () => <Spinner />,
  ssr: false
});

/**
 * Trang danh sách nhân viên
 * Sử dụng dynamic import để tối ưu performance
 * Sử dụng memo để tránh re-render không cần thiết
 */
const ListEmployeePage: NextPage = () => {
  const { t } = useTranslation();

  // Sử dụng useMemo để cache columns, tránh tính toán lại mỗi lần render
  const columns: GridColDef[] = useMemo(() => [
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
  ], [t]);

  return (
    <Suspense fallback={<Spinner />}>
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
        CreateUpdateComponent={CreateUpdateEmployee as any}
        permissionKey="USER.EMPLOYEE"
        fieldMapping={{
          "employee_name": "name",
          "employee_code": "code",
          "full_name": "fullName",
        }}
        noDataText="no_data_employee"
      />
    </Suspense>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(ListEmployeePage);