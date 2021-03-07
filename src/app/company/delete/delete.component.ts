import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-company-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  showDeletePopUpById: number;
  successfulDelete: boolean;

  constructor(private companyService: CompanyService) {
    this.companyService.showDeletePopUpById.subscribe((data) => {
      this.showDeletePopUpById = data;
    });
  }

  ngOnInit(): void {
  }

  proceed(toDelete: boolean) {
    if (toDelete === true) {
      this.companyService.delete(this.showDeletePopUpById).subscribe(data => {
        //this.successfulDelete = true;
        this.companyService.getAll();
      });
    }
    this.companyService.showDeletePopUpById.next(0);
  }

}
