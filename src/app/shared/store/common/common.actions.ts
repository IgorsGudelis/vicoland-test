import { createActionGroup, emptyProps } from '@ngrx/store';

export const CommonActions = createActionGroup({
  source: 'Common',
  events: {
    Create: emptyProps(),
    Save: emptyProps(),
  },
});
