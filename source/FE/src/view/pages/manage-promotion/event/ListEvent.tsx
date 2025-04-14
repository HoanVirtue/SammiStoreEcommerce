"use client";

import { NextPage } from "next";
import { useState, Suspense, lazy } from "react";

// Redux imports
import { RootState } from "src/stores";
import {
    deleteMultipleEventsAsync,
    deleteEventAsync,
    getAllEventsAsync,
} from "src/stores/event/action";
import { resetInitialState } from "src/stores/event";

// Components imports
import AdminPage from "src/components/admin-page";
import { getEventColumns } from "src/configs/gridColumn";
import { getEventFields } from "src/configs/gridConfig";
import Spinner from "src/components/spinner";
// Lazy load CreateUpdateEvent component
const CreateUpdateEvent = lazy(() => import("./components/CreateUpdateEvent"));

// Constants
const EVENT_PERMISSION_KEY = "MANAGE_PROMOTION.EVENT";
const EVENT_FIELD_MAPPING = {
    "event_name": "name",
    "event_code": "code",
    "start_date": "startDate",
    "end_date": "endDate",
    "status": "status",
};

const ListEventPage: NextPage = () => {
    // State management
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedEventId, setSelectedEventId] = useState<number>(0);
    const [showCreateTab, setShowCreateTab] = useState(false);
    const [showUpdateTab, setShowUpdateTab] = useState(false);
    const [showDetailTab, setShowDetailTab] = useState(false);

    // Event handlers
    const handleTabChange = (newTab: number) => {
        setCurrentTab(newTab);
        if (newTab === 0) {
            setSelectedEventId(0);
        }
    };

    const handleDetailClick = (id: number) => {
        setSelectedEventId(id);
        setShowDetailTab(true);
        setCurrentTab(3);
    };

    const handleAddClick = () => {
        setCurrentTab(1);
        setShowCreateTab(true);
    };

    return (
        <Suspense fallback={<Spinner />}>
            <AdminPage
                entityName="event"
                columns={getEventColumns()}
                fields={getEventFields()}
                reduxSelector={(state: RootState) => ({
                    data: state.event.events.data,
                    total: state.event.events.total,
                    ...state.event,
                })}
                fetchAction={getAllEventsAsync}
                deleteAction={deleteEventAsync}
                deleteMultipleAction={deleteMultipleEventsAsync as unknown as (ids: { [key: number]: number[] }) => any}
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
                permissionKey={EVENT_PERMISSION_KEY}
                fieldMapping={EVENT_FIELD_MAPPING}
                noDataText="no_data_event"
            />
        </Suspense>
    );
};

export default ListEventPage;