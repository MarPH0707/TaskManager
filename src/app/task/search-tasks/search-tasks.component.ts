import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { StateTask, TaskI } from '../task-i';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-tasks',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search-tasks.component.html',
  styleUrl: './search-tasks.component.css',
})
export class SearchTasksComponent {
  tasks$!: Observable<TaskI[]>; //el ngFor itera sobre esta lista que es un Observable, no un array de tareas
  _tasks!: Observable<TaskI[]>;
  private searchTerms = new Subject<string>(); //La propiedad searchTerms es un Subject de RxJS.

  constructor(private taskService: TaskService, private router: Router) {}

  // a medida que vamos tecleando en la caja de búsqueda, vamos buscando .
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tasks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.taskService.searchTasks(term))
    );
  }

  gotoDetail(task: TaskI): void {
    const link = ['/view', task.id];
    this.router.navigate(link);
  }
}
