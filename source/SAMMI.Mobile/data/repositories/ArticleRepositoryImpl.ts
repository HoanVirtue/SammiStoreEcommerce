import { Article } from '@/domain/entities/Article';
import { ArticleRepository } from '@/domain/repositories/ArticleRepository';
import { newsApi } from '../api/newsApi';

export class ArticleRepositoryImpl implements ArticleRepository {
  private cachedArticles: Map<string, Article> = new Map();

  async getTopHeadlines(category?: string, page: number = 1): Promise<Article[]> {
    try {
      const params: any = {
        country: 'us',
        page,
        pageSize: 20,
      };

      if (category) {
        params.category = category;
      }

      const response = await newsApi.get('/top-headlines', { params });
      
      const articles = response.data.articles.map((article: any, index: number) => {
        // Create a unique ID since the API doesn't provide one
        const id = `${article.source.id || 'news'}-${Date.parse(article.publishedAt)}-${index}`;
        const mappedArticle = {
          ...article,
          id,
        };
        
        // Cache the article for later retrieval
        this.cachedArticles.set(id, mappedArticle);
        
        return mappedArticle;
      });
      
      return articles;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      return [];
    }
  }

  async searchArticles(query: string, page: number = 1): Promise<Article[]> {
    try {
      const response = await newsApi.get('/everything', {
        params: {
          q: query,
          page,
          pageSize: 20,
          sortBy: 'publishedAt',
        },
      });
      
      const articles = response.data.articles.map((article: any, index: number) => {
        const id = `${article.source.id || 'search'}-${Date.parse(article.publishedAt)}-${index}`;
        const mappedArticle = {
          ...article,
          id,
        };
        
        this.cachedArticles.set(id, mappedArticle);
        
        return mappedArticle;
      });
      
      return articles;
    } catch (error) {
      console.error('Error searching articles:', error);
      return [];
    }
  }

  async getArticleById(id: string): Promise<Article | null> {
    // First check the cache
    const cachedArticle = this.cachedArticles.get(id);
    if (cachedArticle) {
      return cachedArticle;
    }
    
    // If not in cache, we can't fetch it directly from the API
    // as the free tier doesn't support fetching by ID
    return null;
  }
}