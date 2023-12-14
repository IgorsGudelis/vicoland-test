import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../models';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Get Users': emptyProps(),
    'Get Users Success': props<{ payload: User[] }>(),
  },
});
