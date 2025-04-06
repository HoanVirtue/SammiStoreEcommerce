import { Product } from '@/domain/entities/Product';
import { Category } from '@/domain/entities/Category';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { cosmeticApi } from '../api/cosmeticApi';
import { mockProducts } from '../mocks/mockProducts';
import { mockCategories } from '../mocks/mockCategories';

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(categoryId?: string, query?: string): Promise<Product[]> {
    try {
      // In a real app, we would call the API
      // const response = await cosmeticApi.get('/products', {
      //   params: { categoryId, query }
      // });
      // return response.data;
      
      // For now, use mock data
      let filteredProducts = [...mockProducts];
      
      if (categoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
      }
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(lowerQuery) || 
          product.brand.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
        );
      }
      
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      // In a real app, we would call the API
      // const response = await cosmeticApi.get(`/products/${id}`);
      // return response.data;
      
      // For now, use mock data
      const product = mockProducts.find(p => p.id === id);
      return product || null;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      // In a real app, we would call the API
      // const response = await cosmeticApi.get('/categories');
      // return response.data;
      
      // For now, use mock data
      return mockCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      // In a real app, we would call the API
      // const response = await cosmeticApi.get('/products/featured');
      // return response.data;
      
      // For now, use mock data
      return mockProducts.filter(product => product.isBestSeller || product.isOnSale).slice(0, 6);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }

  async getNewArrivals(): Promise<Product[]> {
    try {
      // In a real app, we would call the API
      // const response = await cosmeticApi.get('/products/new');
      // return response.data;
      
      // For now, use mock data
      return mockProducts.filter(product => product.isNew).slice(0, 6);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      return [];
    }
  }

  async getBestSellers(): Promise<Product[]> {
    try {
      // In a real app, we would call the API
      // const response = await cosmeticApi.get('/products/bestsellers');
      // return response.data;
      
      // For now, use mock data
      return mockProducts.filter(product => product.isBestSeller).slice(0, 6);
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      return [];
    }
  }
}