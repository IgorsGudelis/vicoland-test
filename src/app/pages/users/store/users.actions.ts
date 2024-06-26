import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../models';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Create User': emptyProps(),
    'Create User Success': props<{ payload: User }>(),
    'Get Users': emptyProps(),
    'Get Users Success': props<{ payload: User[] }>(),
    'Reset Updated User Info': emptyProps(),
    'Save User': emptyProps(),
    'Save User Failure': emptyProps(),
    'Save User Success': props<{ payload: User }>(),
    'Set Updated User Info': props<{ payload: User | null }>(),
  },
});
