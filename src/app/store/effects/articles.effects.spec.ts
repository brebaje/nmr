import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ArticlesEffects } from './articles.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticlesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ArticlesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
