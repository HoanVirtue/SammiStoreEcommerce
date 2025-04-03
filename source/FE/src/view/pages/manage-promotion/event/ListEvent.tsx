"use client";

import { NextPage } from "next";

import {
  deleteMultipleEventsAsync,
  deleteEventAsync,
  getAllEventsAsync,
} from "src/stores/event/action";
import { resetInitialState } from "src/stores/event";
import { RootState } from "src/stores";
import AdminPage from "src/components/admin-page";
import { getEventColumns } from "src/configs/gridColumn";
import { getEventFields } from "src/configs/gridConfig";

const ListEventPage: NextPage = () => {

  const columns = getEventColumns();
  return (
    <AdminPage
      entityName="event"
      columns={columns}
      fields={getEventFields()}
      reduxSelector={(state: RootState) => ({
        data: state.event.events.data,
        total: state.event.events.total,
        ...state.event,
      })}
      fetchAction={getAllEventsAsync}
      deleteAction={deleteEventAsync}
      deleteMultipleAction={deleteMultipleEventsAsync as unknown as (ids: { [key: string]: string[] }) => any}
      resetAction={resetInitialState}

      permissionKey="MANAGE_PROMOTION.EVENT"
      fieldMapping={{
        "event_name": "name",
        "event_code": "code",
        "start_date": "startDate",
        "end_date": "endDate",
        "status": "status",
      }}
      noDataText="no_data_event"
    />
  );
};

export default ListEventPage;