import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";
  email: string = "";

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  register(): void {
    this.accountService.register(this.email, this.password, this.username);
  }
}
