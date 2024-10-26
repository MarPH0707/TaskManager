import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { TaskService} from '../task.service';
import { TaskI,StateTask  } from '../task-i';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: number;
  task!: TaskI;
  form!: FormGroup;
  public estados = Object.values(StateTask);

  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];
    this.taskService.find(this.id).subscribe((data: TaskI) => {
      this.task = data;
    });

    /* this.form = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required]),
      description: new FormControl(this.task.description),
      state: new FormControl(this.task.state)
    }); */

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      state: new FormControl()
    });
  }

  get f(){
    return this.form.controls;
  }

  EditarTarea(){
    console.log(this.form.value);
    this.taskService.update(this.id, this.form.value).subscribe((res:any) => {
      console.log("Valores del formulario: " + this.form.value);
         console.log('****Tarea actualizada**** '+ this.id);
         this.router.navigateByUrl('task/index');
    })
  }
}
