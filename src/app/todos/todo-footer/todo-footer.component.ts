import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filter/filter.actions';
import { clearCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  selectedFilter: actions.validFilters;
  listFilters: actions.validFilters[] = ['all', 'active', 'completed'];
  leftItems: number = 0;
  completedItems: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store
    //   .select('filter')
    //   .subscribe((filter) => (this.selectedFilter = filter));

    this.store.subscribe(({ todos, filter }) => {
      this.selectedFilter = filter;
      this.leftItems = todos.filter((todo) => !todo.completed).length;
      this.completedItems = todos.filter((todo) => todo.completed).length;
    });
  }
  changeFilter(filter: actions.validFilters) {
    if (filter === this.selectedFilter) {
      return;
    }
    this.store.dispatch(actions.setFilter({ filter: filter }));
    console.log(filter);
  }

  clearCompleted() {
    console.log('click');
    this.store.dispatch(clearCompleted());
  }
}
