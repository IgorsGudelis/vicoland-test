import { createReducer, on } from '@ngrx/store';

import { UsersActions } from './users.actions';
import { initialState } from './users.state';

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.createUserSuccess, (state, { payload }) => ({
    ...state,
    users: [...state.users, payload],
  })),
  on(UsersActions.getUsersSuccess, (state, { payload }) => ({
    ...state,
    users: payload,
  })),
);
