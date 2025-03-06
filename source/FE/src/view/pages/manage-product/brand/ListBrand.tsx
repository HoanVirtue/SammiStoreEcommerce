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
import { getBrandFields, PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";

// Components
import CustomDataGrid from "src/components/custom-data-grid";
import CustomPagination from "src/components/custom-pagination";
import GridUpdate from "src/components/grid-update";
import GridDelete from "src/components/grid-delete";
import GridCreate from "src/components/grid-create";
import CreateUpdateBrand from "./components/CreateUpdateBrand";
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
    deleteMultipleBrandsAsync,
    deleteBrandAsync,
    getAllBrandsAsync,
} from "src/stores/brand/action";

import { resetInitialState } from 'src/stores/brand'
import AdminFilter from "src/components/admin-filter";
import { useDebounce } from "src/hooks/useDebounce";
import { TFilter } from "src/configs/filter";

type TProps = {};

const ListBrandPage: NextPage<TProps> = () => {
    // States
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateBrand, setOpenCreateUpdateBrand] = useState<{
        open: boolean;
        id: string;
    }>({ open: false, id: "" });
    const [openDeleteBrand, setOpenDeleteBrand] = useState<{
        open: boolean;
        id: string;
    }>({ open: false, id: "" });
    const [openDeleteMultipleBrand, setOpenDeleteMultipleBrand] =
        useState<boolean>(false);

    const [sortBy, setSortBy] = useState<string>("createdDate asc");
    const [filters, setFilters] = useState<TFilter[]>([]);

    const debouncedFilters = useDebounce(filters, 500);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    // Translation
    const { t } = useTranslation();

    // Hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("MANAGE_PRODUCT.BRAND", [
        "CREATE",
        "UPDATE",
        "DELETE",
        "VIEW",
    ]);

    // Redux
    const {
        brands,
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
    } = useSelector((state: RootState) => state.brand);
    const dispatch = useDispatch<AppDispatch>();

    // Theme
    const theme = useTheme();

    const brandFields = getBrandFields()

    // API Call
    const handleGetListBrand = () => {
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
        dispatch(getAllBrandsAsync(query));
    };

    // Handlers
    const handleOnChangePagination = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0];
        if (sortOption) {
            const field = sortOption.field === "brand_name" ? "name" :
                sortOption.field === "brand_code" ? "code" :
                    sortOption.field === "postal_code" ? "postalCode" : sortOption.field;
            setSortBy(`${field} ${sortOption.sort}`);
        } else {
            setSortBy("createdDate asc");
        }
    };

    const handleCloseCreateUpdateBrand = () => {
        setOpenCreateUpdateBrand({ open: false, id: "" });
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteBrand({ open: false, id: "" });
    };

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleBrand(false);
    };

    const handleDeleteBrand = () => {
        dispatch(deleteBrandAsync(openDeleteBrand.id));
    };

    const handleDeleteMultipleBrand = () => {
        dispatch(deleteMultipleBrandsAsync({ brandIds: selectedRow }));
    };

    const handleAction = (action: string) => {
        if (action === "delete") {
            setOpenDeleteMultipleBrand(true);
        }
    };

    const handleFilterChange = (newFilters: TFilter[]) => {
        setFilters(newFilters);
    };

    // Columns Definition
    const columns: GridColDef[] = [
        {
            field: "brand_name",
            headerName: t("brand_name"),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.name}</Typography>
            ),
        },
        {
            field: "brand_code",
            headerName: t("brand_code"),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Typography>{params.row.code}</Typography>
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
                            setOpenCreateUpdateBrand({
                                open: true,
                                id: String(params.row.id),
                            })
                        }
                    />
                    <GridDelete
                        // disabled={!DELETE}
                        onClick={() =>
                            setOpenDeleteBrand({ open: true, id: String(params.row.id) })
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
            rowLength={brands.total}
        />
    );

    // Effects
    useEffect(() => {
        handleGetListBrand();
    }, [sortBy, page, pageSize, debouncedFilters]);

    useEffect(() => {
        if (isSuccessCreateUpdate) {
            toast.success(
                openCreateUpdateBrand.id
                    ? t("update_brand_success")
                    : t("create_brand_success")
            );
            handleGetListBrand();
            handleCloseCreateUpdateBrand();
            dispatch(resetInitialState());
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate) {
            toast.error(errorMessageCreateUpdate);
            dispatch(resetInitialState());
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate]);

    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_brand_success"));
            handleGetListBrand();
            dispatch(resetInitialState());
            handleCloseDeleteMultipleDialog();
            setSelectedRow([]);
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(t("delete_multiple_brand_error"));
            dispatch(resetInitialState());
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple]);

    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_brand_success"));
            handleGetListBrand();
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
                open={openDeleteBrand.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteBrand}
                title={t("confirm_delete_Brand")}
                description={t("are_you_sure_delete_Brand")}
            />
            <ConfirmDialog
                open={openDeleteMultipleBrand}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleBrand}
                title={t("confirm_delete_multiple_Brands")}
                description={t("are_you_sure_delete_multiple_Brands")}
            />
            <CreateUpdateBrand
                idBrand={openCreateUpdateBrand.id}
                open={openCreateUpdateBrand.open}
                onClose={handleCloseCreateUpdateBrand}
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
                                    setOpenCreateUpdateBrand({ open: true, id: "" })
                                }
                            />
                        </Box>
                    )}
                    {selectedRow.length > 0 && (
                        <TableHeader
                            selectedRowNumber={selectedRow.length}
                            onClear={() => setSelectedRow([])}
                            actions={[
                                { label: t("delete"), value: "delete",
                                    //  disabled: !DELETE 
                                    },
                            ]}
                            handleAction={handleAction}
                        />
                    )}
                    <CustomDataGrid
                        rows={brands.data}
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
                            toolbar: { fields: brandFields, onFilterChange: handleFilterChange },
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

export default ListBrandPage;