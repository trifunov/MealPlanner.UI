import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlanComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { PlanService } from '../shared/services/plan.service';
import { CreateeditPlanComponent } from './createedit/createedit.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DeleteComponent } from './delete/delete.component';
import { ReportPlanComponent } from './report/report.component';
import { ReportPlanDetailedComponent } from './report-detailed/report-detailed.component';
import { PaginationComponent } from '../pagination/pagination/pagination.component';
import { PaginationModule } from '../pagination/pagination.module';


@NgModule({
  declarations: [
    ListPlanComponent,
    CreateeditPlanComponent,
    DeleteComponent,
    ReportPlanComponent,
    ReportPlanDetailedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    DpDatePickerModule,
    PaginationModule
  ],
  providers: [PlanService],
  bootstrap: [ListPlanComponent]
})
export class PlanModule { }
