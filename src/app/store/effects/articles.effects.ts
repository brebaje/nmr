import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as articlesActions from 'src/app/store/actions/articles.actions';
import { WikipediaService } from 'src/app/services/wikipedia.service';
import { Article, ArticleDetail } from 'src/app/models/api.model';

@Injectable()
export class ArticlesEffects {
  constructor(private actions$: Actions, private wikipediaService: WikipediaService) {}

  loadArticleDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(articlesActions.loadArticleDetail),
      mergeMap(({ id }) =>
        this.wikipediaService.getArticle(id).pipe(
          map((article: ArticleDetail) => articlesActions.loadArticleDetailSuccess({ article })),
          catchError((error) => of(articlesActions.loadArticleDetailFailure({ error }))),
        ),
      ),
    );
  });

  loadArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(articlesActions.loadArticles),
      mergeMap(({ searchTerm }) =>
        this.wikipediaService.getArticles(searchTerm).pipe(
          map((articles: Article[]) => articlesActions.loadArticlesSuccess({ articles })),
          catchError((error) => of(articlesActions.loadArticlesFailure({ error }))),
        ),
      ),
    );
  });

  errors = [articlesActions.loadArticleDetailFailure, articlesActions.loadArticlesFailure];
  errors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...this.errors),
        map((error: any) => console.error(error)),
      );
    },
    { dispatch: false },
  );
}
