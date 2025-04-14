"use client";

// React & Next.js imports
import { NextPage } from "next";
import dynamic from "next/dynamic";

// Material UI imports
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

// i18n imports
import { useTranslation } from "react-i18next";

// Redux imports
import { RootState } from "src/stores";
import {
  deleteMultipleBrandsAsync,
  deleteBrandAsync,
  getAllBrandsAsync,
} from "src/stores/brand/action";
import { resetInitialState } from "src/stores/brand";

// Component imports
import AdminPage from "src/components/admin-page";

// Config imports
import { getBrandFields } from "src/configs/gridConfig";
import { getBrandColumns } from "src/configs/gridColumn";
import { FC } from "react";

// Dynamic import for CreateUpdateBrand component to reduce initial bundle size
const CreateUpdateBrand = dynamic(
  () => import("./components/CreateUpdateBrand"),
  {
    loading: () => <Typography>Loading...</Typography>,
    ssr: false // Disable SSR for this component since it's not needed on initial load
  }
);

/**
 * Trang quản lý thương hiệu
 * Sử dụng AdminPage component để hiển thị danh sách thương hiệu
 * với các chức năng CRUD cơ bản
 */
const ListBrandPage: NextPage = () => {
  const columns = getBrandColumns();

  return (
    <AdminPage
      entityName="brand"
      columns={columns}
      fields={getBrandFields()}
      reduxSelector={(state: RootState) => ({
        data: state.brand.brands.data,
        total: state.brand.brands.total,
        ...state.brand,
      })}
      fetchAction={getAllBrandsAsync}
      deleteAction={deleteBrandAsync}
      deleteMultipleAction={deleteMultipleBrandsAsync as unknown as (ids: { [key: number]: number[] }) => any}
      resetAction={resetInitialState}
      CreateUpdateComponent={CreateUpdateBrand as FC<any>}
      permissionKey="MANAGE_PRODUCT.BRAND"
      fieldMapping={{
        "brand_name": "name",
        "brand_code": "code",
      }}
      noDataText="no_data_brand"
    />
  );
};

export default ListBrandPage;