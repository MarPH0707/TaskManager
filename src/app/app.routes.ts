import { Routes } from '@angular/router';
import { IndexComponent } from './task/index/index.component';
import { ViewComponent } from './task/view/view.component';
import { CreateComponent } from './task/create/create.component';
import { EditComponent } from './task/edit/edit.component';
import { ListComponent } from './task/list/list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task/list', pathMatch: 'full' },
  { path: 'task/index', component: IndexComponent },
  { path: 'task/:taskId/view', component: ViewComponent },
  { path: 'task/create', component: CreateComponent },
  { path: 'task/:taskId/edit', component: EditComponent },
  { path: 'task/list', component: ListComponent },
  { path: 'gestionar', component: IndexComponent },
  { path: 'listar', component: ListComponent },

];
