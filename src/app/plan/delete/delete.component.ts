import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-plan-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  showDeletePopUpByIds: number[];
  successfulDelete: boolean;

  constructor(private planService: PlanService) {
    this.planService.showDeletePopUpByIds.subscribe((data) => {
      this.showDeletePopUpByIds = data;
    });
  }

  ngOnInit(): void {
  }

  proceed(toDelete: boolean) {
    if (toDelete === true) {
      this.planService.delete(this.showDeletePopUpByIds).subscribe(data => {
        //this.successfulDelete = true;
        this.planService.getByCompanyId(1, 20);
      });
    }
    this.planService.showDeletePopUpByIds.next([0]);
  }

}
