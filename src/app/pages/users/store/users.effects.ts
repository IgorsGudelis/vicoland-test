import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { UsersService } from '../services';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      map(() =>
        UsersActions.getUsersSuccess({ payload: this.usersService.getUsers() }),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly usersService: UsersService,
  ) {}
}
