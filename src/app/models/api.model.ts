export interface Article {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export interface ArticleDetail {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
}

export interface ArticleDetailResponse {
  batchcomplete: string;
  query: {
    pages: {
      [pageid: string]: ArticleDetail;
    };
  };
}

export interface ArticleListResponse {
  batchcomplete: string;
  continue: {
    sroffset: number;
    continue: string;
  };
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: Article[];
  };
}
