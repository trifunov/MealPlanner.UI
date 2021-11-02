import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { AccountService } from '../../shared/services/account.service';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  companies: Company[];
  loggedInUser: LoggedInUser;

  constructor(private companyService: CompanyService, private accountService: AccountService) {
    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });

    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
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
