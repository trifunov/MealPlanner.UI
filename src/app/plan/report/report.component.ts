import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { PlanReportRequest } from '../../shared/models/plan-report-request';
import { PlanReportResponse } from '../../shared/models/plan-report-response';
import { AccountService } from '../../shared/services/account.service';
import { CompanyService } from '../../shared/services/company.service';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportPlanComponent implements OnInit {

  plans: PlanReportResponse[];
  companies: Company[];
  datePickerConfig;
  companyId: number = -1;
  fromDate: string;
  toDate: string;
  loggedInUser: LoggedInUser;

  constructor(private planService: PlanService, private companyService: CompanyService, private accountService: AccountService) {
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);

    this.planService.planGetReportsObs.subscribe((data) => {
      this.plans = data;
    });

    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });

    this.datePickerConfig = {
      format: 'YYYY-MM-DD'
    }
  }

  ngOnInit(): void {
    this.companyService.getAll();
  }

  convertDateToMomentString(date: Date) {
    return this.planService.convertDateToMomentString(date);
  }

  getReports() {
    var request = new PlanReportRequest();
    request.companyId = this.companyId;
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;
    this.planService.getReports(request);
  }

  exportToExcel() {
    var request = new PlanReportRequest();
    request.companyId = this.companyId;
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;
    this.planService.exportToExcel(request);
  }
}
