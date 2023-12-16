import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { APP_SHARED } from '../../../../shared';
import { User } from '../../models';
import { selectUsers, UsersActions } from '../../store';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, ...APP_SHARED],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
