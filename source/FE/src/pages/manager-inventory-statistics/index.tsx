import { useState } from 'react';
import { Card, InputNumber, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getInventoryStatistics } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

const InventoryStatisticsPage = () => {
  const { t } = useTranslation();
  const [maximumStockQuantity, setMaximumStockQuantity] = useState<number | null>(null);
  const [daysOfExistence, setDaysOfExistence] = useState<number | null>(null);

  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ['inventory-statistics', maximumStockQuantity, daysOfExistence],
    queryFn: () =>
      getInventoryStatistics({
        maximumStockQuantity: maximumStockQuantity || undefined,
        daysOfExistence: daysOfExistence || undefined,
        skip: 0,
        take: 10
      }),
  });

  const columns = [
    {
      title: t('product_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('product_name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('stock_quantity'),
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => formatCurrency(value || 0),
    },
    {
      title: t('last_receipt_date'),
      dataIndex: 'lastReceiptDate',
      key: 'lastReceiptDate',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: t('days_since_last_receipt'),
      dataIndex: 'daysSinceLastReceipt',
      key: 'daysSinceLastReceipt',
      render: (value: number) => value || '-',
    },
  ];

  const inventoryTableData = inventoryData?.result?.inventoryDetails || [];

  return (
    <div className="p-6">
      <Card title={t('inventory_statistics')}>
        <div className="mb-4 flex gap-4">
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <InputNumber
              placeholder={t('maximum_stock_quantity')}
              value={maximumStockQuantity}
              onChange={(value) => setMaximumStockQuantity(value)}
              min={0}
              style={{ width: 200 }}
            />
            <InputNumber
              placeholder={t('days_of_existence')}
              value={daysOfExistence}
              onChange={(value) => setDaysOfExistence(value)}
              min={0}
              style={{ width: 200 }}
            />
          </Box>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold">
            {t('total_stock_quantity')}: {inventoryData?.result?.totalStockQuantity || 0}
          </div>
          <div className="text-lg font-semibold">
            {t('total_amount')}: {formatCurrency(inventoryData?.result?.totalAmount || 0)}
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={inventoryTableData}
          loading={isLoading}
          rowKey="id"
          pagination={{
            total: inventoryData?.result?.inventoryDetails?.length || 0,
            pageSize: 10,
          }}
        />
      </Card>
    </div>
  );
};

export default InventoryStatisticsPage;
