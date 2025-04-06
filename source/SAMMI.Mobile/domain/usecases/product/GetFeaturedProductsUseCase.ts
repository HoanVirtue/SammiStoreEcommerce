import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';

export class GetFeaturedProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(): Promise<Product[]> {
    return this.productRepository.getFeaturedProducts();
  }
}