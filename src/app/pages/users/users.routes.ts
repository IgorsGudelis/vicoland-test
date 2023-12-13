import { Route } from '@angular/router';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components').then(module => module.UsersListComponent),
  },
  {
    path: ':userId',
    loadComponent: () =>
      import('./components').then(module => module.UserDetailsComponent),
  },
];
