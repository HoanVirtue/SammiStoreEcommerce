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

export interface ImportStatisticDetail {
  id: number;
  code: string;
  employeeId: number;
  supplierId: number;
  status: string;
  note: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  totalQuantity: number;
  totalPrice: number;
  employeeName: string;
  supplierName: string;
}

export interface ImportStatistic {
  imports: {
    subset: ImportStatisticDetail[];
    totalItemCount: number;
  };
  totalQuantity: number;
  totalAmount: number;
} 