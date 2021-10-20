import { createAction, props } from '@ngrx/store';

export type validFilters = 'all' | 'active' | 'completed';

export const setFilter = createAction(
  '[Filter] Set Action',
  props<{ filter: validFilters }>()
);
