import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Cart } from '@/domain/entities/Cart';
import { Product } from '@/domain/entities/Product';
import { serviceLocator } from '@/data/di/serviceLocator';
import { GetCartUseCase } from '@/domain/usecases/cart/GetCartUseCase';
import { AddToCartUseCase } from '@/domain/usecases/cart/AddToCartUseCase';
import { UpdateCartItemUseCase } from '@/domain/usecases/cart/UpdateCartItemUseCase';
import { RemoveFromCartUseCase } from '@/domain/usecases/cart/RemoveFromCartUseCase';
import { CartRepository } from '@/domain/repositories/CartRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: { items: [], totalItems: 0, subtotal: 0 },
      isLoading: false,
      error: null,
      
      fetchCart: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const getCartUseCase = serviceLocator.get<GetCartUseCase>('getCartUseCase');
          const cart = await getCartUseCase.execute();
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch cart', 
            isLoading: false 
          });
        }
      },
      
      addToCart: async (product: Product, quantity: number) => {
        try {
          set({ isLoading: true, error: null });
          
          const addToCartUseCase = serviceLocator.get<AddToCartUseCase>('addToCartUseCase');
          const cart = await addToCartUseCase.execute(product, quantity);
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add to cart', 
            isLoading: false 
          });
        }
      },
      
      updateQuantity: async (productId: string, quantity: number) => {
        try {
          set({ isLoading: true, error: null });
          
          const updateCartItemUseCase = serviceLocator.get<UpdateCartItemUseCase>('updateCartItemUseCase');
          const cart = await updateCartItemUseCase.execute(productId, quantity);
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update cart', 
            isLoading: false 
          });
        }
      },
      
      removeFromCart: async (productId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const removeFromCartUseCase = serviceLocator.get<RemoveFromCartUseCase>('removeFromCartUseCase');
          const cart = await removeFromCartUseCase.execute(productId);
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove from cart', 
            isLoading: false 
          });
        }
      },
      
      clearCart: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const cartRepository = serviceLocator.get<CartRepository>('cartRepository');
          const cart = await cartRepository.clearCart();
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to clear cart', 
            isLoading: false 
          });
        }
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist the cart
        cart: state.cart,
      }),
    }
  )
);