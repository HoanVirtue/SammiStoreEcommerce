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

export interface InventoryFilterModel extends RequestFilterModel {
  maximumStockQuantity?: number;
  daysOfExistence?: number;
  skip?: number;
  take?: number;
}

export interface InventoryStatisticDetail {
  id: number;
  code: string;
  name: string;
  stockQuantity: number;
  price: number;
  status: number;
  categoryId: number;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  displayOrder: number;
  lastReceiptDate: string;
  daysSinceLastReceipt: number;
}

export interface InventoryStatistic {
  totalStockQuantity: number;
  totalAmount: number;
  inventoryDetails: InventoryStatisticDetail[];
} 