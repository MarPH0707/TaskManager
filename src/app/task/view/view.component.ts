import { Component } from '@angular/core';

import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskI } from '../task-i';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  id!: number;
  task!: TaskI;


  constructor(
    public taskService : TaskService ,
    private route: ActivatedRoute,
    private router: Router
   ) { }

   ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];
    this.taskService.find(this.id).subscribe((data: TaskI)=>{
      this.task = data;
    });
  }

}

