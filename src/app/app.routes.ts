import { Routes } from '@angular/router';

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
