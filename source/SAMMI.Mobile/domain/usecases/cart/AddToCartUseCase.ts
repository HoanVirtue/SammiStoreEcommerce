import { Cart } from '../../entities/Cart';
import { Product } from '../../entities/Product';
import { CartRepository } from '../../repositories/CartRepository';

export class AddToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  execute(product: Product, quantity: number): Promise<Cart> {
    return this.cartRepository.addToCart(product, quantity);
  }
}