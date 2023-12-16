import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CommonActions } from '@shared/store/common';
import { filter, map, switchMap, tap } from 'rxjs';

import { UsersService } from '../services';
import { UsersActions } from './users.actions';
import { selectUpdatedUserInfo, selectUsers } from './users.selectors';

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

  createUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUserSuccess),
      map(({ payload }) =>
        CommonActions.showMessage({
          payload: `User ${payload.firstName} ${payload.lastName} was created.`,
        }),
      ),
    ),
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      concatLatestFrom(() => this.store.select(selectUsers)),
      filter(([_, users]) => users.length === 0),
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

  saveCommon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonActions.save),
      map(() => UsersActions.saveUser()),
    ),
  );

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.saveUser),
      concatLatestFrom(() => this.store.select(selectUpdatedUserInfo)),
      map(([_, updatedUserInfo]) =>
        updatedUserInfo
          ? UsersActions.saveUserSuccess({ payload: updatedUserInfo })
          : UsersActions.saveUserFailure(),
      ),
    ),
  );

  saveUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.saveUserSuccess),
      tap(() =>
        this.router.navigate(['dashboard', 'users'], {
          queryParamsHandling: 'preserve',
        }),
      ),
      map(({ payload }) =>
        CommonActions.showMessage({
          payload: `User ${payload.firstName} ${payload.lastName} was saved.`,
        }),
      ),
    ),
  );

  saveUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.saveUserFailure),
      map(() =>
        CommonActions.showMessage({
          payload: 'Oops, invalid form...',
        }),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly store: Store,
    private readonly usersService: UsersService,
  ) {}
}
