import * as articlesSelectors from 'src/app/store/selectors/articles.selectors';
import * as fromReducer from 'src/app/store/reducers/articles.reducer';

import { detail, list } from 'src/app/test/data/articles.data';

describe('Articles Selectors', () => {
  const { initialState } = fromReducer;

  it('should select the article detail', () => {
    const expected = detail;
    const state: fromReducer.State = { ...initialState, article: detail };
    const result = articlesSelectors.selectArticleDetail.projector(state);
    expect(result).toEqual(expected);
  });

  it('should select the articles list', () => {
    const expected = list;
    const state: fromReducer.State = { ...initialState, articlesList: list };
    const result = articlesSelectors.selectArticlesList.projector(state);
    expect(result).toEqual(expected);
  });
});
