import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateeditComponent } from './createedit/createedit.component';
import { DeleteComponent } from './delete/delete.component';
import { CompanyService } from '../shared/services/company.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListComponent, CreateeditComponent, DeleteComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [CompanyService],
  bootstrap: [ListComponent]
})
export class CompanyModule { }
