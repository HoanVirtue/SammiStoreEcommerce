import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material';

const StyledDataGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.customColors.borderColor}`,
  borderRadius: "8px",
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
    <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <StyledDataGrid
        {...props}
      />
    </Box>
  );
})

export default CustomDataGrid