import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { PlanReportDetailedRequest } from '../../shared/models/plan-report-detailed-request';
import { PlanReportDetailedResponse } from '../../shared/models/plan-report-detailed-response';
import { AccountService } from '../../shared/services/account.service';
import { CompanyService } from '../../shared/services/company.service';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-report-detailed',
  templateUrl: './report-detailed.component.html',
  styleUrls: ['./report-detailed.component.css']
})
export class ReportPlanDetailedComponent implements OnInit {

  plans: PlanReportDetailedResponse[];
  companies: Company[];
  datePickerConfig;
  companyId: number = -1;
  fromDate: string;
  toDate: string;
  shift: number = -1;
  delivery: number = -1;
  shifts;
  deliveries;
  loggedInUser: LoggedInUser;

  constructor(private planService: PlanService, private companyService: CompanyService, private accountService: AccountService) {
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);

    this.planService.planGetDetailedReportsObs.subscribe((data) => {
      this.plans = data;
    });

    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });

    this.datePickerConfig = {
      format: 'YYYY-MM-DD'
    }

    this.shifts = [
      { id: -1, name: '- Сите -' },
      { id: 0, name: 'Прва смена' },
      { id: 1, name: 'Втора смена' },
      { id: 2, name: 'Трета смена' },
      { id: 3, name: 'Администрација' },   
    ]

    this.deliveries = [
      { id: -1, name: '- Сите -' },
      { id: 0, name: 'Само неподигнати' },
      { id: 1, name: 'Само подигнати' }
    ]
  }

  ngOnInit(): void {
    this.companyService.getAll();
  }

  convertDateToMomentString(date: Date) {
    return this.planService.convertDateToMomentString(date);
  }

  getReports() {
    var request = new PlanReportDetailedRequest();
    request.companyId = this.companyId;
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;
    request.shift = this.shift;
    request.delivered = this.delivery;
    this.planService.getDetailedReports(request);
  }

  exportToExcel() {
    var request = new PlanReportDetailedRequest();
    request.companyId = this.companyId;
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;
    request.shift = this.shift;
    request.delivered = this.delivery;
    this.planService.exportToExcelDetailed(request);
  }
}
