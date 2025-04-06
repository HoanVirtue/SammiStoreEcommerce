import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { CartRepository } from '@/domain/repositories/CartRepository';
import { UserRepository } from '@/domain/repositories/UserRepository';

import { ProductRepositoryImpl } from '../repositories/ProductRepositoryImpl';
import { CartRepositoryImpl } from '../repositories/CartRepositoryImpl';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';

import { GetProductsUseCase } from '@/domain/usecases/product/GetProductsUseCase';
import { GetProductByIdUseCase } from '@/domain/usecases/product/GetProductByIdUseCase';
import { GetCategoriesUseCase } from '@/domain/usecases/product/GetCategoriesUseCase';
import { GetFeaturedProductsUseCase } from '@/domain/usecases/product/GetFeaturedProductsUseCase';

import { GetCartUseCase } from '@/domain/usecases/cart/GetCartUseCase';
import { AddToCartUseCase } from '@/domain/usecases/cart/AddToCartUseCase';
import { UpdateCartItemUseCase } from '@/domain/usecases/cart/UpdateCartItemUseCase';
import { RemoveFromCartUseCase } from '@/domain/usecases/cart/RemoveFromCartUseCase';

import { GetCurrentUserUseCase } from '@/domain/usecases/user/GetCurrentUserUseCase';
import { ToggleWishlistUseCase } from '@/domain/usecases/user/ToggleWishlistUseCase';

// Simple dependency injection container
class ServiceLocator {
  private static instance: ServiceLocator;
  private services: Map<string, any> = new Map();

  private constructor() {
    // Initialize repositories
    const productRepository: ProductRepository = new ProductRepositoryImpl();
    const cartRepository: CartRepository = new CartRepositoryImpl();
    const userRepository: UserRepository = new UserRepositoryImpl();
    
    this.services.set('productRepository', productRepository);
    this.services.set('cartRepository', cartRepository);
    this.services.set('userRepository', userRepository);

    // Initialize product use cases
    this.services.set('getProductsUseCase', new GetProductsUseCase(productRepository));
    this.services.set('getProductByIdUseCase', new GetProductByIdUseCase(productRepository));
    this.services.set('getCategoriesUseCase', new GetCategoriesUseCase(productRepository));
    this.services.set('getFeaturedProductsUseCase', new GetFeaturedProductsUseCase(productRepository));
    
    // Initialize cart use cases
    this.services.set('getCartUseCase', new GetCartUseCase(cartRepository));
    this.services.set('addToCartUseCase', new AddToCartUseCase(cartRepository));
    this.services.set('updateCartItemUseCase', new UpdateCartItemUseCase(cartRepository));
    this.services.set('removeFromCartUseCase', new RemoveFromCartUseCase(cartRepository));
    
    // Initialize user use cases
    this.services.set('getCurrentUserUseCase', new GetCurrentUserUseCase(userRepository));
    this.services.set('toggleWishlistUseCase', new ToggleWishlistUseCase(userRepository));
  }

  public static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  public get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service as T;
  }
}

export const serviceLocator = ServiceLocator.getInstance();