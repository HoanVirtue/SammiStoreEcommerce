import { Cart } from '../../entities/Cart';
import { CartRepository } from '../../repositories/CartRepository';

export class GetCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  execute(): Promise<Cart> {
    return this.cartRepository.getCart();
  }
}