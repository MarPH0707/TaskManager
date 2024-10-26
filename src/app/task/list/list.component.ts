import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskI } from '../task-i';
import { TaskService } from '../task.service';
import { RouterModule,Router } from '@angular/router';
import {SearchTasksComponent} from './../search-tasks/search-tasks.component'
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchTasksComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  tasks: TaskI[] = [];

  //Inyectamos el servicio en el constructor
  constructor(public taskService: TaskService,private router: Router) { }

  //Desde aqui llamaremos al servicio una vez ejecutado el constructor
  // y obtenemos todas las tareas
  ngOnInit(): void {
    this.taskService.getAll().subscribe((data: TaskI[])=>{
      this.tasks = data;
      console.log(this.tasks);
    })
  }

  gotoDetail(task: TaskI): void {
    const link = ['/view', task.id];
    this.router.navigate(link);
  }
}
