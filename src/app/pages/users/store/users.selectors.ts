import { createFeatureSelector, createSelector } from '@ngrx/store';

import { usersFeatureKey, UsersState } from './users.state';

export const selectUsersFeature =
  createFeatureSelector<UsersState>(usersFeatureKey);

export const selectCurrentUser = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.currentUser,
);

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users,
);
