import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: LoggedInUser;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl("account/loginrfid");
  }
}
