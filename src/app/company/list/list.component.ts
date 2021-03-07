import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  companies: Company[];

  constructor(private companyService: CompanyService) {
    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });
  }

  ngOnInit(): void {
    this.companyService.getAll();
  }

  create() {
    this.companyService.setCompanyForCreate();
  }

  edit(id: number) {
    this.companyService.getCompanyByIdForEdit(id);
  }

  delete(id: number) {
    this.companyService.showDeletePopUpById.next(id);
  }

}
