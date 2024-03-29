import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/services/employee.service';
import { CreateeditComponent } from './createedit/createedit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  declarations: [
    ListEmployeeComponent,
    CreateeditComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule
  ],
  providers: [EmployeeService],
  bootstrap: [ListEmployeeComponent]
})
export class EmployeeModule { }
