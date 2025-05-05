import { useState } from 'react';
import { Card, DatePicker, Select, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getImportStatistics } from '@/services/report';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
const { RangePicker } = DatePicker; 

const ImportStatisticsPage = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(),
    dayjs().add(1, 'day'),
  ]);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [supplierId, setSupplierId] = useState<number | null>(null);

  const { data: importData, isLoading } = useQuery({
    queryKey: ['import-statistics', dateRange, employeeId, supplierId],
    queryFn: () =>
      getImportStatistics({
        dateFrom: dateRange[0].toDate(),
        dateTo: dateRange[1].toDate(),
        employeeId: employeeId || undefined,
        supplierId: supplierId || undefined,
      }),
  });

  const columns = [
    {
      title: t('receipt_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('employee'),
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: t('supplier'),
      dataIndex: 'supplierName',
      key: 'supplierName',
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

  const importTableData = importData?.result?.importDetails?.subset || [];

  return (
    <div className="p-6">
      <Card title="Thống kê nhập hàng">
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
            placeholder={t('select_supplier')}
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setSupplierId(value)}
            options={[
              { label: 'Nhà cung cấp 1', value: 1 },
              { label: 'Nhà cung cấp 2', value: 2 },
            ]}
          />
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold">
            {t('total_amount')}: {formatCurrency(importData?.result?.totalAmount || 0)}
          </div>
          <div className="text-lg font-semibold">
            {t('total_quantity')}: {importData?.result?.totalQuantity || 0}
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={importTableData}
          loading={isLoading}
          rowKey="code"
          pagination={{
            total: importData?.result?.importDetails?.totalItemCount || 0,
            pageSize: importData?.result?.importDetails?.take || 10,
            current: (importData?.result?.importDetails?.skip || 0) / (importData?.result?.importDetails?.take || 10) + 1,
          }}
        />
      </Card>
    </div>
  );
};

export default ImportStatisticsPage; 