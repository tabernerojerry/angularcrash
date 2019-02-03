import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosURL = 'https://jsonplaceholder.typicode.com/todos';
  todoLimit = '?_limit=5';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Get Todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosURL}${this.todoLimit}`);
  }

  // Toggle Completed Todo
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosURL}/${todo.id}`;
    return this.http.put(url, todo, this.httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosURL}/${todo.id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosURL, todo, this.httpOptions);
  }
}
