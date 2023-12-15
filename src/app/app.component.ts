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
import { CommonActions } from '@shared/store/common';
import { debounceTime } from 'rxjs';

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
  readonly searchControl = new FormControl<string | null>(null);

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.subscribeOnSearchValueChanges();
  }

  onCreateClick(): void {
    this.store.dispatch(CommonActions.create());
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
          queryParamsHandling: 'merge',
        });
      });
  }
}
