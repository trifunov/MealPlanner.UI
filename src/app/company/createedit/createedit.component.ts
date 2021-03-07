import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-company-createedit',
  templateUrl: './createedit.component.html',
  styleUrls: ['./createedit.component.css']
})
export class CreateeditComponent implements OnInit {

  showCreateEditPopUpById: number;
  successfulSave: boolean;

  name: string = "";

  constructor(private companyService: CompanyService) {
    this.companyService.showCreateEditPopUpById.subscribe(data => {
      this.showCreateEditPopUpById = data;
    });

    this.companyService.companyToEditObs.subscribe(data => {
      this.name = data.name;
    });
  }

  ngOnInit(): void {
    this.successfulSave = false;
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var company = new Company();
      company.id = this.showCreateEditPopUpById;
      company.name = this.name;

      if (this.showCreateEditPopUpById == 0) {
        this.companyService.create(company).subscribe(data => {
          //this.successfulSave = true;
          this.companyService.getAll();
        });
      }
      else {
        this.companyService.edit(company).subscribe(data => {
          //this.successfulSave = true;
          this.companyService.getAll();
        });
      }
    }

    this.companyService.showCreateEditPopUpById.next(-1);
  }

}
