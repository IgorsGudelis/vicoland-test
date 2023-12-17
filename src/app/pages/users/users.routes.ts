import { inject } from '@angular/core';
import { Route, UrlSegment } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, Store } from '@ngrx/store';
import { map } from 'rxjs';

import { UsersService } from './services';
import {
  selectUsers,
  UsersEffects,
  usersFeatureKey,
  usersReducer,
} from './store';

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
          import('./components/users-list/users-list.component').then(
            module => module.UsersListComponent,
          ),
        title: 'Dashboard | Users List',
        data: {
          isSaveDisabled: true,
        },
      },
      {
        path: ':userId',
        loadComponent: () =>
          import('./components/user-details/user-details.component').then(
            module => module.UserDetailsComponent,
          ),
        title: 'Dashboard | User',
        data: {
          isCreateDisabled: true,
          isSearchDisabled: true,
        },
        canMatch: [
          (route: Route, [{ path }]: UrlSegment[]) =>
            inject(Store)
              .select(selectUsers)
              .pipe(map(users => users.some(user => user.id === path))),
        ],
      },
    ],
  },
];
