import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { debounceTime, filter, map, skip, take } from 'rxjs';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component-theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly isCreateDisabled$ = this.store.select(selectIsCreateDisabled);
  readonly isSaveDisabled$ = this.store.select(selectIsSaveDisabled);
  readonly isSearchDisabled$ = this.store.select(selectIsSearchDisabled);
  readonly searchControl = new FormControl<string | null>(null);

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.initSearchValue();
    this.subscribeOnSearchValueChanges();
    this.subscribeOnSearchStatusChanges();
  }

  onCreateClick(): void {
    this.store.dispatch(CommonActions.create());
  }

  onSaveClick(): void {
    this.store.dispatch(CommonActions.save());
  }

  private initSearchValue(): void {
    this.store
      .select(selectQueryParams)
      .pipe(
        skip(1),
        take(1),
        map(({ search }) => search?.trim()),
        filter(value => !!value),
      )
      .subscribe(value =>
        this.searchControl.patchValue(value, { emitEvent: false }),
      );
  }

  subscribeOnSearchValueChanges(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const queryParams = {
          search: value?.trim() || null,
        };

        this.router.navigate([], {
          queryParams,
        });
      });
  }

  subscribeOnSearchStatusChanges(): void {
    this.store
      .select(selectIsSearchDisabled)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value =>
        value
          ? this.searchControl.disable({ emitEvent: false })
          : this.searchControl.enable({ emitEvent: false }),
      );
  }
}
