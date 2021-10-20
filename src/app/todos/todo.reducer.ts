import { Action, createReducer, on, props } from '@ngrx/store';
import {
  clearCompleted,
  create,
  edit,
  remove,
  toggle,
  toggleAll,
} from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Conseguir una novia'),
  new Todo('Comprar el traje de Spiderman'),
  new Todo('Comer pizza'),
  new Todo('Salvar el mundo'),
];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, { text }) => [...state, new Todo(text)]),

  on(toggle, (state, { id }) => {
    return state.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, { completed }) => {
    return state.map((todo: Todo) => {
      return { ...todo, completed: completed };
    });
  }),

  on(edit, (state, { id, text }) => {
    return state.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, text: text };
      }
      return todo;
    });
  }),

  on(remove, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(clearCompleted, (state) => state.filter((todo) => !todo.completed))
);

export function todoReducer(state: any, action: Action) {
  return _todoReducer(state, action);
}
