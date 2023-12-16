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
  on(UsersActions.saveUserSuccess, state => ({
    ...state,
    users: state.users.map(item =>
      item.id === state.updatedUserInfo!.id ? state.updatedUserInfo! : item,
    ),
  })),
  on(UsersActions.setUpdatedUserInfo, (state, { payload }) => ({
    ...state,
    updatedUserInfo: payload,
  })),
);
