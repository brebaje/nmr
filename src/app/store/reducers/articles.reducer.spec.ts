import * as fromReducer from './articles.reducer';
import * as articlesActions from 'src/app/store/actions/articles.actions';
import { detail, list } from 'src/app/test/data/articles.data';

describe('Articles Reducer', () => {
  describe('on clearArticleDetail action', () => {
    it('should clear the article property', () => {
      const action = articlesActions.clearArticleDetail();
      const state: fromReducer.State = { ...fromReducer.initialState, article: detail };

      expect(fromReducer.reducer(state, action)).toEqual(fromReducer.initialState);
    });
  });

  describe('on loadArticleDetailSuccess', () => {
    it('should store the article detail data', () => {
      const action = articlesActions.loadArticleDetailSuccess({ article: detail });
      const expected: fromReducer.State = { ...fromReducer.initialState, article: detail };

      expect(fromReducer.reducer(fromReducer.initialState, action)).toEqual(expected);
    });
  });

  describe('on loadArticlesSuccess', () => {
    it('should store the articles list data', () => {
      const action = articlesActions.loadArticlesSuccess({ articles: list });
      const expected: fromReducer.State = { ...fromReducer.initialState, articlesList: list };

      expect(fromReducer.reducer(fromReducer.initialState, action)).toEqual(expected);
    });
  });
});
