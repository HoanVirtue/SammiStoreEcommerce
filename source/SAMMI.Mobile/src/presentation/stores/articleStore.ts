import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/domain/entities/Article';
import { serviceLocator } from '@/data/di/serviceLocator';
import { GetTopHeadlinesUseCase } from '@/domain/usecases/GetTopHeadlinesUseCase';
import { SearchArticlesUseCase } from '@/domain/usecases/SearchArticlesUseCase';
import { GetArticleByIdUseCase } from '@/domain/usecases/GetArticleByIdUseCase';

interface ArticleState {
  articles: Article[];
  searchResults: Article[];
  selectedArticle: Article | null;
  isLoading: boolean;
  error: string | null;
  currentCategory: string | undefined;
  searchQuery: string;
  
  // Actions
  fetchTopHeadlines: (category?: string) => Promise<void>;
  searchArticles: (query: string) => Promise<void>;
  getArticleById: (id: string) => Promise<void>;
  clearSearch: () => void;
  setSelectedArticle: (article: Article | null) => void;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set, get) => ({
      articles: [],
      searchResults: [],
      selectedArticle: null,
      isLoading: false,
      error: null,
      currentCategory: undefined,
      searchQuery: '',
      
      fetchTopHeadlines: async (category?: string) => {
        try {
          set({ isLoading: true, error: null, currentCategory: category });
          
          const getTopHeadlinesUseCase = serviceLocator.get<GetTopHeadlinesUseCase>('getTopHeadlinesUseCase');
          const articles = await getTopHeadlinesUseCase.execute(category);
          
          set({ articles, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch articles', 
            isLoading: false 
          });
        }
      },
      
      searchArticles: async (query: string) => {
        if (!query.trim()) {
          set({ searchResults: [], searchQuery: '' });
          return;
        }
        
        try {
          set({ isLoading: true, error: null, searchQuery: query });
          
          const searchArticlesUseCase = serviceLocator.get<SearchArticlesUseCase>('searchArticlesUseCase');
          const searchResults = await searchArticlesUseCase.execute(query);
          
          set({ searchResults, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to search articles', 
            isLoading: false 
          });
        }
      },
      
      getArticleById: async (id: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const getArticleByIdUseCase = serviceLocator.get<GetArticleByIdUseCase>('getArticleByIdUseCase');
          const article = await getArticleByIdUseCase.execute(id);
          
          if (article) {
            set({ selectedArticle: article, isLoading: false });
          } else {
            set({ 
              error: 'Article not found', 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to get article', 
            isLoading: false 
          });
        }
      },
      
      clearSearch: () => {
        set({ searchResults: [], searchQuery: '' });
      },
      
      setSelectedArticle: (article: Article | null) => {
        set({ selectedArticle: article });
      },
    }),
    {
      name: 'article-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist these fields
        articles: state.articles,
        selectedArticle: state.selectedArticle,
        currentCategory: state.currentCategory,
      }),
    }
  )
);