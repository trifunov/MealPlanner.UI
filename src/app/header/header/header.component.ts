import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: LoggedInUser;
  companyLogo: string = '';

  constructor(private accountService: AccountService, private companyService: CompanyService, private router: Router) {
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
    this.companyService.companyLogoObs.subscribe(data => this.companyLogo = data);
  }

  ngOnInit(): void {
    this.companyService.getLogo();
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl("account/loginrfid");
  }
}
