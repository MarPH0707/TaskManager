import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskI } from '../task-i';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  tasks: TaskI[] = [];

  //Inyectamos el servicio en el constructor
  constructor(public taskService: TaskService) { }

  //Desde aqui llamaremos al servicio una vez ejecutado el constructor
  // y obtenemos todas las tareas
  ngOnInit(): void {
    this.taskService.getAll().subscribe((data: TaskI[])=>{
      this.tasks = data;
      console.log(this.tasks);
    })
  }

  deletePost(id:number){
    this.taskService.delete(id).subscribe(res => {
         this.tasks = this.tasks.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }


}
