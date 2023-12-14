import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersEffects {
  constructor(private readonly store: Store) {}
}
