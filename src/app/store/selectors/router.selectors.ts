import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectReducerState = createFeatureSelector<fromRouter.RouterReducerState<any>>('router');

export const selectRouteUrl = createSelector(selectReducerState, (state) => state?.state?.url);

export const selectIfDetailUrl = createSelector(selectRouteUrl, (url) => url?.includes('detail'));
