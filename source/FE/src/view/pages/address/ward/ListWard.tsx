"use client";

import { NextPage } from "next";
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
import { getWardColumns } from "src/configs/gridColumn";

const ListWardPage: NextPage = () => {
    const columns = getWardColumns();
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