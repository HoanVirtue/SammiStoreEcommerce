import { Cart } from '../entities/Cart';
import { Product } from '../entities/Product';

export interface CartRepository {
  getCart(): Promise<Cart>;
  addToCart(product: Product, quantity: number): Promise<Cart>;
  updateQuantity(productId: string, quantity: number): Promise<Cart>;
  removeFromCart(productId: string): Promise<Cart>;
  clearCart(): Promise<Cart>;
}