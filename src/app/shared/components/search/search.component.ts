import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
      },
    },
  ],
})
export class SearchComponent implements OnInit {
  @Input() set initialValue(value: string | null) {
    this.searchControl.patchValue(value, { emitEvent: false });
  }
  @Input() set isDisabled(value: boolean) {
    value
      ? this.searchControl.disable({ emitEvent: false })
      : this.searchControl.enable({ emitEvent: false });
  }
  @Output() searchChange = new EventEmitter<string | null>();

  readonly searchControl = new FormControl<string | null>(null);

  constructor(private readonly destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.subscribeOnSearchValueChanges();
  }

  subscribeOnSearchValueChanges(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.searchChange.emit(value?.trim() || null);
      });
  }
}
