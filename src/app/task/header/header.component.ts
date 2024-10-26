import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  ngOnInit() {}

  changeRoute(evt: MouseEvent, title: string) {
    evt.preventDefault();
    let navcfg = [{ outlets: { secondary: title } }];
    this.router.navigate(navcfg, { skipLocationChange: false });
  }
}
