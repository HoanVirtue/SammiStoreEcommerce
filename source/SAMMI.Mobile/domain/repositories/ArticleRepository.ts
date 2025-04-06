import { Article } from '../entities/Article';

export interface ArticleRepository {
  getTopHeadlines(category?: string, page?: number): Promise<Article[]>;
  searchArticles(query: string, page?: number): Promise<Article[]>;
  getArticleById(id: string): Promise<Article | null>;
}