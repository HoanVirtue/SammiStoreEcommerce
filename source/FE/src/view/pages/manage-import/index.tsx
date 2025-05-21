import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getImportStatistics } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import { formatDate } from '@/utils';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
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
  CircularProgress,
  useTheme
} from '@mui/material';
import { ImportStatistic, ImportStatisticDetail } from '@/types/report';
import CustomDataGrid from 'src/components/custom-data-grid';
import CustomPagination from 'src/components/custom-pagination';
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig';
import { hexToRGBA } from 'src/utils/hex-to-rgba';
import { GridColDef } from '@mui/x-data-grid';
import { getImportColumns } from '@/configs/gridColumn';

// Configure dayjs with plugins and locale
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

const columns = getImportColumns();

const ImportStatisticsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().tz('Asia/Ho_Chi_Minh').startOf('year'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs().tz('Asia/Ho_Chi_Minh').endOf('year'));
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [supplierId, setSupplierId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const { data: importData, isLoading } = useQuery<{result: ImportStatistic}>({
    queryKey: ['import-statistics', startDate, endDate, employeeId, supplierId, page, pageSize],
    queryFn: async () => {
      const dateFrom = startDate.tz('Asia/Ho_Chi_Minh').format();
      const dateTo = endDate.tz('Asia/Ho_Chi_Minh').format();

      return getImportStatistics({
        dateFrom,
        dateTo,
        employeeId: employeeId || undefined,
        supplierId: supplierId || undefined,
        skip: (page - 1) * pageSize,
        take: pageSize,
        paging: true,
        type: 1,
        orderBy: 'CreatedDate',
        dir: 'DESC',
        filters: [
          employeeId !== null ? `employeeId::${employeeId}::eq` : '',
          supplierId !== null ? `supplierId::${supplierId}::eq` : ''
        ].filter(Boolean).join('&&'),
      });
    },
    refetchOnWindowFocus: false
  });

  const importTableData = Array.isArray(importData?.result?.imports?.subset)
    ? importData.result.imports.subset
    : [];

  const totalAmount = importData?.result?.totalAmount || 0;
  const totalQuantity = importData?.result?.totalQuantity || 0;
  const totalCount = importData?.result?.imports?.totalItemCount || 0;

  const handleOnChangePagination = useCallback((newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  }, []);

  const handleEmployeeChange = (event: SelectChangeEvent<number | string>) => {
    setEmployeeId(event.target.value === '' ? null : Number(event.target.value));
  };

  const handleSupplierChange = (event: SelectChangeEvent<number | string>) => {
    setSupplierId(event.target.value === '' ? null : Number(event.target.value));
  };

  const PaginationComponent = () => {
    return (
      <CustomPagination
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onChangePagination={handleOnChangePagination}
        page={page}
        rowLength={totalCount}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {t('import_statistics')}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label={t('from_date')}
                  value={startDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      setStartDate(newValue.tz('Asia/Ho_Chi_Minh'));
                    }
                  }}
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: 'small' } }}
                />
                <DatePicker
                  label={t('to_date')}
                  value={endDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      setEndDate(newValue.tz('Asia/Ho_Chi_Minh'));
                    }
                  }}
                  format="DD/MM/YYYY"
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

          <CustomDataGrid
            rows={importTableData}
            columns={columns}
            getRowId={(row) => row.code}
            disableRowSelectionOnClick
            autoHeight
            loading={isLoading}
            sortingOrder={['desc', 'asc']}
            sortingMode='server'
            slots={{
              pagination: PaginationComponent
            }}
            disableColumnFilter
            disableColumnMenu
            sx={{
              ".selected-row": {
                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                color: `${theme.palette.primary.main} !important`
              }
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImportStatisticsPage; 