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
import { getSupplierFields } from "src/configs/gridConfig";
import Spinner from 'src/components/spinner';

// Redux imports
import { RootState } from "src/stores";
import {
  deleteMultipleSuppliersAsync,
  deleteSupplierAsync,
  getAllSuppliersAsync,
} from "src/stores/supplier/action";
import { resetInitialState } from "src/stores/supplier";

// Component imports
const CreateUpdateSupplier = dynamic(() => import("./components/CreateUpdateSupplier"), {
  loading: () => <Spinner />,
  ssr: false
});

/**
 * Trang danh sách nhà cung cấp
 * Sử dụng dynamic import để tối ưu performance
 * Sử dụng memo để tránh re-render không cần thiết
 */
const ListSupplierPage: NextPage = () => {
  const { t } = useTranslation();

  // Sử dụng useMemo để cache columns, tránh tính toán lại mỗi lần render
  const columns: GridColDef[] = useMemo(() => [
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
  ], [t]);

  return (
    <Suspense fallback={<Spinner />}>
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
        deleteMultipleAction={deleteMultipleSuppliersAsync as unknown as (ids: { [key: number]: number[] }) => any}
        resetAction={resetInitialState}
        CreateUpdateComponent={CreateUpdateSupplier as any}
        permissionKey="USER.SUPPLIER"
        fieldMapping={{
          "supplier_name": "name",
          "supplier_code": "code",
          "full_name": "fullName",
        }}
        noDataText="no_data_supplier"
      />
    </Suspense>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(ListSupplierPage);