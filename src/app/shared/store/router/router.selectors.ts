import { createFeatureSelector, createSelector } from '@ngrx/store';

import { routerFeatureKey, RouterState } from './router.state';

export const selectRouterFeature =
  createFeatureSelector<RouterState>(routerFeatureKey);

export const selectParams = createSelector(
  selectRouterFeature,
  ({ state }: RouterState = {} as RouterState) => state?.params || {},
);

export const selectQueryParams = createSelector(
  selectRouterFeature,
  ({ state }: RouterState = {} as RouterState) => state?.queryParams || {},
);

export const selectRouteData = createSelector(
  selectRouterFeature,
  ({ state }: RouterState = {} as RouterState) => state?.data || {},
);

export const selectUrl = createSelector(
  selectRouterFeature,
  ({ state }: RouterState = {} as RouterState) => state?.url,
);
