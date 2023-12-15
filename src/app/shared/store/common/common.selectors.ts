import { Data } from '@angular/router';
import { createSelector } from '@ngrx/store';

import { selectRouteData } from '../router';

export const selectIsCreateDisabled = createSelector(
  selectRouteData,
  ({ isCreateDisabled }: Data) => isCreateDisabled,
);

export const selectIsSaveDisabled = createSelector(
  selectRouteData,
  ({ isSaveDisabled }: Data) => isSaveDisabled,
);

export const selectIsSearchDisabled = createSelector(
  selectRouteData,
  ({ isSearchDisabled }: Data) => isSearchDisabled,
);
