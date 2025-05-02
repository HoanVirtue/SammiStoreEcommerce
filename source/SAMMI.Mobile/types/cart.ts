export interface TItemOrderProduct {
  cartId: number;
  productId: number;
  productName: string;
  price: number;
  newPrice: number;
  quantity: number;
  productImage: string;
  stockQuantity: number;
  id: number;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
  displayOrder: number | null;
}

export interface TParamsGetAllCarts {
  take: number;
  skip: number;
  paging: boolean;
  orderBy: string;
  dir: string;
  keywords: string;
  filters: string;
}

export interface TParamsCreateCart {
  cartId: number;
  productId: number;
  quantity: number;
  operation: number;
}

export interface CartState {
  carts: {
    data: TItemOrderProduct[];
  };
  isLoading: boolean;
} 