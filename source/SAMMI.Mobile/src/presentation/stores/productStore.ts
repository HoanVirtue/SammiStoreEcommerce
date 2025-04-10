import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/domain/entities/Product';
import { Category } from '@/domain/entities/Category';
import { serviceLocator } from '@/data/di/serviceLocator';
import { GetProductsUseCase } from '@/domain/usecases/product/GetProductsUseCase';
import { GetProductByIdUseCase } from '@/domain/usecases/product/GetProductByIdUseCase';
import { GetCategoriesUseCase } from '@/domain/usecases/product/GetCategoriesUseCase';
import { GetFeaturedProductsUseCase } from '@/domain/usecases/product/GetFeaturedProductsUseCase';

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  selectedCategory: string | undefined;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: (categoryId?: string, query?: string) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  setSelectedCategory: (categoryId?: string) => void;
  setSearchQuery: (query: string) => void;
  clearSelectedProduct: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      featuredProducts: [],
      categories: [],
      selectedProduct: null,
      selectedCategory: undefined,
      searchQuery: '',
      isLoading: false,
      error: null,
      
      fetchProducts: async (categoryId?: string, query?: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const getProductsUseCase = serviceLocator.get<GetProductsUseCase>('getProductsUseCase');
          const products = await getProductsUseCase.execute(categoryId, query);
          
          set({ 
            products, 
            isLoading: false,
            selectedCategory: categoryId,
            searchQuery: query || ''
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch products', 
            isLoading: false 
          });
        }
      },
      
      fetchProductById: async (id: number) => {
        try {
          set({ isLoading: true, error: null });
          
          const getProductByIdUseCase = serviceLocator.get<GetProductByIdUseCase>('getProductByIdUseCase');
          const product = await getProductByIdUseCase.execute(id.toString());
          
          if (product) {
            set({ selectedProduct: product, isLoading: false });
          } else {
            set({ 
              error: 'Product not found', 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch product', 
            isLoading: false 
          });
        }
      },
      
      fetchCategories: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const getCategoriesUseCase = serviceLocator.get<GetCategoriesUseCase>('getCategoriesUseCase');
          const categories = await getCategoriesUseCase.execute();
          
          set({ categories, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch categories', 
            isLoading: false 
          });
        }
      },
      
      fetchFeaturedProducts: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const getFeaturedProductsUseCase = serviceLocator.get<GetFeaturedProductsUseCase>('getFeaturedProductsUseCase');
          const featuredProducts = await getFeaturedProductsUseCase.execute();
          
          set({ featuredProducts, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch featured products', 
            isLoading: false 
          });
        }
      },
      
      setSelectedCategory: (categoryId?: string) => {
        set({ selectedCategory: categoryId });
        get().fetchProducts(categoryId, get().searchQuery);
      },
      
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().fetchProducts(get().selectedCategory, query);
      },
      
      clearSelectedProduct: () => {
        set({ selectedProduct: null });
      }
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist these fields
        selectedCategory: state.selectedCategory,
      }),
    }
  )
);