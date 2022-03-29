import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

import { clearArticleDetail, loadArticleDetail } from 'src/app/store/actions/articles.actions';
import { selectArticleDetail } from 'src/app/store/selectors/articles.selectors';
import { ArticleDetail } from 'src/app/models/api.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnDestroy, OnInit {
  article$: Observable<ArticleDetail | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.article$ = this.store.select(selectArticleDetail);
  }

  ngOnInit(): void {
    // get article id from route param and dispatch loading action
    this.route.params
      .pipe(
        map((params: Params) => parseInt(params['id'], 10)),
        take(1),
        map((id: number) => this.store.dispatch(loadArticleDetail({ id }))),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticleDetail());
  }
}
