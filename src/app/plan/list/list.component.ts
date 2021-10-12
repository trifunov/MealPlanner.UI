import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Plan } from '../../shared/models/plan';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListPlanComponent implements OnInit {

  plans: Plan[];
  itemsPerPage: number = 20;
  allPages: number = 0;

  constructor(private route: Router, private planService: PlanService) {
    this.planService.planGetByCompanyIdObs.subscribe((data) => {
      this.plans = data.plans;
      this.allPages = Math.ceil(data.totalRows / this.itemsPerPage);
    });
  }

  ngOnInit(): void {
    this.planService.getByCompanyId(1, this.itemsPerPage);
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
    this.planService.getByCompanyId(page, this.itemsPerPage);
  }
}
