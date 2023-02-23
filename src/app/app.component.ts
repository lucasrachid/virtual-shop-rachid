import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Virtual Shop Rachid';
  routeLogin: boolean = false;
  opened: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    // this.validateNavbar();

  }

  validateNavbar(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routeLogin = e.url === '/' || e.url === '/login';
      }
    });
  }

}
