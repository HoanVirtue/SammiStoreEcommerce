import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getImportStatistics } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import { formatDate } from '@/utils';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { ImportStatistic, ImportStatisticDetail } from '@/types/report';

const ImportStatisticsPage = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().startOf('year'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs().endOf('year'));
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [supplierId, setSupplierId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: importData, isLoading } = useQuery<{result: ImportStatistic}>({
    queryKey: ['import-statistics', startDate, endDate, employeeId, supplierId],
    queryFn: () =>
      getImportStatistics({
        dateFrom: startDate.toDate(),
        dateTo: endDate.toDate(),
        employeeId: employeeId || undefined,
        supplierId: supplierId || undefined,
      }),
  });

  const importTableData = Array.isArray(importData?.result?.imports?.subset)
    ? importData.result.imports.subset
    : [];

  const totalAmount = importData?.result?.totalAmount || 0;
  const totalQuantity = importData?.result?.totalQuantity || 0;
  const totalCount = importData?.result?.imports?.totalItemCount || 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEmployeeChange = (event: SelectChangeEvent<number | string>) => {
    setEmployeeId(event.target.value === '' ? null : Number(event.target.value));
  };

  const handleSupplierChange = (event: SelectChangeEvent<number | string>) => {
    setSupplierId(event.target.value === '' ? null : Number(event.target.value));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {t('import_statistics')}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label={t('from_date')}
                  value={startDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      setStartDate(newValue);
                    }
                  }}
                  slotProps={{ textField: { size: 'small' } }}
                />
                <DatePicker
                  label={t('to_date')}
                  value={endDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      setEndDate(newValue);
                    }
                  }}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </Box>
            </LocalizationProvider>
            
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="employee-select-label">{t('select_employee')}</InputLabel>
              <Select
                labelId="employee-select-label"
                value={employeeId || ''}
                onChange={handleEmployeeChange}
                label={t('select_employee')}
              >
                <MenuItem value=""><em>{t('none')}</em></MenuItem>
                <MenuItem value={1}>{t('employee')} 1</MenuItem>
                <MenuItem value={2}>{t('employee')} 2</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="supplier-select-label">{t('select_supplier')}</InputLabel>
              <Select
                labelId="supplier-select-label"
                value={supplierId || ''}
                onChange={handleSupplierChange}
                label={t('select_supplier')}
              >
                <MenuItem value=""><em>{t('none')}</em></MenuItem>
                <MenuItem value={1}>{t('supplier')} 1</MenuItem>
                <MenuItem value={2}>{t('supplier')} 2</MenuItem>
              </Select>
            </FormControl>
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
                  {t('total_amount')}: {formatCurrency(totalAmount)}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t('total_quantity')}: {totalQuantity}
                </Typography>
              </>
            )}
          </Box>
          
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('receipt_code')}</TableCell>
                  <TableCell>{t('employee')}</TableCell>
                  <TableCell>{t('supplier')}</TableCell>
                  <TableCell align="right">{t('total_price')}</TableCell>
                  <TableCell align="right">{t('quantity')}</TableCell>
                  <TableCell>{t('created_date')}</TableCell>
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
                ) : importTableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography sx={{ py: 2 }}>{t('no_data')}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  importTableData.map((row: ImportStatisticDetail) => (
                    <TableRow key={row.code}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.employeeName}</TableCell>
                      <TableCell>{row.supplierName}</TableCell>
                      <TableCell align="right">{formatCurrency(row.totalPrice || 0)}</TableCell>
                      <TableCell align="right">{row.totalQuantity}</TableCell>
                      <TableCell>
                        {formatDate(row.createdDate, { dateStyle: "medium", timeStyle: "short" })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
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

export default ImportStatisticsPage; 