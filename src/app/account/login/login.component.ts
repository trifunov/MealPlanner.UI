import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.username, this.password);
  }
}
