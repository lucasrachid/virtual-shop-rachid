import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../models/User";
import {AuthenticationService} from "../../services/authentication.service";

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
              private authenticationService: AuthenticationService) {
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
    console.log(this.formLogin);
    this.authenticationService.userLogin(this.formLogin.value.login, this.formLogin.value.password).subscribe(response => {
      console.log(response);
    });
  }

  revealPassword(){
    let inputPassword = document.getElementById('password');

    if (this.revealedPassword) {
      inputPassword!.setAttribute('type', 'password');
      this.revealedPassword = false;
    } else {
      inputPassword!.setAttribute('type', 'text');
      this.revealedPassword = true;
    }
  }
}
