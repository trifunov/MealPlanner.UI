import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../shared/models/company';
import { Employee } from '../../shared/models/employee';
import { UserEmployee } from '../../shared/models/useremployee';
import { CompanyService } from '../../shared/services/company.service';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-employee-createedit',
  templateUrl: './createedit.component.html',
  styleUrls: ['./createedit.component.css']
})
export class CreateeditComponent implements OnInit {

  showCreateEditPopUpById: number;
  successfulSave: boolean;
  companies: Company[];

  rfid: string = "";
  companyId: number = 0;
  userId: string = "";

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private companyService: CompanyService) {
    this.employeeService.showCreateEditPopUpById.subscribe(data => {
      this.showCreateEditPopUpById = data;
    });

    this.employeeService.employeeToEditObs.subscribe(data => {
      this.rfid = data.rfid;
      this.companyId = data.companyId;
      this.userId = data.userId;
    });

    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });
  }

  ngOnInit(): void {
    this.successfulSave = false;
    this.companyService.getAll();
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var employee = new Employee();
      employee.id = this.showCreateEditPopUpById;
      employee.rfid = this.rfid;
      employee.companyId = this.companyId;
      employee.userId = this.userId;

      if (this.showCreateEditPopUpById == 0) {
        this.employeeService.create(employee).subscribe(data => {
          //this.successfulSave = true;
          this.employeeService.getUsersUnemployeed();
        });
      }
      else {
        this.employeeService.edit(employee).subscribe(data => {
          //this.successfulSave = true;
          this.employeeService.getByCompanyId(this.route.snapshot.queryParamMap.get('companyId'));
        });
      }
    }

    this.employeeService.showCreateEditPopUpById.next(-1);
  }
}
