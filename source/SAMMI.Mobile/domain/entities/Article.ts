export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    publishedAt: string;
    url: string;
    urlToImage: string | null;
    source: {
      id: string | null;
      name: string;
    };
  }