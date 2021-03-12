import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ConfigService } from '../services/config.service';
import { BehaviorSubject } from 'rxjs';
import { LoggedInUser } from '../models/loggedinuser';
import { Router } from '@angular/router';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl: string = '';

  private loggedInSource = new BehaviorSubject<LoggedInUser>({ isLoggedIn: false, email: '', username: '', role: '' });
  loggedInObs = this.loggedInSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService, private companyService: CompanyService, private router: Router) {
    if (localStorage.getItem('loggedInUser')) {
      this.loggedInSource.next(JSON.parse(localStorage.getItem('loggedInUser')));
    }

    this.baseUrl = this.configService.getApiURI();
  }

  register(email: string, password: string, username: string) {
    this.http.post<any>(this.baseUrl + "/account/register", { username: username, password: password, email: email }).subscribe(data => {
      this.login(username, password);
    });
  }

  login(username, password) {
    this.http.post<any>(this.baseUrl + "/account/login", { username: username, password: password }).subscribe(data => {
      this.afterLogin(data);
    });
  }

  loginRfid(rfid) {
    this.http.post<any>(this.baseUrl + "/account/loginrfid", { rfid: rfid }).subscribe(data => {
      this.afterLogin(data);
    });
  }

  afterLogin(data) {
    localStorage.setItem('token', data.token);
    var loggedInUser = {
      isLoggedIn: true,
      email: '',
      username: data.username,
      role: data.role
    };
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.loggedInSource.next(loggedInUser);
    this.companyService.getLogo();
    this.router.navigateByUrl('order/create');
  }

  logout() {
    localStorage.removeItem('token');
    var loggedInUser = { isLoggedIn: false, email: '', username: '', role: '' };
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.loggedInSource.next(loggedInUser);
  }
}
