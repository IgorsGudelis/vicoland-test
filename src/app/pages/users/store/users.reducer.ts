import { createReducer } from '@ngrx/store';

import { initialState } from './users.state';

export const usersReducer = createReducer(initialState);
