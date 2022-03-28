import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromArticles from './articles.reducer';
import { environment } from 'src/environments/environment';

export interface State {
  articles: fromArticles.State;
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  articles: fromArticles.reducer,
  router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
