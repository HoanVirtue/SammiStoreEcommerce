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
import CreateUpdateEvent from "./components/CreateUpdateEvent";
import { useState } from "react";
const ListEventPage: NextPage = () => {

    const columns = getEventColumns();

    const [currentTab, setCurrentTab] = useState(0);
    const [selectedReceiptId, setSelectedReceiptId] = useState<string>("");
    const [showCreateTab, setShowCreateTab] = useState(false);
    const [showUpdateTab, setShowUpdateTab] = useState(false);
    const [showDetailTab, setShowDetailTab] = useState(false);

    const handleTabChange = (newTab: number) => {
        setCurrentTab(newTab);
        if (newTab === 0) {
            setSelectedReceiptId("");
        }
    };

    const handleDetailClick = (id: string) => {
        setSelectedReceiptId(id);
        setShowDetailTab(true);
        setCurrentTab(3);
    };

    const handleAddClick = () => {
        setCurrentTab(1);
        setShowCreateTab(true);
    };
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
            showTab={true}
            showCreateTab={showCreateTab}
            showUpdateTab={showUpdateTab}
            showDetailTab={showDetailTab}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            onAddClick={handleAddClick}
            onDetailClick={handleDetailClick}
            CreateUpdateTabComponent={CreateUpdateEvent}


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