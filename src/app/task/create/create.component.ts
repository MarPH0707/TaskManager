import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskService } from '../task.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { StateTask, TaskI } from '../task-i';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  form!: FormGroup;
  estado: StateTask = StateTask.Pendiente;
  public estados = Object.values(StateTask);

  //Inyectamos el servicio
  constructor(public taskService: TaskService, public router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      state: new FormControl(this.estado),
    });
  }

  get f() {
    return this.form.controls;
  }

  CreateTask() {
    console.log(this.form.value);

    this.taskService.create(this.form.value).subscribe((res: any) => {
      console.log('****Tarea creada****');
      this.router.navigateByUrl('task/index');
    });
  }

  GoBack() {
    //this.router.navigateByUrl('task/index');
    /* this.router.navigate(['task','/', 'index'])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    }); */

    let params = {};
    let stack: ActivatedRouteSnapshot[] = [
      this.router.routerState.snapshot.root,
    ];
    while (stack.length > 0) {
      const route = stack.pop()!;
      params = { ...params, ...route.params };
      stack.push(...route.children);
    }
    console.log(params);
  }
}
