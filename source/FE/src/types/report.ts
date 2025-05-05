import { RequestFilterModel } from 'src/types/common';

export interface SaleRevenueFilterModel extends RequestFilterModel {
  dateFrom?: Date;
  dateTo?: Date;
  paymentMethodId?: number;
}

export interface ImportStatisticFilterModel {
  dateFrom?: Date;
  dateTo?: Date;
  employeeId?: number;
  supplierId?: number;
}

export interface SaleRevenueData {
  date: string;
  totalOrders: number;
  totalRevenue: number;
} 