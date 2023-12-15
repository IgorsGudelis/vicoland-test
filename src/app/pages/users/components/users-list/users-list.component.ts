import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../../models';
import { selectUsers, UsersActions } from '../../store';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  readonly users$ = this.store.select(selectUsers);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }

  onUserClick(item: User): void {
    this.router.navigate([item.id], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
