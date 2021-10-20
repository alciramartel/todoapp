import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  completeAll: boolean = false;

  ngOnInit(): void {}

  toggleAll() {
    this.completeAll = !this.completeAll;
    this.store.dispatch(actions.toggleAll({ completed: this.completeAll }));
  }
}
