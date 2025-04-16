export interface TItemOrderProduct {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  images?: { imageUrl: string }[];
  discount?: number;
  stockQuantity?: number;
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