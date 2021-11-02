import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../shared/models/company';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { UserEmployee } from '../../shared/models/useremployee';
import { AccountService } from '../../shared/services/account.service';
import { CompanyService } from '../../shared/services/company.service';
import { ConfigService } from '../../shared/services/config.service';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListEmployeeComponent implements OnInit {

  companyId: string;
  companyName: string;
  employees: UserEmployee[];
  loggedInUser: LoggedInUser;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private companyService: CompanyService, private configService: ConfigService, private accountService: AccountService) {
    this.employeeService.employeesObs.subscribe((data) => {
      this.employees = data;
    });

    this.companyService.companyNameObs.subscribe((data) => {
      this.companyName = data;
    });

    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.queryParamMap.get('companyId');
    this.employeeService.getByCompanyId(this.companyId);
    this.companyService.getName(this.companyId);
  }

  createEdit(id: number) {
    if (id == 0) {
      this.employeeService.setEmployeeForCreate(parseInt(this.companyId));
    }
    else {
      this.employeeService.getEmployeeByIdForEdit(id);
    }
  }

  resetPassword(employee: UserEmployee) {
    this.employeeService.setUserForResetPassword(employee);
  }

  delete(id: number, userId: string) {
    this.employeeService.delete(id, userId);
  }

  convertRoleIdToName(roleId: string) {
    return this.configService.convertRoleIdToName(roleId);
  }
}
