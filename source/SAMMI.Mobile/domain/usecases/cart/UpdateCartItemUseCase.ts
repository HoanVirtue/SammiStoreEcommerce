import { Cart } from '../../entities/Cart';
import { CartRepository } from '../../repositories/CartRepository';

export class UpdateCartItemUseCase {
  constructor(private cartRepository: CartRepository) {}

  execute(productId: string, quantity: number): Promise<Cart> {
    return this.cartRepository.updateQuantity(productId, quantity);
  }
}