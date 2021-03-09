import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-login-rfid',
  templateUrl: './login-rfid.component.html',
  styleUrls: ['./login-rfid.component.css']
})
export class LoginRfidComponent implements OnInit {

  rfid: string = "";

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.loginRfid(this.rfid);
  }
}
