"use client";

import React, { useEffect, useState, Suspense } from "react";
import { NextPage } from "next";
import dynamic from 'next/dynamic';
import { Box, Grid, useTheme, Tabs, Tab, IconButton, Stack } from "@mui/material";
import { GridColDef, GridRowSelectionModel, GridSortModel, GridRenderCellParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify'
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { useDebounce } from "src/hooks/useDebounce";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import { TFilter } from "src/configs/filter";
import { usePermission } from "src/hooks/usePermission";


// Dynamic imports for heavy components
const CustomDataGrid = dynamic(() => import("src/components/custom-data-grid"), { ssr: false });
const CustomPagination = dynamic(() => import("src/components/custom-pagination"), { ssr: false });
const Spinner = dynamic(() => import("src/components/spinner"), { ssr: false });
const ConfirmDialog = dynamic(() => import("src/components/confirm-dialog"), { ssr: false });
const TableHeader = dynamic(() => import("src/components/table-header"), { ssr: false });
const GridCreate = dynamic(() => import("src/components/grid-create"), { ssr: false });
const GridUpdate = dynamic(() => import("src/components/grid-update"), { ssr: false });
const GridDelete = dynamic(() => import("src/components/grid-delete"), { ssr: false });
const AdminFilter = dynamic(() => import("src/components/admin-filter"), { ssr: false });
const GridDetail = dynamic(() => import("../grid-detail"), { ssr: false });
const UpdateReceiptStatusHeader = dynamic(() => import("../update-receipt-status-header"), { ssr: false });
const UpdateOrderStatusHeader = dynamic(() => import("../update-order-status-header"), { ssr: false });

import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import OrderFilter from "src/view/pages/manage-order/order/components/OrderFilter";


type AdminPageProps = {
  entityName: string;
  columns: GridColDef[];
  fields: any[];
  reduxSelector: (state: RootState) => any;
  fetchAction: (query: any) => any;
  deleteAction: (id: number) => any;
  deleteMultipleAction: (ids: { [key: number]: number[] }) => any;
  resetAction: () => any;
  CreateUpdateComponent?: React.FC<any>;
  CreateUpdateTabComponent?: React.FC<any>;
  permissionKey: string;
  fieldMapping?: { [key: string]: string };
  noDataText?: string;
  DetailComponent?: React.FC<any>;
  CreateNewTabComponent?: React.FC<any>;

  showTab?: boolean;
  showCreateTab?: boolean;
  showUpdateTab?: boolean;
  showDetailTab?: boolean;
  showCreateNewTab?: boolean;

  currentTab?: number;
  onTabChange?: (newTab: number) => void;
  onAddClick?: () => void;
  onDetailClick?: (id: number) => void;
  onCreateNewClick?: () => void;

  hideAddButton?: boolean;
  disableUpdateButton?: boolean;
  disableDeleteButton?: boolean;

  showDetailButton?: boolean;
  onCloseCreateTab?: () => void;
  onCloseUpdateTab?: () => void;
  onCloseDetailTab?: () => void;
  onCloseCreateNewTab?: () => void;

  hideTableHeader?: boolean;
  showUpdateReceiptStatusHeader?: boolean;
  showUpdateOrderStatusHeader?: boolean;

  showOrderFilter?: boolean;
};

const AdminPage: NextPage<AdminPageProps> = ({
  entityName,
  columns,
  fields,
  reduxSelector,
  fetchAction,
  deleteAction,
  deleteMultipleAction,
  resetAction,
  CreateUpdateComponent,
  CreateUpdateTabComponent,
  DetailComponent,
  CreateNewTabComponent,
  permissionKey,
  fieldMapping = {},
  noDataText,

  showTab = false,
  showCreateTab = false,
  showUpdateTab = false,
  showDetailTab = false,
  showCreateNewTab = false,

  currentTab = 0,
  onTabChange,
  onAddClick,
  onDetailClick,
  onCreateNewClick,

  hideAddButton = false,
  disableUpdateButton = false,
  disableDeleteButton = false,
  showDetailButton = false,

  onCloseCreateTab,
  onCloseUpdateTab,
  onCloseDetailTab,
  onCloseCreateNewTab,

  hideTableHeader = false,
  showUpdateReceiptStatusHeader = false,
  showUpdateOrderStatusHeader = false,

  showOrderFilter = false,

}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [openCreateUpdate, setOpenCreateUpdate] = useState<{ open: boolean; id: number }>({ open: false, id: 0 });
  const [openDelete, setOpenDelete] = useState<{ open: boolean; id: number }>({ open: false, id: 0 });
  const [openDeleteMultiple, setOpenDeleteMultiple] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("createdDate asc");
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number>(0);
  const [newEntityName, setNewEntityName] = useState<string>("");



  const debouncedFilters = useDebounce(filters, 500);
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (router.pathname.includes("receipt")) {
      setNewEntityName("product");
    }
  }, [router.pathname]);


  const { VIEW, CREATE, UPDATE, DELETE } = usePermission(permissionKey, ["CREATE", "UPDATE", "DELETE", "VIEW"]);
  const {
    data,
    total,
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
  } = useSelector(reduxSelector);

  const handleFetchData = () => {
    const [orderByField, orderByDir] = sortBy.split(" ");
    const validFilters = debouncedFilters.filter(
      (f) => f.field && f.operator && (f.value || ["isnull", "isnotnull", "isempty", "isnotempty"].includes(f.operator))
    );
    const filterString =
      validFilters.length > 0
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
    dispatch(fetchAction(query));
  };

  const handleOnChangePagination = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0];
    if (sortOption) {
      const gridField = sortOption.field;
      const sortField = fieldMapping[gridField] || gridField;
      setSortBy(`${sortField} ${sortOption.sort}`);
    } else {
      setSortBy("createdDate asc");
    }
  };

  const handleCloseCreateUpdate = () => setOpenCreateUpdate({ open: false, id: 0 });
  const handleCloseDeleteDialog = () => setOpenDelete({ open: false, id: 0 });
  const handleCloseDeleteMultipleDialog = () => setOpenDeleteMultiple(false);

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(deleteAction(openDelete.id));
  };

  const handleDeleteMultiple = () => {
    setIsDeleting(true);
    dispatch(deleteMultipleAction({ [`${entityName}Ids`]: selectedRow }));
  };

  const handleAction = (action: string) => action === "delete" && DELETE && setOpenDeleteMultiple(true);

  const handleFilterChange = (newFilters: TFilter[]) => setFilters(newFilters);

  const PaginationComponent = () => (
    <CustomPagination
      pageSize={pageSize}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      onChangePagination={handleOnChangePagination}
      page={page}
      rowLength={total}
    />
  );

  useEffect(() => {
    handleFetchData();
  }, [sortBy, page, pageSize, debouncedFilters]);

  useEffect(() => {
    if (isSuccessCreateUpdate) {
      toast.success(openCreateUpdate.id ? t(`update_${entityName}_success`) : t(`create_${entityName}_success`));
      handleFetchData();
      handleCloseCreateUpdate();
      dispatch(resetAction());
    } else if (isErrorCreateUpdate && errorMessageCreateUpdate) {
      toast.error(errorMessageCreateUpdate);
      dispatch(resetAction());
    }
  }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate]);

  useEffect(() => {
    if (isSuccessDeleteMultiple) {
      toast.success(t(`delete_multiple_${entityName}s_success`));
      handleFetchData();
      dispatch(resetAction());
      handleCloseDeleteMultipleDialog();
      setSelectedRow([]);
      setIsDeleting(false);
    } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
      toast.error(t(`delete_multiple_${entityName}s_error`));
      dispatch(resetAction());
      setIsDeleting(false);
    }
  }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple]);

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t(`delete_${entityName}_success`));
      handleFetchData();
      dispatch(resetAction());
      handleCloseDeleteDialog();
      setIsDeleting(false);
    } else if (isErrorDelete && errorMessageDelete) {
      toast.error(errorMessageDelete);
      dispatch(resetAction());
      setIsDeleting(false);
    }
  }, [isSuccessDelete, isErrorDelete, errorMessageDelete]);

  // Define the action column
  const actionColumn: GridColDef = {
    field: "action",
    headerName: t("action"),
    width: 150,
    sortable: false,
    align: "left",
    renderCell: (params: GridRenderCellParams) => (
      <>
        {showDetailButton && (
          <GridDetail
            onClick={() => {
              setSelectedDetailId(params.row.id);
              onDetailClick?.(params.row.id);
            }}
          />
        )}

        <GridUpdate
          disabled={disableUpdateButton}
          onClick={() => setOpenCreateUpdate({ open: true, id: params.row.id })}
        />
        <GridDelete
          disabled={disableDeleteButton}
          onClick={() => setOpenDelete({ open: true, id: params.row.id })}
        />

      </>
    ),
  };

  const allColumns = [actionColumn, ...columns];

  return (
    <>
      {(isLoading || isDeleting) && (
        <Suspense fallback={<Spinner />}>
          <Spinner />
        </Suspense>
      )}
      <Suspense fallback={<Spinner />}>
        <ConfirmDialog
          open={openDelete.open}
          onClose={handleCloseDeleteDialog}
          handleCancel={handleCloseDeleteDialog}
          handleConfirm={handleDelete}
          title={t(`confirm_delete_${entityName}`)}
          description={t(`are_you_sure_delete_${entityName}`)}
        />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ConfirmDialog
          open={openDeleteMultiple}
          onClose={handleCloseDeleteMultipleDialog}
          handleCancel={handleCloseDeleteMultipleDialog}
          handleConfirm={handleDeleteMultiple}
          title={t(`confirm_delete_multiple_${entityName}s`)}
          description={t(`are_you_sure_delete_multiple_${entityName}s`)}
        />
      </Suspense>

      {CreateUpdateComponent && (
        <Suspense fallback={<Spinner />}>
          <CreateUpdateComponent
            id={openCreateUpdate.id}
            open={openCreateUpdate.open}
            onClose={handleCloseCreateUpdate}
          />
        </Suspense>
      )}

      <Box sx={{ backgroundColor: theme.palette.background.paper, padding: "20px", height: '80vh',overflow: "hidden" }}>
        {showTab && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={currentTab} onChange={(_, newValue) => onTabChange?.(newValue)}>
              <Tab value={0} label={t(`list_${entityName}`)} />
              {showCreateTab && <Tab value={1} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {t(`create_${entityName}`)}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabChange?.(0);
                      onCloseCreateTab?.();
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              } />}
              {showUpdateTab && <Tab value={2} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {t(`update_${entityName}`)}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabChange?.(0);
                      onCloseUpdateTab?.();
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              } />}
              {showDetailTab && <Tab value={3} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {t(`${entityName}_detail`)}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabChange?.(0);
                      onCloseDetailTab?.();
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              } />}
              {showCreateNewTab && <Tab value={4} label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {t(`create_new_${newEntityName}`)}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabChange?.(0);
                      onCloseCreateNewTab?.();
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              } />}
            </Tabs>
          </Box>
        )}

        <Grid container>
          {currentTab === 0 && (
            <>
              <Stack justifyContent="space-between" alignItems="center" direction="row" mb={2} width="100%">
                {showOrderFilter && (
                  <OrderFilter onFilterChange={handleFilterChange} />
                )}
                {!selectedRow.length && !hideAddButton && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, width: "100%" }}>
                    <Suspense fallback={<Spinner />}>
                      <GridCreate
                        addText={t(`create_${entityName}`)}
                        onClick={() => onAddClick ? onAddClick() : setOpenCreateUpdate({ open: true, id: 0 })}
                      />
                    </Suspense>
                  </Box>
                )}
              </Stack>
              {selectedRow.length > 0 && (
                <Suspense fallback={<Spinner />}>
                  {!hideTableHeader && (
                    <TableHeader
                      selectedRowNumber={selectedRow.length}
                      onClear={() => setSelectedRow([])}
                      actions={[{ label: t("delete"), value: "delete" }]}
                      handleAction={handleAction}
                      selectedRows={selectedRow}
                    />
                  )}

                  {showUpdateReceiptStatusHeader && (
                    <UpdateReceiptStatusHeader
                      selectedRowNumber={selectedRow.length}
                      onClear={() => setSelectedRow([])}
                      actions={[{ label: t("delete"), value: "delete" }]}
                      handleAction={handleAction}
                      selectedRows={selectedRow}
                    />
                  )}

                  {showUpdateOrderStatusHeader && (
                    <UpdateOrderStatusHeader
                      selectedRowNumber={selectedRow.length}
                      onClear={() => setSelectedRow([])}
                      actions={[{ label: t("delete"), value: "delete" }]}
                      handleAction={handleAction}
                      selectedRows={selectedRow}
                      onRefresh={handleFetchData}
                    />
                  )}
                </Suspense>
              )}

              <Suspense fallback={<Spinner />}>
                <CustomDataGrid
                  rows={data}
                  columns={allColumns}
                  checkboxSelection
                  getRowId={(row) => row.id}
                  disableRowSelectionOnClick
                  autoHeight
                  sortingOrder={["desc", "asc"]}
                  sortingMode="server"
                  onSortModelChange={handleSort}
                  slots={{
                    pagination: PaginationComponent,
                    toolbar: AdminFilter,
                    noRowsOverlay: () => <Box sx={{ p: 2, textAlign: "center" }}>{t(`${noDataText}`)}</Box>,
                  }}
                  slotProps={{ toolbar: { fields, onFilterChange: handleFilterChange } }}
                  disableColumnFilter
                  disableColumnMenu
                  sx={{
                    ".selected-row": {
                      backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                      color: `${theme.palette.primary.main} !important`,
                    },
                    "& .MuiDataGrid-root": { border: `1px solid ${theme.palette.divider}` },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme.palette.grey[100],
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    },
                    "& .MuiDataGrid-row:hover": { backgroundColor: theme.palette.action.hover },
                    "& .MuiDataGrid-row.Mui-selected": {
                      backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                      color: `${theme.palette.primary.main} !important`,
                    },
                    "& .MuiDataGrid-cell": { borderBottom: `1px solid ${theme.palette.divider}` },
                  }}
                  onRowSelectionModelChange={(row: GridRowSelectionModel) => setSelectedRow(row as number[])}
                  rowSelectionModel={selectedRow}
                />
              </Suspense>
            </>
          )}
          {currentTab === 1 && CreateUpdateTabComponent && (
            <CreateUpdateTabComponent
              id={0}
              open={true}
              onClose={() => {
                onTabChange?.(0);
                onCloseCreateTab?.();
              }}
              onCreateNew={() => {
                onTabChange?.(4);
                onCreateNewClick?.();
              }}
            />
          )}
          {currentTab === 2 && CreateUpdateTabComponent && (
            <CreateUpdateTabComponent
              id={openCreateUpdate.id}
              open={true}
              onClose={() => {
                onTabChange?.(0);
                onCloseUpdateTab?.();
              }}
            />
          )}
          {currentTab === 3 && showDetailTab && DetailComponent && (
            <DetailComponent
              id={selectedDetailId}
              onClose={() => {
                onTabChange?.(0);
                onCloseDetailTab?.();
              }}
              onRefresh={handleFetchData}
            />
          )}
          {currentTab === 4 && CreateNewTabComponent && (
            <CreateNewTabComponent
              id={0}
              onClose={() => {
                onTabChange?.(1);
                onCloseCreateNewTab?.();
              }}
            />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default AdminPage;