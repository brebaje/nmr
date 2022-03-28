import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from 'src/app/store/reducers/articles.reducer';

export const selectArticlesState = createFeatureSelector<State>('articles');

export const selectArticleDetail = createSelector(selectArticlesState, (state: State) => state.article);

export const selectArticlesList = createSelector(selectArticlesState, (state: State) => state.articlesList);
