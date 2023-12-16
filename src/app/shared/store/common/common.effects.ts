import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { CommonActions } from './common.actions';

@Injectable()
export class CommonEffects {
  showMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CommonActions.showMessage),
        tap(({ payload }) =>
          this.matSnackBar.open(payload, undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }),
        ),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly matSnackBar: MatSnackBar,
  ) {}
}
