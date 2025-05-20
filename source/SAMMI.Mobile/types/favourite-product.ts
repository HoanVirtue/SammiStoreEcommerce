export interface FavouriteProduct {
  id: number;
  customerId: number;
  productId: number;
  productName?: string;
  productImage?: string;
  price?: number;
  newPrice?: number;
  stockQuantity?: number;
  createdDate: Date;
  updatedDate?: Date;
  createdBy?: string;
  updatedBy?: string;
  isActive: boolean;
  isDeleted: boolean;
  displayOrder?: number;
}
