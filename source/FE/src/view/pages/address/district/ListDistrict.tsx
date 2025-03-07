"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getDistrictFields } from "src/configs/gridConfig";
import CreateUpdateDistrict from "./components/CreateUpdateDistrict";
import {
    deleteMultipleDistrictsAsync,
    deleteDistrictAsync,
    getAllDistrictsAsync,
} from "src/stores/district/action";
import { resetInitialState } from "src/stores/district";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListDistrictPage: NextPage = () => {
    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: t("district_name"),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
        },
        {
            field: "code",
            headerName: t("district_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
        },
        {
            field: "provinceId",
            headerName: t("province_name"),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.provinceName}</Typography>,
        },
        {
            field: "provinceCode",
            headerName: t("province_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.provinceCode}</Typography>,
        },


    ];

    return (
        <AdminPage
            entityName="district"
            columns={columns}
            fields={getDistrictFields()}
            reduxSelector={(state: RootState) => ({
                data: state.district.districts.data,
                total: state.district.districts.total,
                ...state.district,
            })}
            fetchAction={getAllDistrictsAsync}
            deleteAction={deleteDistrictAsync}
            deleteMultipleAction={deleteMultipleDistrictsAsync as unknown as (ids: { [key: string]: string[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdateDistrict}
            permissionKey="ADDRESS.DISTRICT"
            fieldMapping={{
                "district_name": "name",
                "district_code": "code",
                "province_name": "provinceName",
                "province_code": "provinceCode",
            }}
            noDataText="no_data_district"
        />
    );
};

export default ListDistrictPage;