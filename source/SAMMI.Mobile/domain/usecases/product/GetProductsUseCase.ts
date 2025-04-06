import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(categoryId?: string, query?: string): Promise<Product[]> {
    return this.productRepository.getProducts(categoryId, query);
  }
}