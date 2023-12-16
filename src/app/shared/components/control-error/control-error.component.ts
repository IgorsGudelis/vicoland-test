import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appControlError]',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './control-error.component.html',
  styleUrl: './control-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent implements AfterViewInit {
  get error$(): Observable<string> {
    return this.error.asObservable();
  }
  private controlRef!: MatFormFieldControl<MatInput>;
  private error = new BehaviorSubject('');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly injector: Injector,
  ) {}

  public ngAfterViewInit(): void {
    this.controlRef = this.injector.get(MatFormField)._control;
    this.controlRef.ngControl?.statusChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateError());
  }

  private updateError(): void {
    const errors = this.controlRef.ngControl?.errors;
    let message = '';

    if (errors) {
      const [key, value] = Object.entries(errors)[0];

      switch (key) {
        case 'email': {
          message = 'Not a valid email';
          break;
        }
        case 'pattern': {
          const { requiredPattern } = value;

          if (requiredPattern.includes('a-z')) {
            message = 'Only letters are allowed';
          }

          if (requiredPattern.includes('0-9')) {
            message = 'Only numbers are allowed';
          }

          break;
        }
        case 'required': {
          message = 'Field is required';
          break;
        }
      }

      this.error.next(message);
    }
  }
}
