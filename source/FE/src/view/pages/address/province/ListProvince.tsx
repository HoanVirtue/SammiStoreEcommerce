"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getProvinceFields } from "src/configs/gridConfig";
import CreateUpdateProvince from "./components/CreateUpdateProvince";
import {
  deleteMultipleProvincesAsync,
  deleteProvinceAsync,
  getAllProvincesAsync,
} from "src/stores/province/action";
import { resetInitialState } from "src/stores/province";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListProvincePage: NextPage = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: "province_name",
      headerName: t("province_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
    },
    {
      field: "province_code",
      headerName: t("province_code"),
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

  return (
    <AdminPage
      entityName="province"
      columns={columns}
      fields={getProvinceFields()}
      reduxSelector={(state: RootState) => ({
        data: state.province.provinces.data,
        total: state.province.provinces.total,
        ...state.province,
      })}
      fetchAction={getAllProvincesAsync}
      deleteAction={deleteProvinceAsync}
      deleteMultipleAction={deleteMultipleProvincesAsync as unknown as (ids: { [key: string]: string[] }) => any}
      resetAction={resetInitialState}
      CreateUpdateComponent={CreateUpdateProvince}
      permissionKey="ADDRESS.PROVINCE"
      fieldMapping={{
        "province_name": "name",
        "province_code": "code",
        "postal_code": "postalCode",
      }}
      noDataText="no_data_province"
    />
  );
};

export default ListProvincePage;