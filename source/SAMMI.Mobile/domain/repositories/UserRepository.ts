import { User } from '../entities/User';

export interface UserRepository {
  getCurrentUser(): Promise<User | null>;
  addToWishlist(productId: string): Promise<User>;
  removeFromWishlist(productId: string): Promise<User>;
}