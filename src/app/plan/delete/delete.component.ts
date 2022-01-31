import { Component, OnInit } from '@angular/core';
import { PlanGetByCompanyIdRequest } from '../../shared/models/plan-get-by-company-id-request';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  showDeletePopUpByIds: number[];
  successfulDelete: boolean;
  companyId: number = 0;

  constructor(private planService: PlanService) {
    this.planService.showDeletePopUpByIds.subscribe((data) => {
      this.showDeletePopUpByIds = data;
    });

    this.planService.selectedCompanyIdForSearch.subscribe((data) => {
      this.companyId = data;
    });
  }

  ngOnInit(): void {
  }

  proceed(toDelete: boolean) {
    if (toDelete === true) {
      this.planService.delete(this.showDeletePopUpByIds).subscribe(data => {
        this.getByCompanyId();
      });
    }
    this.planService.showDeletePopUpByIds.next([0]);
  }

  getByCompanyId() {
    var request = new PlanGetByCompanyIdRequest();
    request.companyId = this.companyId;
    request.fromDate = new Date().toDateString();
    request.toDate = new Date().toDateString();
    request.page = 1;
    request.itemsPerPage = 20;
    this.planService.getByCompanyId(request);
  }
}
