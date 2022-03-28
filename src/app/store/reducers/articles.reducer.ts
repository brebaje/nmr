import { Action, createReducer, on } from '@ngrx/store';

import { Article, ArticleDetail } from 'src/app/models/api.model';
import { clearArticleDetail, loadArticleDetailSuccess, loadArticlesSuccess } from 'src/app/store/actions/articles.actions';

export interface State {
  article: ArticleDetail | undefined;
  articlesList: Article[] | undefined;
}

export const initialState: State = {
  article: undefined,
  articlesList: undefined,
};

const articlesReducer = createReducer(
  initialState,
  on(clearArticleDetail, (state): State => ({ ...state, article: undefined })),
  on(loadArticleDetailSuccess, (state, { article }): State => ({ ...state, article })),
  on(loadArticlesSuccess, (state, { articles }): State => ({ ...state, articlesList: articles })),
);

export function reducer(state: State | undefined, action: Action) {
  return articlesReducer(state, action);
}
