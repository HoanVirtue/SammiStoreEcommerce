"use client";

import { NextPage } from "next";

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
import { getDistrictColumns } from "src/configs/gridColumn";

const ListDistrictPage: NextPage = () => {

    const columns = getDistrictColumns();

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