import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IndexComponent} from './task/index/index.component';
import {HeaderComponent} from './task/header/header.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TasksManager';
}
