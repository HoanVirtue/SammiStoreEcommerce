import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSalesRevenue } from '@/services/report';
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

const getOrderStatusTranslation = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'Chờ xử lý';
    case 'WaitingForPayment':
      return 'Chờ thanh toán';
    case 'Processing':
      return 'Đang xử lý';
    case 'Completed':
      return 'Hoàn thành';
    case 'Cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

interface RevenueDetail {
  id: number;
  code: string;
  customerId: number;
  customerName: string;
  phoneNumber: string;
  paymentMethodId: number;
  paymentMethod: string;
  orderStatus: string;
  totalPrice: number | null;
  totalQuantity: number;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
  displayOrder: number | null;
}

interface SalesRevenueResponse {
  result: {
    totalAmount: number;
    totalQuantity: number;
    revenueDetails: {
      subset: RevenueDetail[];
      count: number;
      pageCount: number;
      totalItemCount: number;
      skip: number;
      take: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      isFirstPage: boolean;
      isLastPage: boolean;
    };
  };
  isSuccess: boolean;
  message: string;
  errors: any;
}

const RevenueStatisticsPage = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().startOf('year'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs().endOf('year'));
  const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['revenue-statistics', startDate, endDate, paymentMethodId, page, rowsPerPage],
    queryFn: async () => {
      console.log(`Fetching revenue data: page=${page}, rowsPerPage=${rowsPerPage}`);
      const response = await getSalesRevenue({
        dateFrom: startDate.toDate(),
        dateTo: endDate.toDate(),
        paymentMethodId: paymentMethodId || undefined,
        skip: page * rowsPerPage,
        take: rowsPerPage,
        paging: true,
        type: 1, // Grid type
        orderBy: 'CreatedDate',
        dir: 'DESC'
      });
      console.log('API Response:', response);
      return response as SalesRevenueResponse;
    },
    refetchOnWindowFocus: false
  });

  const revenueData = data;
  const revenueTableData = Array.isArray(revenueData?.result?.revenueDetails?.subset)
    ? revenueData.result.revenueDetails.subset
    : [];

  const totalAmount = revenueData?.result?.totalAmount || 0;
  const totalQuantity = revenueData?.result?.totalQuantity || 0;
  const totalCount = revenueData?.result?.revenueDetails?.totalItemCount || 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(`Changing page to ${newPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log(`Changing rows per page to ${newRowsPerPage}`);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePaymentMethodChange = (event: SelectChangeEvent<number | string>) => {
    setPaymentMethodId(event.target.value === '' ? null : Number(event.target.value));
  };

  const handleCustomerChange = (event: SelectChangeEvent<number | string>) => {
    setCustomerId(event.target.value === '' ? null : Number(event.target.value));
  };

  // Lọc danh sách khách hàng duy nhất từ dữ liệu
  const uniqueCustomers = revenueTableData.reduce((acc: Array<{id: number, name: string, phone: string}>, item: RevenueDetail) => {
    if (!acc.some(c => c.id === item.customerId)) {
      acc.push({
        id: item.customerId,
        name: item.customerName || '',
        phone: item.phoneNumber || ''
      });
    }
    return acc;
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {t('revenue_statistics')}
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
              <InputLabel id="payment-method-select-label">{t('payment_method')}</InputLabel>
              <Select
                labelId="payment-method-select-label"
                value={paymentMethodId || ''}
                onChange={handlePaymentMethodChange}
                label={t('payment_method')}
              >
                <MenuItem value=""><em>{t('none')}</em></MenuItem>
                <MenuItem value={1}>{t('cash_on_delivery')}</MenuItem>
                <MenuItem value={2}>{t('vnpay')}</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="customer-select-label">{t('select_customer')}</InputLabel>
              <Select
                labelId="customer-select-label"
                value={customerId || ''}
                onChange={handleCustomerChange}
                label={t('select_customer')}
              >
                <MenuItem value=""><em>{t('none')}</em></MenuItem>
                {uniqueCustomers.map((customer: {id: number, name: string, phone: string}) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name} ({customer.phone})
                  </MenuItem>
                ))}
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
                  <TableCell>{t('order_code')}</TableCell>
                  <TableCell>{t('customer')}</TableCell>
                  <TableCell>{t('payment_method')}</TableCell>
                  <TableCell>{t('order_status')}</TableCell>
                  <TableCell align="right">{t('total_price')}</TableCell>
                  <TableCell align="right">{t('quantity')}</TableCell>
                  <TableCell>{t('created_date')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, py: 2 }}>
                        <CircularProgress size={24} />
                        <Typography>{t('loading')}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : revenueTableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography sx={{ py: 2 }}>{t('no_data')}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  revenueTableData.map((row: RevenueDetail) => (
                    <TableRow key={row.code || row.id}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.customerName} ({row.phoneNumber})</TableCell>
                      <TableCell>{row.paymentMethod}</TableCell>
                      <TableCell>{getOrderStatusTranslation(row.orderStatus)}</TableCell>
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
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('rows_per_page')}
            labelDisplayedRows={({ from, to, count }) => {
              if (count === 0) return `0 ${t('of')} 0`;
              return `${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, count)} ${t('of')} ${count}`;
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RevenueStatisticsPage; 