import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from '../shared/services/account.service';
import { LoginRfidComponent } from './login-rfid/login-rfid.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, LoginRfidComponent, UnauthorizedComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [AccountService]
})
export class AccountModule { }
