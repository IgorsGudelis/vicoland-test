import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CommonActions = createActionGroup({
  source: 'Common',
  events: {
    Create: emptyProps(),
    Save: emptyProps(),
    'Show Message': props<{ payload: string }>(),
  },
});
