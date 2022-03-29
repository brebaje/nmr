import { Article, ArticleDetail, ArticleDetailResponse, ArticleListResponse } from 'src/app/models/api.model';

export const detail: ArticleDetail = {
  pageid: 25670533,
  ns: 0,
  title: 'Deuterium NMR',
  extract: 'Extract',
};

export const detailResponse: ArticleDetailResponse = {
  batchcomplete: '',
  query: { pages: { '25670533': detail } },
};

export const list: Article[] = [
  {
    ns: 0,
    title: 'Nuclear magnetic resonance',
    pageid: 25110709,
    size: 76578,
    wordcount: 9554,
    snippet: 'Snippet',
    timestamp: '2022-03-07T19:38:25Z',
  },
  {
    ns: 0,
    title: 'Nuclear magnetic resonance spectroscopy',
    pageid: 1908527,
    size: 44057,
    wordcount: 5453,
    snippet: 'Snippet',
    timestamp: '2021-11-21T16:58:01Z',
  },
];

export const listResponse: ArticleListResponse = {
  batchcomplete: '',
  continue: { sroffset: 10, continue: '-||' },
  query: { searchinfo: { totalhits: 3824, suggestion: 'mr', suggestionsnippet: 'mr' }, search: list },
};
