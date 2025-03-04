"use client";

// React
import React, { useEffect, useState } from "react";

// Next.js
import { NextPage } from "next";

// MUI
import { Box, Grid, Typography, useTheme } from "@mui/material";
import {
    GridColDef,
    GridRenderCellParams,
    GridRowSelectionModel,
    GridSortModel,
} from "@mui/x-data-grid";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";

// Translation
import { useTranslation } from "react-i18next";

// Configs
import {getWardFields, PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";

// Components
import CustomDataGrid from "src/components/custom-data-grid";
import CustomPagination from "src/components/custom-pagination";
import GridUpdate from "src/components/grid-update";
import GridDelete from "src/components/grid-delete";
import GridCreate from "src/components/grid-create";
import Spinner from "src/components/spinner";
import ConfirmDialog from "src/components/confirm-dialog";
import TableHeader from "src/components/table-header";

// Toast
import toast from "react-hot-toast";

// Utils
import { hexToRGBA } from "src/utils/hex-to-rgba";

// Hooks
import { usePermission } from "src/hooks/usePermission";

// Redux Actions
import {
    deleteMultipleWardsAsync,
    deleteWardAsync,
    getAllWardsAsync,
} from "src/stores/ward/action";

import { resetInitialState } from 'src/stores/ward'
import AdminFilter from "src/components/admin-filter";
import { useDebounce } from "src/hooks/useDebounce";
import CreateUpdateWard from "./components/CreateUpdateWard";


type TProps = {};

type TFilter = {
    field: string;
    operator: string;
    value: string;
    logic?: string;
};

const ListWardPage: NextPage<TProps> = () => {
    // States
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [loading, setLoading] = useState<boolean>(false)
    const [openCreateUpdateWard, setOpenCreateUpdateWard] = useState<{
        open: boolean;
        id: string;
    }>({ open: false, id: "" });
    const [openDeleteWard, setOpenDeleteWard] = useState<{
        open: boolean;
        id: string;
    }>({ open: false, id: "" });
    const [openDeleteMultipleWard, setOpenDeleteMultipleWard] =
        useState<boolean>(false);

    const [sortBy, setSortBy] = useState<string>("createdDate asc");
    const [filters, setFilters] = useState<TFilter[]>([]);

    const debouncedFilters = useDebounce(filters, 500);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    // Translation
    const { t } = useTranslation();
    const WardFields = getWardFields();

    // Hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("ADDRESS.WARD", [
        "CREATE",
        "UPDATE",
        "DELETE",
        "VIEW",
    ]);

    // Redux
    const {
        wards,
        isSuccessCreateUpdate,
        isErrorCreateUpdate,
        isLoading,
        errorMessageCreateUpdate,
        isSuccessDelete,
        isErrorDelete,
        errorMessageDelete,
        isSuccessDeleteMultiple,
        isErrorDeleteMultiple,
        errorMessageDeleteMultiple,
    } = useSelector((state: RootState) => state.ward);
    const dispatch = useDispatch<AppDispatch>();

    // Theme
    const theme = useTheme();

    // API Call
    const handleGetListWard = () => {
        const [orderByField, orderByDir] = sortBy.split(" ");
        const validFilters = debouncedFilters.filter(
            (f) => f.field && f.operator && (f.value || ["isnull", "isnotnull", "isempty", "isnotempty"].includes(f.operator))
        );
        const filterString = validFilters.length > 0
            ? validFilters.map((f) => `${f.field}::${f.value}::${f.operator}`).join("|")
            : "";
        const query = {
            params: {
                filters: filterString,
                take: pageSize,
                skip: (page - 1) * pageSize,
                orderBy: orderByField || "createdDate",
                dir: orderByDir || "asc",
                paging: true,
                keywords: debouncedFilters.length > 0 ? debouncedFilters[0].value || "''" : "''",
            },
        };
        dispatch(getAllWardsAsync(query));
    };

    // Handlers
    const handleOnChangePagination = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0];
        if (sortOption) {
            const field = sortOption.field === "ward_name" ? "name" :
                sortOption.field === "ward_code" ? "code" :
                    sortOption.field === "district_name" ? "districtName" : sortOption.field;
            setSortBy(`${field} ${sortOption.sort}`);
        } else {
            setSortBy("createdDate asc");
        }
    };

    const handleCloseCreateUpdateWard = () => {
        setOpenCreateUpdateWard({ open: false, id: "" });
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteWard({ open: false, id: "" });
    };

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleWard(false);
    };

    const handleDeleteWard = () => {
        dispatch(deleteWardAsync(openDeleteWard.id));
    };

    const handleDeleteMultipleWard = () => {
        dispatch(deleteMultipleWardsAsync({ wardIds: selectedRow }));
    };

    const handleAction = (action: string) => {
        if (action === "delete") {
            setOpenDeleteMultipleWard(true);
        }
    };

    const handleFilterChange = (newFilters: TFilter[]) => {
        setFilters(newFilters);
    };

    // Columns Definition
    const columns: GridColDef[] = [
        {
            field: "ward_name",
            headerName: t("ward_name"),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.name}</Typography>
            ),
        },
        {
            field: "ward_code",
            headerName: t("ward_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.code}</Typography>
            ),
        },
        {
            field: "district_name",
            headerName: t("district_name"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.districtName}</Typography>
            ),
        },
        {
            field: "district_code",
            headerName: t("district_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params?.row?.districtId}</Typography>
            ),
        },
        {
            field: "action",
            headerName: t("action"),
            width: 150,
            sortable: false,
            align: "left",
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <GridUpdate
                        // disabled={!UPDATE}
                        onClick={() =>
                            setOpenCreateUpdateWard({
                                open: true,
                                id: String(params.row.id),
                            })
                        }
                    />
                    <GridDelete
                        // disabled={!DELETE}
                        onClick={() =>
                            setOpenDeleteWard({ open: true, id: String(params.row.id) })
                        }
                    />
                </>
            ),
        },
    ];

    // Pagination Component
    const PaginationComponent = () => (
        <CustomPagination
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onChangePagination={handleOnChangePagination}
            page={page}
            rowLength={wards.total}
        />
    );

    // Effects
    useEffect(() => {
        handleGetListWard();
    }, [sortBy, page, pageSize, debouncedFilters]);


    useEffect(() => {
        if (isSuccessCreateUpdate) {
            toast.success(
                openCreateUpdateWard.id
                    ? t("update_ward_success")
                    : t("create_ward_success")
            );
            handleGetListWard();
            handleCloseCreateUpdateWard();
            dispatch(resetInitialState());
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate) {
            toast.error(errorMessageCreateUpdate);
            dispatch(resetInitialState());
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate]);

    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_ward_success"));
            handleGetListWard();
            dispatch(resetInitialState());
            handleCloseDeleteMultipleDialog();
            setSelectedRow([]);
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(t("delete_multiple_ward_error"));
            dispatch(resetInitialState());
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple]);

    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_ward_success"));
            handleGetListWard();
            dispatch(resetInitialState());
            handleCloseDeleteDialog();
        } else if (isErrorDelete && errorMessageDelete) {
            toast.error(errorMessageDelete);
            dispatch(resetInitialState());
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete]);

    return (
        <>
            {isLoading && <Spinner />}
            <ConfirmDialog
                open={openDeleteWard.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteWard}
                title={t("confirm_delete_ward")}
                description={t("are_you_sure_delete_ward")}
            />
            <ConfirmDialog
                open={openDeleteMultipleWard}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleWard}
                title={t("confirm_delete_multiple_wards")}
                description={t("are_you_sure_delete_multiple_wards")}
            />
            <CreateUpdateWard
                idWard={openCreateUpdateWard.id}
                open={openCreateUpdateWard.open}
                onClose={handleCloseCreateUpdateWard}
            />
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    padding: "20px",
                    minHeight: "100vh",
                }}
            >
                <Grid container>
                    {!selectedRow.length && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                mb: 4,
                                gap: 4,
                                width: "100%",
                            }}
                        >
                            <GridCreate
                                onClick={() =>
                                    setOpenCreateUpdateWard({ open: true, id: "" })
                                }
                            />
                        </Box>
                    )}
                    {selectedRow.length > 0 && (
                        <TableHeader
                            selectedRowNumber={selectedRow.length}
                            onClear={() => setSelectedRow([])}
                            actions={[
                                { label: t("delete"), value: "delete", disabled: !DELETE },
                            ]}
                            handleAction={handleAction}
                        />
                    )}
                    <CustomDataGrid
                        rows={wards.data}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row) => row.id}
                        disableRowSelectionOnClick
                        autoHeight
                        sortingOrder={["desc", "asc"]}
                        sortingMode="server"
                        onSortModelChange={handleSort}
                        slots={{ pagination: PaginationComponent, toolbar: AdminFilter }}
                        slotProps={{
                            toolbar: { fields: WardFields, onFilterChange: handleFilterChange },
                        }}
                        disableColumnFilter
                        disableColumnMenu
                        sx={{
                            ".selected-row": {
                                backgroundColor: `${hexToRGBA(
                                    theme.palette.primary.main,
                                    0.08
                                )} !important`,
                                color: `${theme.palette.primary.main} !important`,
                            },
                            "& .MuiDataGrid-root": {
                                border: `1px solid ${theme.palette.divider}`,
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme.palette.grey[100],
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: theme.palette.action.hover,
                            },
                            "& .MuiDataGrid-row.Mui-selected": {
                                backgroundColor: `${hexToRGBA(
                                    theme.palette.primary.main,
                                    0.08
                                )} !important`,
                                color: `${theme.palette.primary.main} !important`,
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                        }}
                        onRowSelectionModelChange={(row: GridRowSelectionModel) =>
                            setSelectedRow(row as string[])
                        }
                        rowSelectionModel={selectedRow}
                    />
                </Grid>
            </Box>
        </>
    );
};

export default ListWardPage;