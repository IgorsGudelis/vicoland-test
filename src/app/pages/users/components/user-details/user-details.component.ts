import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { debounceTime, take } from 'rxjs';

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
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  readonly user$ = this.store.select(selectCurrentUser);
  form = this.fb.nonNullable.group({
    city: ['', [Validators.required, Validators.pattern("[a-zA-Z -']+")]],
    country: ['', [Validators.required, Validators.pattern("[a-zA-Z -']+")]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z']+")]],
    lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z']+")]],
    street: ['', [Validators.required, Validators.pattern("^[a-zA-Z -']+")]],
    zipcode: this.fb.control<number | null>(null, {
      nonNullable: false,
      validators: Validators.pattern('[0-9]*'),
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
