import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';

import { UsersService } from './services';
import { usersFeatureKey, usersReducer } from './store';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    providers: [
      UsersService,
      provideState({ name: usersFeatureKey, reducer: usersReducer }),
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components').then(module => module.UsersListComponent),
      },
      {
        path: ':userId',
        loadComponent: () =>
          import('./components').then(module => module.UserDetailsComponent),
      },
    ],
  },
];
