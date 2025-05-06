import { useState } from 'react';
import { Card, Select, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getSalesRevenue } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';

const RevenueStatisticsPage = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().startOf('year'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs().endOf('year'));
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenue-statistics', startDate, endDate, employeeId, customerId],
    queryFn: () =>
      getSalesRevenue({
        dateFrom: startDate.toDate(),
        dateTo: endDate.toDate(),
        paymentMethodId: employeeId || undefined,
      }),
  });

  const columns = [
    {
      title: t('order_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('employee'),
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: t('customer'),
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: t('total_price'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value: number) => formatCurrency(value || 0),
    },
    {
      title: t('total_quantity'),
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: t('created_date'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
  ];

  const revenueTableData = revenueData?.result?.orderDetails?.subset || [];

  return (
    <div className="p-6">
      <Card title={t('revenue_statistics')}>
        <div className="mb-4 flex gap-4">
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
              />
              <DatePicker
                label={t('to_date')}
                value={endDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setEndDate(newValue);
                  }
                }}
              />
            </Box>
          </LocalizationProvider>
          <Select
            placeholder={t('select_employee')}
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setEmployeeId(value)}
            options={[
              { label: 'Nhân viên 1', value: 1 },
              { label: 'Nhân viên 2', value: 2 },
            ]}
          />
          <Select
            placeholder={t('select_customer')}
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setCustomerId(value)}
            options={[
              { label: 'Khách hàng 1', value: 1 },
              { label: 'Khách hàng 2', value: 2 },
            ]}
          />
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold">
            {t('total_amount')}: {formatCurrency(revenueData?.result?.totalAmount || 0)}
          </div>
          <div className="text-lg font-semibold">
            {t('total_quantity')}: {revenueData?.result?.totalQuantity || 0}
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={revenueTableData}
          loading={isLoading}
          rowKey="code"
          pagination={{
            total: revenueData?.result?.orderDetails?.totalItemCount || 0,
            pageSize: revenueData?.result?.orderDetails?.take || 10,
            current: (revenueData?.result?.orderDetails?.skip || 0) / (revenueData?.result?.orderDetails?.take || 10) + 1,
          }}
        />
      </Card>
    </div>
  );
};

export default RevenueStatisticsPage; 