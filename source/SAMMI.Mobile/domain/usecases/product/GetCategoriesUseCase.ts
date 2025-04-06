import { Category } from '../../entities/Category';
import { ProductRepository } from '../../repositories/ProductRepository';

export class GetCategoriesUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(): Promise<Category[]> {
    return this.productRepository.getCategories();
  }
}