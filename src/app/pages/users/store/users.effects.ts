import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommonActions } from '@shared/store/common';
import { map, switchMap } from 'rxjs';

import { UsersService } from '../services';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {
  createCommon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonActions.create),
      map(() => UsersActions.createUser()),
    ),
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      switchMap(() =>
        this.usersService
          .createUser()
          .pipe(
            map(response =>
              UsersActions.createUserSuccess({ payload: response }),
            ),
          ),
      ),
    ),
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() =>
        this.usersService
          .getUsers()
          .pipe(
            map(response =>
              UsersActions.getUsersSuccess({ payload: response }),
            ),
          ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService,
  ) {}
}
