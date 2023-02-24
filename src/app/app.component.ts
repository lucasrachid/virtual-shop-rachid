import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Virtual Shop Rachid';
  routeLogin: boolean = false;
  opened: boolean = false;
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit() {
    this.validateNavbar();
  }

  validateNavbar(): void {
    this.routeLogin = this.currentRoute === '' ||
      this.currentRoute === '/' ||
      this.currentRoute === '/login';
  }


}
