import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';
import { remove } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputRef') inputRef: ElementRef;
  chkComplete: FormControl;
  inputTxt: FormControl;
  editing: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkComplete = new FormControl(this.todo.completed);
    this.inputTxt = new FormControl(this.todo.text, Validators.required);

    this.chkComplete.valueChanges.subscribe((value) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  edit() {
    this.editing = true;
    this.inputTxt.setValue(this.todo.text);
    setTimeout(() => {
      this.inputRef.nativeElement.select();
    }, 1);
  }

  save() {
    this.editing = false;
    if (this.inputTxt.invalid) {
      return;
    }
    if (this.inputTxt.value === this.todo.text) {
      return;
    }
    this.store.dispatch(
      actions.edit({ id: this.todo.id, text: this.inputTxt.value })
    );
  }

  remove() {
    this.store.dispatch(actions.remove({ id: this.todo.id }));
  }
}
