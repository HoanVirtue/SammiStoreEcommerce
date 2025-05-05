import { useState } from 'react';
import { Card, DatePicker, Select, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getSalesRevenue } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

const RevenuePage = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(),
    dayjs().add(1, 'day'),
  ]);
  const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['sales-revenue', dateRange, paymentMethodId],
    queryFn: () =>
      getSalesRevenue({
        dateFrom: dateRange[0].toDate(),
        dateTo: dateRange[1].toDate(),
        paymentMethodId: paymentMethodId || undefined,
      }),
  });

  const columns = [
    {
      title: t('order_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('customer_name'),
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: t('phone_number'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: t('payment_method'),
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: t('order_status'),
      dataIndex: 'orderStatus',
      key: 'orderStatus',
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

  const revenueTableData = revenueData?.result?.revenueDetails?.subset || [];

  return (
    <div className="p-6">
      <Card title="Doanh thu">
        <div className="mb-4 flex gap-4">
          <RangePicker
            value={dateRange}
            onChange={(dates) => {
              if (dates) {
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs]);
              }
            }}
          />
          <Select
            placeholder={t('select_payment_method')}
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setPaymentMethodId(value)}
            options={[
              { label: 'Tiền mặt', value: 1 },
              { label: 'VNPay', value: 2 },
              { label: 'Thẻ tín dụng', value: 3 },
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
            total: revenueData?.result?.revenueDetails?.totalItemCount || 0,
            pageSize: revenueData?.result?.revenueDetails?.take || 10,
            current: (revenueData?.result?.revenueDetails?.skip || 0) / (revenueData?.result?.revenueDetails?.take || 10) + 1,
          }}
        />
      </Card>
    </div>
  );
};

export default RevenuePage; 