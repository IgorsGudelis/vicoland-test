import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import {
  ADDRESS_VALIDATOR,
  LETTERS_VALIDATOR,
  NUMBERS_VALIDATOR,
} from '@shared/consts';
import { debounceTime, take } from 'rxjs';

import { APP_SHARED } from '../../../../shared';
import { User } from '../../models';
import { selectCurrentUser, UsersActions } from '../../store';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ...APP_SHARED,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  readonly user$ = this.store.select(selectCurrentUser);
  form = this.fb.nonNullable.group({
    city: ['', [Validators.required, ADDRESS_VALIDATOR]],
    country: ['', [Validators.required, ADDRESS_VALIDATOR]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, LETTERS_VALIDATOR]],
    lastName: ['', [Validators.required, LETTERS_VALIDATOR]],
    street: ['', [Validators.required, ADDRESS_VALIDATOR]],
    zipcode: this.fb.control<number | null>(null, {
      nonNullable: false,
      validators: NUMBERS_VALIDATOR,
    }),
  });
  private user!: User;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly fb: FormBuilder,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.subscribeOnCurrentUser();
    this.subscribeOnFormValueChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(UsersActions.resetUpdatedUserInfo());
  }

  private subscribeOnCurrentUser(): void {
    this.store
      .select(selectCurrentUser)
      .pipe(take(1))
      .subscribe(value => {
        const { avatarUrl, id, ...formValue } = value!;

        this.user = value!;
        this.form.patchValue(formValue, { emitEvent: false });
        this.store.dispatch(
          UsersActions.setUpdatedUserInfo({ payload: this.user }),
        );
      });
  }

  subscribeOnFormValueChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const payload: User | null = this.form.valid
          ? {
              ...this.user,
              ...value,
            }
          : null;

        this.store.dispatch(UsersActions.setUpdatedUserInfo({ payload }));
      });
  }
}
