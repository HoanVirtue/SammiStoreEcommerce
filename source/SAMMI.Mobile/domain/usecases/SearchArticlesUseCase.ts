import { Article } from '../entities/Article';
import { ArticleRepository } from '../repositories/ArticleRepository';

export class SearchArticlesUseCase {
  constructor(private articleRepository: ArticleRepository) {}

  execute(query: string, page: number = 1): Promise<Article[]> {
    return this.articleRepository.searchArticles(query, page);
  }
}