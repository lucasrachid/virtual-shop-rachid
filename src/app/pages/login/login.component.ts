import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from '../../models/User';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  controlLogin: { [key: string]: AbstractControl } = {};
  loading: boolean = false;
  revealedPassword: boolean = false;
  authUser: User = new User();

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.instanceFormLogin();
  }

  instanceFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(10)]]
    });

    this.controlLogin = this.formLogin.controls;
  }

  login(): void {
    this.loading = true;
    const canAuthenticate = this.validateLoginAndPassword(this.formLogin.value.login, this.formLogin.value.password);
    if (canAuthenticate) {
      this.authenticationService.userLogin(this.formLogin.value.login, this.formLogin.value.password).subscribe(response => {
        setTimeout(() => {
          if (this.formLogin.value.login === response.username && this.formLogin.value.password === response.password) {
            this.router.navigate(['/home'])
              .then(r => this.toastr.success('Successfully authenticated'));

          } else {
            this.toastr.error('Authentication information is incorrect');
          }
          this.loading = false;
        }, 3000);
      });
    } else {
      this.loading = false;
    }
  }

  revealPassword() {
    let inputPassword = document.getElementById('password');

    if (this.revealedPassword) {
      inputPassword!.setAttribute('type', 'password');
      this.revealedPassword = false;
    } else {
      inputPassword!.setAttribute('type', 'text');
      this.revealedPassword = true;
    }
  }

  validateLoginAndPassword(login: string, password: string): boolean | null {
    let returnError = false;
    if (login === null || login.length === 0) {
      this.toastr.error('Username is required')
      returnError = true;
    }
    if (password === null || password.length === 0) {
      this.toastr.error('Password is required')
      returnError = true;
    }
    if (password.length && password.length <= 5) {
      this.toastr.error('The password must have at least 5 characters')
      returnError = true;
    }
    if (password.length && password.length > 100) {
      this.toastr.error('The password must have a maximum of 100 characters')
      returnError = true;
    }

    if (returnError) {
      return false;
    } else {
      return true;
    }
  }
}
