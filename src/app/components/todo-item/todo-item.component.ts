import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Todo } from 'src/app/models';

import { TodoService } from '../../services';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  // Set Dynamic Classes
  setClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed
    };

    return classes;
  }

  onToggle(todo: Todo) {
    // Toggle on UI
    todo.completed = !todo.completed;

    // Toggle on API
    this.todoService
      .toggleCompleted(todo)
      .subscribe(result => console.log(result));
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
