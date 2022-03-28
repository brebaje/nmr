import { createAction, props } from '@ngrx/store';

import { Article, ArticleDetail } from 'src/app/models/api.model';

export const clearArticleDetail = createAction('[Detail Component] Clear article detail');
export const loadArticleDetail = createAction('[Detail Component] Get article detail', props<{ id: number }>());
export const loadArticleDetailSuccess = createAction('[Detail Component] Get article detail success', props<{ article: ArticleDetail }>());
export const loadArticleDetailFailure = createAction('[Detail Component] Get article detail failure', props<{ error: any }>());

export const loadArticles = createAction('[List Component] Get articles', props<{ searchTerm: string }>());
export const loadArticlesSuccess = createAction('[List Component] Get articles success', props<{ articles: Article[] }>());
export const loadArticlesFailure = createAction('[List Component] Get articles failure', props<{ error: any }>());
