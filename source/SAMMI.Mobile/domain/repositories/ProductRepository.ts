import { Product } from '../entities/Product';
import { Category } from '../entities/Category';

export interface ProductRepository {
  getProducts(categoryId?: string, query?: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getBestSellers(): Promise<Product[]>;
}