import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart } from '@/domain/entities/Cart';
import { CartItem } from '@/domain/entities/CartItem';
import { Product } from '@/domain/entities/Product';
import { CartRepository } from '@/domain/repositories/CartRepository';

const CART_STORAGE_KEY = 'cosmetic_store_cart';

export class CartRepositoryImpl implements CartRepository {
  private async saveCart(cart: Cart): Promise<void> {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  async getCart(): Promise<Cart> {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (cartData) {
        return JSON.parse(cartData) as Cart;
      }
    } catch (error) {
      console.error('Error getting cart:', error);
    }
    
    // Return empty cart if no cart exists or there was an error
    return { items: [], totalItems: 0, subtotal: 0 };
  }

  async addToCart(product: Product, quantity: number): Promise<Cart> {
    const cart = await this.getCart();
    const existingItemIndex = cart.items.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        product,
        quantity
      };
      cart.items.push(newItem);
    }
    
    // Update cart totals
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.subtotal = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    
    await this.saveCart(cart);
    return cart;
  }

  async updateQuantity(productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getCart();
    const itemIndex = cart.items.findIndex(item => item.product.id === productId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }
      
      // Update cart totals
      cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
      cart.subtotal = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
      await this.saveCart(cart);
    }
    
    return cart;
  }

  async removeFromCart(productId: string): Promise<Cart> {
    const cart = await this.getCart();
    const updatedItems = cart.items.filter(item => item.product.id !== productId);
    
    cart.items = updatedItems;
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.subtotal = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    
    await this.saveCart(cart);
    return cart;
  }

  async clearCart(): Promise<Cart> {
    const emptyCart: Cart = { items: [], totalItems: 0, subtotal: 0 };
    await this.saveCart(emptyCart);
    return emptyCart;
  }
}