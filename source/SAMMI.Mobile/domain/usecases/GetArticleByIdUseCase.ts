import { Article } from '../entities/Article';
import { ArticleRepository } from '../repositories/ArticleRepository';

export class GetArticleByIdUseCase {
  constructor(private articleRepository: ArticleRepository) {}

  execute(id: string): Promise<Article | null> {
    return this.articleRepository.getArticleById(id);
  }
}