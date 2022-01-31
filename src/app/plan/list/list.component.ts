import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Company } from '../../shared/models/company';
import { Plan } from '../../shared/models/plan';
import { PlanGetByCompanyIdRequest } from '../../shared/models/plan-get-by-company-id-request';
import { CompanyService } from '../../shared/services/company.service';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListPlanComponent implements OnInit {

  plans: Plan[];
  companies: Company[];
  companyId: number = -1;
  page: number = 1;
  itemsPerPage: number = 20;
  allPages: number = 0;
  fromDate: string;
  toDate: string;
  datePickerConfig;

  constructor(private route: Router, private planService: PlanService, private companyService: CompanyService) {
    this.planService.planGetByCompanyIdObs.subscribe((data) => {
      this.plans = data.plans;
      this.allPages = Math.ceil(data.totalRows / this.itemsPerPage);
    });

    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });

    this.datePickerConfig = {
      format: 'YYYY-MM-DD'
    }
  }

  ngOnInit(): void {
    this.plans = [];
    this.allPages = 0;
    this.companyService.getAll();
  }

  search() {
    if (this.companyId && this.companyId > 0) {
      this.planService.selectedCompanyIdForSearch.next(this.companyId);
      this.page = 1;
      this.getByCompanyId();
    }
    else {
      this.plans = [];
    }
  }

  create() {
    this.route.navigateByUrl('/plan/createedit?ids=0')
  }

  edit(ids: number[]) {
    this.route.navigateByUrl('/plan/createedit?ids=' + ids.join(','))
  }

  delete(ids: number[]) {
    this.planService.showDeletePopUpByIds.next(ids);
  }

  convertDateToMomentString(date: Date) {
    return this.planService.convertDateToMomentString(date);
  }

  onPageChange(page: number = 1): void {
    this.page = page;
    this.getByCompanyId();
  }

  getByCompanyId() {
    var request = new PlanGetByCompanyIdRequest();
    request.companyId = this.companyId;
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;
    request.page = this.page;
    request.itemsPerPage = this.itemsPerPage;
    this.planService.getByCompanyId(request);
  }
}
