import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectQueryParams } from '@shared/store/router';

import { usersFeatureKey, UsersState } from './users.state';

export const selectUsersFeature =
  createFeatureSelector<UsersState>(usersFeatureKey);

export const selectCurrentUser = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.currentUser,
);

export const selectUsers = createSelector(
  selectUsersFeature,
  selectQueryParams,
  ({ users }, { search }) => {
    search = search?.trim().toLowerCase();

    return search
      ? users.filter(
          ({ firstName, lastName }) =>
            firstName.toLowerCase().includes(search) ||
            lastName.toLocaleLowerCase().includes(search),
        )
      : users;
  },
);
