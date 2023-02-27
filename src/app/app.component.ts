import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { LogoutSessionComponent } from './components/logout-session/logout-session.component';

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
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.routerEvents();
  }

  routerEvents() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
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

  openDialog() {
    const dialogRef = this.dialog.open(LogoutSessionComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => {
      this.menuTrigger!.focus()
    });
  }

}
