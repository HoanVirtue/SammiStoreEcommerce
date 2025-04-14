"use client";

// React & Next.js imports
import { NextPage } from "next";
import { memo, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";

// Material UI imports
import { GridColDef } from "@mui/x-data-grid";

// Components imports
const AdminPage = dynamic(() => import("src/components/admin-page"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// Config imports
import { getCustomerFields } from "src/configs/gridConfig";
import { getCustomerColumns } from "src/configs/gridColumn";

// Redux imports
import { RootState } from "src/stores";
import {
  deleteMultipleCustomersAsync,
  deleteCustomerAsync,
  getAllCustomersAsync,
} from "src/stores/customer/action";
import { resetInitialState } from "src/stores/customer";
import Spinner from 'src/components/spinner';

// Component imports
const CreateUpdateCustomer = dynamic(() => import("./components/CreateUpdateCustomer"), {
  loading: () => <Spinner />,
  ssr: false
});

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

/**
 * Trang danh sách khách hàng
 * Sử dụng dynamic import để tối ưu performance
 * Sử dụng memo để tránh re-render không cần thiết
 */
const ListCustomerPage: NextPage = () => {
  // Sử dụng useMemo để cache columns, tránh tính toán lại mỗi lần render
  const columns: GridColDef[] = useMemo(() => getCustomerColumns(), []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminPage
        entityName="customer"
        columns={columns}
        fields={getCustomerFields()}
        reduxSelector={(state: RootState) => ({
          data: state.customer.customers.data,
          total: state.customer.customers.total,
          ...state.customer,
        })}
        fetchAction={getAllCustomersAsync}
        deleteAction={deleteCustomerAsync}
        deleteMultipleAction={deleteMultipleCustomersAsync as unknown as (ids: { [key: number]: number[] }) => any}
        resetAction={resetInitialState}
        CreateUpdateComponent={CreateUpdateCustomer as any}
        permissionKey="USER.CUSTOMER"
        fieldMapping={{
          "customer_name": "name",
          "customer_code": "code",
          "full_name": "fullName",
        }}
        noDataText="no_data_customer"
      />
    </Suspense>
  );
};

// Sử dụng memo để tránh re-render không cần thiết
export default memo(ListCustomerPage);