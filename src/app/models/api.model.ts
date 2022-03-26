export interface Article {
  batchcomplete: string;
  query: {
    pages: {
      [id: string]: {
        pageid: number;
        ns: number;
        title: string;
        extract: string;
      };
    };
  };
}

export interface ArticleList {
  batchcomplete: string;
  continue: {
    sroffset: number;
    continue: string;
  };
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: {
      ns: number;
      title: string;
      pageid: number;
      size: number;
      wordcount: number;
      snippet: string;
      timestamp: string;
    }[];
  };
}
