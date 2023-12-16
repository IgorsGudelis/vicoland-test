import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CommonActions,
  selectIsCreateDisabled,
  selectIsSaveDisabled,
  selectIsSearchDisabled,
} from '@shared/store/common';
import { selectQueryParams } from '@shared/store/router';
import { filter, map, skip, take } from 'rxjs';

import { APP_SHARED } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ...APP_SHARED,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component-theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly isCreateDisabled$ = this.store.select(selectIsCreateDisabled);
  readonly isSaveDisabled$ = this.store.select(selectIsSaveDisabled);
  readonly isSearchDisabled$ = this.store
    .select(selectIsSearchDisabled)
    .pipe(takeUntilDestroyed(this.destroyRef));
  readonly searchinitialValue$ = this.store.select(selectQueryParams).pipe(
    skip(1),
    take(1),
    map(({ search }) => search),
    filter(value => !!value),
  );

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  onCreateClick(): void {
    this.store.dispatch(CommonActions.create());
  }

  onSaveClick(): void {
    this.store.dispatch(CommonActions.save());
  }

  onSearchValueChange(search: string | null): void {
    this.router.navigate([], {
      queryParams: {
        search,
      },
    });
  }
}
