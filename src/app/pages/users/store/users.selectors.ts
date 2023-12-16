import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectParams, selectQueryParams } from '@shared/store/router';

import { usersFeatureKey, UsersState } from './users.state';

export const selectUsersFeature =
  createFeatureSelector<UsersState>(usersFeatureKey);

export const selectCurrentUser = createSelector(
  selectUsersFeature,
  selectParams,
  ({ users }, { userId }) => users.find(item => item.id === userId),
);

export const selectUpdatedUserInfo = createSelector(
  selectUsersFeature,
  state => state.updatedUserInfo,
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
