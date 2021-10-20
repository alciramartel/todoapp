import { ActionReducerMap } from '@ngrx/store';
import { validFilters } from './filter/filter.actions';
import { Todo } from './todos/models/todo.model';
import { todoReducer } from './todos/todo.reducer';
import { filterReducer } from './filter/filter.reducer';
export interface AppState {
  todos: Todo[];
  filter: validFilters;
}

export const appReducer: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer,
};
