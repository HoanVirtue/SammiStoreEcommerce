import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/domain/entities/User';
import { serviceLocator } from '@/data/di/serviceLocator';
import { GetCurrentUserUseCase } from '@/domain/usecases/user/GetCurrentUserUseCase';
import { ToggleWishlistUseCase } from '@/domain/usecases/user/ToggleWishlistUseCase';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUser: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      
      fetchUser: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const getCurrentUserUseCase = serviceLocator.get<GetCurrentUserUseCase>('getCurrentUserUseCase');
          const user = await getCurrentUserUseCase.execute();
          
          set({ user, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch user', 
            isLoading: false 
          });
        }
      },
      
      toggleWishlist: async (productId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { user } = get();
          if (!user) {
            throw new Error('User not found');
          }
          
          const toggleWishlistUseCase = serviceLocator.get<ToggleWishlistUseCase>('toggleWishlistUseCase');
          const updatedUser = await toggleWishlistUseCase.execute(productId, user.wishlist);
          
          set({ user: updatedUser, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update wishlist', 
            isLoading: false 
          });
        }
      },
      
      isInWishlist: (productId: string) => {
        const { user } = get();
        return user ? user.wishlist.includes(productId) : false;
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist the user
        user: state.user,
      }),
    }
  )
);