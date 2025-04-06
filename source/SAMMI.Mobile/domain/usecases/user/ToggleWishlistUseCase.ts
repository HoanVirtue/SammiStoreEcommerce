import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

export class ToggleWishlistUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(productId: string, currentWishlist: string[]): Promise<User> {
    if (currentWishlist.includes(productId)) {
      return this.userRepository.removeFromWishlist(productId);
    } else {
      return this.userRepository.addToWishlist(productId);
    }
  }
}