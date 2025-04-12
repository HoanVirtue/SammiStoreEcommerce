"use client";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import { getProvinceFields } from "src/configs/gridConfig";
const CreateUpdateProvince = dynamic(() => import("./components/CreateUpdateProvince").then(mod => mod.default), {
  ssr: false
}) as React.FC<any>;
import {
  deleteMultipleProvincesAsync,
  deleteProvinceAsync,
  getAllProvincesAsync,
} from "src/stores/province/action";
import { resetInitialState } from "src/stores/province";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";
import { getProvinceColumns } from "src/configs/gridColumn";

const ListProvincePage: NextPage = () => {
  const columns = getProvinceColumns();
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
      deleteMultipleAction={deleteMultipleProvincesAsync as unknown as (ids: { [key: number]: number[] }) => any}
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