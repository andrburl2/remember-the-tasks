import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface NewTodo {
  id: number,
  title: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  url='https://remember-the-tasks-api.herokuapp.com';

  getProjects() {
    return this.http.get(`${this.url}/projects`)
      .pipe(
        catchError(async (val) => console.log(`${val.status}: ${val.statusText}`))
      );
  }

  createNewTodo(obj: NewTodo) {
    return this.http.post(`${this.url}/todos`, obj)
      .pipe(
        catchError(async (val) => console.log(`${val.status}: ${val.statusText}`))
      );
  }

  completeTodo(projectId: number, todoId: number) {
    return this.http.patch(`${this.url}/projects/${projectId}/todos/${todoId}`, null)
      .pipe(
        catchError(async (val) => console.log(`${val.status}: ${val.statusText}`))
      );
  }
}