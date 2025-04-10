"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getBrandFields } from "src/configs/gridConfig";
import CreateUpdateBrand from "./components/CreateUpdateBrand";
import {
  deleteMultipleBrandsAsync,
  deleteBrandAsync,
  getAllBrandsAsync,
} from "src/stores/brand/action";
import { resetInitialState } from "src/stores/brand";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";
import { getBrandColumns } from "src/configs/gridColumn";

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
      CreateUpdateComponent={CreateUpdateBrand}
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