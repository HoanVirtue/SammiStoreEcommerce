import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

const USER_STORAGE_KEY = 'cosmetic_store_user';

export class UserRepositoryImpl implements UserRepository {
  private async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        return JSON.parse(userData) as User;
      }
      
      // For demo purposes, create a default user if none exists
      const defaultUser: User = {
        id: '1',
        name: 'Guest User',
        email: 'guest@example.com',
        wishlist: []
      };
      
      await this.saveUser(defaultUser);
      return defaultUser;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async addToWishlist(productId: string): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }
    
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await this.saveUser(user);
    }
    
    return user;
  }

  async removeFromWishlist(productId: string): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }
    
    user.wishlist = user.wishlist.filter(id => id !== productId);
    await this.saveUser(user);
    
    return user;
  }
}