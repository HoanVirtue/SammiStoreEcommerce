"use client";

import { NextPage } from "next";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { getWardFields } from "src/configs/gridConfig";
import CreateUpdateWard from "./components/CreateUpdateWard";
import {
    deleteMultipleWardsAsync,
    deleteWardAsync,
    getAllWardsAsync,
} from "src/stores/ward/action";
import { resetInitialState } from "src/stores/ward";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";

const ListWardPage: NextPage = () => {
    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: "ward_name",
            headerName: t("ward_name"),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
        },
        {
            field: "ward_code",
            headerName: t("ward_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
        },
        {
            field: "district_name",
            headerName: t("district_name"),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.districtName}</Typography>,
        },
        {
            field: "district_code",
            headerName: t("district_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => <Typography>{params.row.districtCode}</Typography>,
        },


    ];

    return (
        <AdminPage
            entityName="ward"
            columns={columns}
            fields={getWardFields()}
            reduxSelector={(state: RootState) => ({
                data: state.ward.wards.data,
                total: state.ward.wards.total,
                ...state.ward,
            })}
            fetchAction={getAllWardsAsync}
            deleteAction={deleteWardAsync}
            deleteMultipleAction={deleteMultipleWardsAsync as unknown as (ids: { [key: string]: string[] }) => any}
            resetAction={resetInitialState}
            CreateUpdateComponent={CreateUpdateWard}
            permissionKey="ADDRESS.WARD"
            fieldMapping={{
                "ward_name": "name",
                "ward_code": "code",
                "district_name": "districtName",
                "district_code": "districtCode",
            }}
            noDataText="no_data_ward"
        />
    );
};

export default ListWardPage;