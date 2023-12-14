import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { usersFeatureKey, usersReducer } from './pages/users/store';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/users',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.routes').then(
            module => module.USERS_ROUTES,
          ),
        providers: [
          provideState({ name: usersFeatureKey, reducer: usersReducer }),
        ],
      },
      {
        path: '**',
        redirectTo: '/dashboard/users',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
