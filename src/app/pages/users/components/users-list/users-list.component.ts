import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { APP_SHARED } from '../../../../shared';
import { selectUsers, UsersActions } from '../../store';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, RouterLink, ...APP_SHARED],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  readonly users$ = this.store.select(selectUsers);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
}
