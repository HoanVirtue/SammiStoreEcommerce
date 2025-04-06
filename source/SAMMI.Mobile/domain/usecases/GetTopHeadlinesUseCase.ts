import { Article } from '../entities/Article';
import { ArticleRepository } from '../repositories/ArticleRepository';

export class GetTopHeadlinesUseCase {
  constructor(private articleRepository: ArticleRepository) {}

  execute(category?: string, page: number = 1): Promise<Article[]> {
    return this.articleRepository.getTopHeadlines(category, page);
  }
}