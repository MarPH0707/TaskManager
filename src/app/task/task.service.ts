import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';

import { TaskI } from './task-i';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /* private apiURL =
    'https://my-json-server.typicode.com/MARPH0707/ListTask/tasks/'; */

  private apiURL = 'http://localhost:3000/ListTasks/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}


  //#region Peticiones
  //Obtener todas las tareas
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL).pipe(catchError(this.errorHandler));
  }

  create(task: TaskI): Observable<any> {
    return this.httpClient
      .post(this.apiURL, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Dado un id encontrar la tarea
  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  //Actualizar una tarea
  update(id: number, task: TaskI): Observable<any> {
    return this.httpClient
      .put(this.apiURL + id, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Borrar una tarea
  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  /* Obtener las tareas cuyo nombre contienen el término term */
  searchTasks(term: string): Observable<TaskI[]> {
    if (!term.trim()) {
      // Si no encuentra el term , retorna un array vacío
      return of([]);
    }
    return this.httpClient.get<TaskI[]>(`${this.apiURL}?task.title=${term}`).pipe(
      tap(x => x.length ?
         this.errorHandler(`found heroes matching "${term}"`) :
         this.errorHandler(`no heroes matching "${term}"`)),
      catchError(this.errorHandler)
    );
  }

  _searchTasks(term: string): Observable<TaskI[]> {
    return this.httpClient
      .get<any>(`app/task/?title=${term}`)
      .pipe(catchError(this.errorHandler));
  }

  //#endregion

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }




}
