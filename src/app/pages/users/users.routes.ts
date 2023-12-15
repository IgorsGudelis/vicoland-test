import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { UsersService } from './services';
import { UsersEffects, usersFeatureKey, usersReducer } from './store';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    providers: [
      UsersService,
      provideState({ name: usersFeatureKey, reducer: usersReducer }),
      provideEffects(UsersEffects),
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./components').then(module => module.UsersListComponent),
        title: 'Dashboard | Users List',
        data: {
          isSaveDisabled: true,
        },
      },
      {
        path: ':userId',
        loadComponent: () =>
          import('./components').then(module => module.UserDetailsComponent),
        title: 'Dashboard | User',
        data: {
          isCreateDisabled: true,
          isSearchDisabled: true,
        },
      },
    ],
  },
];
