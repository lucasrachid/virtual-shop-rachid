import { Injectable } from '@angular/core';
import User from "../models/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  userLogin(login: string, password: string): Observable<User> {
    return this.http.get<User>('./assets/data/authentication/auth-data.json');
  }
}
