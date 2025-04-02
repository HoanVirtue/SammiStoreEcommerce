"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Grid, useTheme, Tabs, Tab } from "@mui/material";
import { GridColDef, GridRowSelectionModel, GridSortModel, GridRenderCellParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify'
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { useDebounce } from "src/hooks/useDebounce";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomDataGrid from "src/components/custom-data-grid";
import CustomPagination from "src/components/custom-pagination";
import Spinner from "src/components/spinner";
import ConfirmDialog from "src/components/confirm-dialog";
import TableHeader from "src/components/table-header";
import GridCreate from "src/components/grid-create";
import GridUpdate from "src/components/grid-update";
import GridDelete from "src/components/grid-delete";
import AdminFilter from "src/components/admin-filter";
import { TFilter } from "src/configs/filter";
import { usePermission } from "src/hooks/usePermission";
import GridDetail from "../grid-detail";

type AdminPageProps = {
  entityName: string;
  columns: GridColDef[];
  fields: any[];
  reduxSelector: (state: RootState) => any;
  fetchAction: (query: any) => any;
  deleteAction: (id: string) => any;
  deleteMultipleAction: (ids: { [key: string]: string[] }) => any;
  resetAction: () => any;
  CreateUpdateComponent?: React.FC<any>;
  permissionKey: string;
  fieldMapping?: { [key: string]: string };
  noDataText?: string;
  DetailComponent?: React.FC<any>;
  showCreateTab?: boolean;
  showDetailTab?: boolean;
  currentTab?: number;
  onTabChange?: (newTab: number) => void;
  onAddClick?: () => void;
  onDetailClick?: (id: string) => void;
  hiddenAddButton?: boolean;
  showDetailButton?: boolean;
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
  DetailComponent,
  permissionKey,
  fieldMapping = {},
  noDataText,

  showCreateTab = false,
  showDetailTab = false,
  currentTab = 0,
  onTabChange,
  onAddClick,
  onDetailClick,
  hiddenAddButton = false,
  showDetailButton = false,
}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [openCreateUpdate, setOpenCreateUpdate] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [openDelete, setOpenDelete] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [openDeleteMultiple, setOpenDeleteMultiple] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("createdDate asc");
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedDetailId, setSelectedDetailId] = useState<string>("");

  const debouncedFilters = useDebounce(filters, 500);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
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

  const handleCloseCreateUpdate = () => setOpenCreateUpdate({ open: false, id: "" });
  const handleCloseDeleteDialog = () => setOpenDelete({ open: false, id: "" });
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
          onClick={() => setOpenCreateUpdate({ open: true, id: params.row.id })}
        />
        <GridDelete
          onClick={() => setOpenDelete({ open: true, id: params.row.id })}
        />
      </>
    ),
  };

  const allColumns = [...columns, actionColumn];

  return (
    <>
      {(isLoading || isDeleting) && <Spinner />}
      <ConfirmDialog
        open={openDelete.open}
        onClose={handleCloseDeleteDialog}
        handleCancel={handleCloseDeleteDialog}
        handleConfirm={handleDelete}
        title={t(`confirm_delete_${entityName}`)}
        description={t(`are_you_sure_delete_${entityName}`)}
      />
      <ConfirmDialog
        open={openDeleteMultiple}
        onClose={handleCloseDeleteMultipleDialog}
        handleCancel={handleCloseDeleteMultipleDialog}
        handleConfirm={handleDeleteMultiple}
        title={t(`confirm_delete_multiple_${entityName}s`)}
        description={t(`are_you_sure_delete_multiple_${entityName}s`)}
      />
      {CreateUpdateComponent && (
        <CreateUpdateComponent
          id={openCreateUpdate.id}
          open={openCreateUpdate.open}
          onClose={handleCloseCreateUpdate}
        />
      )}

      <Box sx={{ backgroundColor: theme.palette.background.paper, padding: "20px", minHeight: "100vh" }}>
        {(showCreateTab || showDetailTab) && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={currentTab} onChange={(_, newValue) => onTabChange?.(newValue)}>
              <Tab label={t(`list_${entityName}`)} />
              {showCreateTab && <Tab label={t(`create_${entityName}`)} />}
              {showDetailTab && <Tab label={t(`detail_${entityName}`)} />}
            </Tabs>
          </Box>
        )}

        <Grid container>
          {currentTab === 0 && (
            <>
              {!selectedRow.length && !hiddenAddButton && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 4, gap: 4, width: "100%" }}>
                  <GridCreate
                    addText={t(`create_${entityName}`)}
                    onClick={() => onAddClick ? onAddClick() : setOpenCreateUpdate({ open: true, id: "" })}
                  />
                </Box>
              )}
              {selectedRow.length > 0 && (
                <TableHeader
                  selectedRowNumber={selectedRow.length}
                  onClear={() => setSelectedRow([])}
                  actions={[{ label: t("delete"), value: "delete" }]}
                  handleAction={handleAction}
                />
              )}
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
                onRowSelectionModelChange={(row: GridRowSelectionModel) => setSelectedRow(row as string[])}
                rowSelectionModel={selectedRow}
              />
            </>
          )}
          {currentTab === 1 && showCreateTab && CreateUpdateComponent && (
            <CreateUpdateComponent
              id={openCreateUpdate.id}
              open={true}
              onClose={() => onTabChange?.(0)}
            />
          )}
          {currentTab === 2 && showDetailTab && DetailComponent && (
            <DetailComponent
              id={selectedDetailId}
              onClose={() => onTabChange?.(0)}
            />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default AdminPage;