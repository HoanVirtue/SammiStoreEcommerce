import { RequestFilterModel } from 'src/types/common';

export interface SaleRevenueFilterModel extends RequestFilterModel {
  dateFrom?: Date;
  dateTo?: Date;
  paymentMethodId?: number;
}

export interface SaleRevenueData {
  date: string;
  totalOrders: number;
  totalRevenue: number;
} 