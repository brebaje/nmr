import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { loadArticles } from 'src/app/store/actions/articles.actions';
import { selectArticlesList } from 'src/app/store/selectors/articles.selectors';
import { Article } from 'src/app/models/api.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  articles$: Observable<Article[] | undefined>;
  searchTerm = 'nmr';

  constructor(private store: Store) {
    this.articles$ = this.store.select(selectArticlesList).pipe(
      tap((articles) => {
        // load articles if state property is empty
        // avoid loading articles if data is present in the state (unnecessary api calls)
        if (!articles) {
          this.store.dispatch(loadArticles({ searchTerm: this.searchTerm }));
        }
      }),
    );
  }
}
