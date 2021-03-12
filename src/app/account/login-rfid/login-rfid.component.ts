import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-login-rfid',
  templateUrl: './login-rfid.component.html',
  styleUrls: ['./login-rfid.component.css']
})
export class LoginRfidComponent implements OnInit {

  rfid: string = "";
  @ViewChild("rfidField") rfidField: ElementRef;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.loginRfid(this.rfid);
    this.rfid = '';
    this.rfidField.nativeElement.focus();
  }
}
