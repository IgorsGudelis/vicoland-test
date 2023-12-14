import { createReducer, on } from '@ngrx/store';

import { UsersActions } from './users.actions';
import { initialState } from './users.state';

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.getUsersSuccess, (state, { payload }) => ({
    ...state,
    users: payload,
  })),
);
