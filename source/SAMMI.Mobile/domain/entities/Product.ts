export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    description: string;
    ingredients?: string;
    howToUse?: string;
    imageUrls: string[];
    rating: number;
    reviewCount: number;
    categoryId: string;
    tags: string[];
    isNew?: boolean;
    isBestSeller?: boolean;
    isOnSale?: boolean;
    stockQuantity: number;
  }