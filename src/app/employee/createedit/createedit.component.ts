import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../shared/models/company';
import { Employee } from '../../shared/models/employee';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { UserEmployee } from '../../shared/models/useremployee';
import { AccountService } from '../../shared/services/account.service';
import { CompanyService } from '../../shared/services/company.service';
import { ConfigService } from '../../shared/services/config.service';
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
  roles = [];

  rfid: string = "";
  companyId: number = 0;
  username: string = "";
  role: string = "";
  email: string = "";
  password: string = "";
  userId: string = "";
  loggedInUser: LoggedInUser;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private companyService: CompanyService, private configService: ConfigService, private accountService: AccountService) {
    this.employeeService.showCreateEditPopUpById.subscribe(data => {
      this.showCreateEditPopUpById = data;
    });

    this.employeeService.employeeToEditObs.subscribe(data => {
      this.rfid = data.rfid;
      this.companyId = data.companyId;
      this.username = data.username;
      this.role = data.role;
      this.email = data.email;
      this.password = data.password;
      this.userId = data.userId;
    });

    this.companyService.companyGetAllObs.subscribe((data) => {
      this.companies = data;
    });

    this.roles = this.configService.getRoles();
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
  }

  ngOnInit(): void {
    this.successfulSave = false;
    this.companyService.getAll();
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var employee = new UserEmployee();
      employee.id = this.showCreateEditPopUpById;
      employee.rfid = this.rfid;
      employee.companyId = this.companyId;
      employee.username = this.username;
      employee.role = this.role;
      employee.email = this.email;
      employee.userId = this.userId;
      
      if (this.showCreateEditPopUpById == 0) {
        employee.password = this.password;
        this.employeeService.create(employee).subscribe(data => {
          //this.successfulSave = true;
          this.employeeService.getByCompanyId(this.route.snapshot.queryParamMap.get('companyId'));
        });
      }
      else {
        employee.password = "";
        this.employeeService.edit(employee).subscribe(data => {
          //this.successfulSave = true;
          this.employeeService.getByCompanyId(this.route.snapshot.queryParamMap.get('companyId'));
        });
      }
    }

    this.employeeService.showCreateEditPopUpById.next(-1);
  }
}
