import { TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { ArticlesEffects } from './articles.effects';
import * as articlesActions from 'src/app/store/actions/articles.actions';
import { WikipediaService } from 'src/app/services/wikipedia.service';
import { detail, list } from 'src/app/test/data/articles.data';

describe('Articles Effects', () => {
  const error = new Error('test error');
  const wikipediaSrv = {
    getArticle: jasmine.createSpy('getArticle'),
    getArticles: jasmine.createSpy('getArticles'),
  };
  let actions$ = new Observable<Action>();
  let effects: ArticlesEffects;
  let metadata: EffectsMetadata<ArticlesEffects>;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesEffects, provideMockActions(() => actions$), { provide: WikipediaService, useValue: wikipediaSrv }],
    });

    effects = TestBed.inject(ArticlesEffects);
    metadata = getEffectsMetadata(effects);
    scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadArticleDetail$', () => {
    it('should request the article data from the wikipedia service', (done) => {
      wikipediaSrv.getArticle.and.returnValue(of(detail));
      actions$ = of(articlesActions.loadArticleDetail({ id: detail.pageid }));

      effects.loadArticleDetail$.subscribe(() => {
        expect(wikipediaSrv.getArticle).toHaveBeenCalledWith(detail.pageid);
        done();
      });
    });

    it('should dispatch the success action', () => {
      scheduler.run(({ expectObservable, hot }) => {
        wikipediaSrv.getArticle.and.returnValue(of(detail));
        const expected = { b: articlesActions.loadArticleDetailSuccess({ article: detail }) };
        actions$ = hot('a', { a: articlesActions.loadArticleDetail({ id: detail.pageid }) });

        expectObservable(effects.loadArticleDetail$).toBe('b', expected);
      });
    });

    it('should dispatch the failure action', () => {
      scheduler.run(({ expectObservable, hot }) => {
        wikipediaSrv.getArticle.and.returnValue(throwError(() => error));
        const expected = { b: articlesActions.loadArticleDetailFailure({ error }) };
        actions$ = hot('a', { a: articlesActions.loadArticleDetail({ id: detail.pageid }) });

        expectObservable(effects.loadArticleDetail$).toBe('b', expected);
      });
    });
  });

  describe('loadArticles$', () => {
    const searchTerm = 'nmr';

    it('should request the articles list from the wikipedia service', (done) => {
      wikipediaSrv.getArticles.and.returnValue(of(list));
      actions$ = of(articlesActions.loadArticles({ searchTerm }));

      effects.loadArticles$.subscribe(() => {
        expect(wikipediaSrv.getArticles).toHaveBeenCalledWith(searchTerm);
        done();
      });
    });

    it('should dispatch the success action', () => {
      scheduler.run(({ expectObservable, hot }) => {
        wikipediaSrv.getArticles.and.returnValue(of(list));
        const expected = { b: articlesActions.loadArticlesSuccess({ articles: list }) };
        actions$ = hot('a', { a: articlesActions.loadArticles({ searchTerm }) });

        expectObservable(effects.loadArticles$).toBe('b', expected);
      });
    });

    it('should dispatch the failure action', () => {
      scheduler.run(({ expectObservable, hot }) => {
        wikipediaSrv.getArticles.and.returnValue(throwError(() => error));
        const expected = { b: articlesActions.loadArticlesFailure({ error }) };
        actions$ = hot('a', { a: articlesActions.loadArticles({ searchTerm }) });

        expectObservable(effects.loadArticles$).toBe('b', expected);
      });
    });
  });

  describe('errors$', () => {
    it('should capture all errors', () => {
      expect(effects.errors.length).toBe(Object.keys(metadata).length - 1);
    });

    it('should dispatch no action', () => {
      expect(metadata.errors$?.dispatch).toBeFalse();
    });
  });
});
