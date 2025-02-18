"use client"

import React, { useState } from 'react';
import { DataGridPremium, GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid-premium';
import { Box, Typography, useTheme } from '@mui/material';
import SearchField from '../search-field';
import TableHeader from '../table-header';


interface AdminTableProps {
  rows: any[];
  columns: GridColDef[];
  rowCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onSortChange: (sortModel: GridSortModel) => void;
  onSearch: (searchText: string) => void;
  onRowSelectionChange?: (selectedRows: GridRowSelectionModel) => void;
  selectedRows?: GridRowSelectionModel;
  loading?: boolean;
  actions?: { label: string; value: string; disabled?: boolean }[];
  onAction?: (action: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  rows,
  columns,
  rowCount,
  page,
  pageSize,
  onPageChange,
  onSortChange,
  onSearch,
  onRowSelectionChange,
  selectedRows = [],
  loading = false,
  actions = [],
  onAction,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, padding: '20px', height: 'fit-content' }}>
      <DataGridPremium
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => onPageChange(page, pageSize)}
        sortingMode="server"
        onSortModelChange={onSortChange}
        checkboxSelection
        onRowSelectionModelChange={onRowSelectionChange}
        rowSelectionModel={selectedRows}
        loading={loading}
        disableColumnFilter
        disableColumnMenu
        sx={{
          '.MuiDataGrid-row.selected-row': {
            backgroundColor: `${theme.palette.primary.main}10 !important`,
          },
        }}
      />
    </Box>
  );
};

export default AdminTable;