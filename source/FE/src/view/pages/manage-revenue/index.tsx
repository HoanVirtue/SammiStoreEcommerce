"use client";

import { useState, useCallback } from 'react';
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
  CircularProgress,
  useTheme
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomDataGrid from 'src/components/custom-data-grid';
import CustomPagination from 'src/components/custom-pagination';
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig';
import { getRevenueColumns } from 'src/configs/gridColumn';
import { hexToRGBA } from 'src/utils/hex-to-rgba';

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
  const theme = useTheme();
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().startOf('year'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs().endOf('year'));
  const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const { data, isLoading } = useQuery({
    queryKey: ['revenue-statistics', startDate, endDate, paymentMethodId, page, pageSize],
    queryFn: async () => {
      const response = await getSalesRevenue({
        dateFrom: startDate.toDate(),
        dateTo: endDate.toDate(),
        paymentMethodId: paymentMethodId || undefined,
        skip: (page - 1) * pageSize,
        take: pageSize, 
        paging: true,
        type: 1, // Grid type
        orderBy: 'CreatedDate',
        dir: 'DESC'
      });
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

  const handleOnChangePagination = useCallback((newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  }, []);



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

  const columns = getRevenueColumns();

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

          <CustomDataGrid
            rows={revenueTableData}
            columns={columns}
            getRowId={(row) => row.id}
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

export default RevenueStatisticsPage; 