import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

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
  }

  ngOnInit() {
    this.routerEvents();
  }

  routerEvents() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        console.clear();
        // * NavigationStart: Navigation starts.
        console.log('NavigationStart --- ', event.url);
        this.validateNavbar(event.url);
      }
    });
  }

  validateNavbar(eventUrl: string): void {
    this.currentRoute = eventUrl;
    this.routeLogin = this.currentRoute === '' ||
      this.currentRoute === '/' ||
      this.currentRoute === '/login';
  }


}
