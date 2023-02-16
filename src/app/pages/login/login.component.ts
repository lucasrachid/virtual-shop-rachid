import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  controlLogin: { [key: string]: AbstractControl } = {};
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder) {
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
  }
}
