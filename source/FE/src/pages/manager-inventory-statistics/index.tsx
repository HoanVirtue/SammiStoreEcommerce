import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getInventoryStatistics } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import { formatDate } from '@/utils';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress
} from '@mui/material';

const InventoryStatisticsPage = () => {
  const { t } = useTranslation();
  const [maximumStockQuantity, setMaximumStockQuantity] = useState<number | null>(null);
  const [daysOfExistence, setDaysOfExistence] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ['inventory-statistics', maximumStockQuantity, daysOfExistence],
    queryFn: () =>
      getInventoryStatistics({
        maximumStockQuantity: maximumStockQuantity || undefined,
        daysOfExistence: daysOfExistence || undefined,
        skip: page * rowsPerPage,
        take: rowsPerPage
      }),
  });

  // Đảm bảo inventoryTableData luôn là một mảng
  const inventoryTableData = Array.isArray(inventoryData?.result?.inventoryDetails.subset)
    ? inventoryData.result.inventoryDetails.subset
    : [];

  // Đảm bảo totalStockQuantity và totalAmount luôn có giá trị hợp lệ
  const totalStockQuantity = inventoryData?.result?.totalStockQuantity || 0;
  const totalAmount = inventoryData?.result?.totalAmount || 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMaximumStockQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    setMaximumStockQuantity(value);
  };

  const handleDaysOfExistenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    setDaysOfExistence(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {t('inventory_statistics')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
            <TextField
              label={t('maximum_stock_quantity')}
              type="number"
              size="small"
              value={maximumStockQuantity === null ? '' : maximumStockQuantity}
              onChange={handleMaximumStockQuantityChange}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ width: 200 }}
            />
            <TextField
              label={t('days_of_existence')}
              type="number"
              size="small"
              value={daysOfExistence === null ? '' : daysOfExistence}
              onChange={handleDaysOfExistenceChange}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ width: 200 }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={20} />
                <Typography variant="subtitle1">{t('loading')}</Typography>
              </Box>
            ) : (
              <>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t('total_quantity')}: {totalStockQuantity}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t('total_amount')}: {formatCurrency(totalAmount)}
                </Typography>
              </>
            )}
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('product_code')}</TableCell>
                  <TableCell>{t('product_name')}</TableCell>
                  <TableCell align="right">{t('quantity')}</TableCell>
                  <TableCell align="right">{t('price')}</TableCell>
                  <TableCell>{t('last_receipt_date')}</TableCell>
                  <TableCell align="right">{t('days_since_last_receipt')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, py: 2 }}>
                        <CircularProgress size={24} />
                        <Typography>{t('loading')}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : inventoryTableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography sx={{ py: 2 }}>{t('no_data')}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  inventoryTableData.map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.stockQuantity}</TableCell>
                      <TableCell align="right">{formatCurrency(row.price || 0)}</TableCell>
                      <TableCell>
                        {row.lastReceiptDate
                          ? formatDate(row.lastReceiptDate, { dateStyle: "medium", timeStyle: "short" })
                          : '-'}
                      </TableCell>
                      <TableCell align="right">{row.daysSinceLastReceipt || '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={inventoryData?.result?.totalCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('rows_per_page')}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('more_than')} ${to}`}`
            }
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default InventoryStatisticsPage;
