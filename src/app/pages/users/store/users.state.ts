import { USERS_INITIAL_STATE } from '../consts';
import { User } from '../models';

export interface UsersState {
  currentUser: User | null;
  users: User[];
}

export const initialState: UsersState = USERS_INITIAL_STATE;

export const usersFeatureKey = 'usersPage';
