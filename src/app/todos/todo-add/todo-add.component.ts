import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  inputTxt: FormControl;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.inputTxt = new FormControl('', Validators.required);
  }

  create() {
    if (this.inputTxt.invalid) {
      return;
    }
    this.store.dispatch(actions.create({ text: this.inputTxt.value }));

    this.inputTxt.reset();
  }
}
