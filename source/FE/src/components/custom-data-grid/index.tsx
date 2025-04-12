import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material';

const StyledDataGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.customColors.borderColor}`,
  borderRadius: "8px",
  height: "40vh",
  '& .MuiDataGrid-main': {
    position: 'relative',
    overflow: 'hidden',
  },
  '& .MuiDataGrid-virtualScroller': {
    overflow: 'auto',
    minHeight: '100%',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[100],
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: '4px',
      '&:hover': {
        background: theme.palette.grey[500],
      },
    },
  },
  '& .MuiDataGrid-toolbarContainer': {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.customColors.borderColor}`,
  },
  '& .MuiDataGrid-columnHeaders': {
    position: 'sticky',
    top: 'var(--data-grid-toolbar-height, 0px)',
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  },
  '& .MuiDataGrid-footerContainer': {
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.customColors.borderColor}`,
  },
  ".MuiDataGrid-withBorderColor": {
    outline: "none !important"
  },
  ".MuiDataGrid-selectedRowCount": {
    display: "none"
  },
  ".MuiDataGrid-columnHeaderTitle": {
    textTransform: "uppercase",
    color: theme.palette.primary.main
  }
}))

const CustomDataGrid = React.forwardRef((props: DataGridProps, ref: React.Ref<any>) => {
  return (
    <StyledDataGrid
      {...props}
    />
  );
})

export default CustomDataGrid