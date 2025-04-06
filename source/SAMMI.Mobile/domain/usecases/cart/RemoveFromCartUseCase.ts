import { Cart } from '../../entities/Cart';
import { CartRepository } from '../../repositories/CartRepository';

export class RemoveFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  execute(productId: string): Promise<Cart> {
    return this.cartRepository.removeFromCart(productId);
  }
}