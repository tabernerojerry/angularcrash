import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models';

import { TodoService } from '../../services';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => (this.todos = todos));
  }

  deleteTodo(todo: Todo) {
    console.log(todo);
    // delete todo on UI
    this.todos = this.todos.filter(t => t.id !== todo.id);

    // delete todo on API
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(t => this.todos.push(t));
  }
}
