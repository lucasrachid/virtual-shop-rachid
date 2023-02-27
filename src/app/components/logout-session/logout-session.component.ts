import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-logout-session',
  templateUrl: './logout-session.component.html',
  styleUrls: ['./logout-session.component.scss']
})
export class LogoutSessionComponent {

  constructor(private authenticationService: AuthenticationService) {
  }
  singOut():void {
    this.authenticationService.logOutUser();
  }
}
