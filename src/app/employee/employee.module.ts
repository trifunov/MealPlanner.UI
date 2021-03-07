import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/services/employee.service';
import { CreateeditComponent } from './createedit/createedit.component';



@NgModule({
  declarations: [ListEmployeeComponent, CreateeditComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [ListEmployeeComponent]
})
export class EmployeeModule { }
