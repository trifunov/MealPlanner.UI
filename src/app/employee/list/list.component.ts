import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../shared/models/company';
import { EmployeeGetByCompanyIdRequest } from '../../shared/models/employee-get-by-company-id-request';
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
  itemsPerPage: number = 20;
  allPages: number = 0;
  employeeName: string = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private companyService: CompanyService, private configService: ConfigService, private accountService: AccountService) {
    this.employeeService.employeesPagedObs.subscribe((data) => {
      this.employees = data.userEmployees;
      this.allPages = Math.ceil(data.totalRows / this.itemsPerPage);
    });

    this.companyService.companyNameObs.subscribe((data) => {
      this.companyName = data;
    });

    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.queryParamMap.get('companyId');
    var request = new EmployeeGetByCompanyIdRequest();
    request.companyId = this.companyId;
    request.employeeName = this.employeeName;
    request.page = 1;
    request.itemsPerPage = this.itemsPerPage;
    request.paged = true;
    this.employeeService.getByCompanyId(request);
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

  onPageChange(page: number = 1): void {
    var request = new EmployeeGetByCompanyIdRequest();
    request.companyId = this.companyId;
    request.employeeName = this.employeeName;
    request.page = page;
    request.itemsPerPage = this.itemsPerPage;
    request.paged = true;
    this.employeeService.getByCompanyId(request);
  }

  search() {
    var request = new EmployeeGetByCompanyIdRequest();
    request.companyId = this.companyId;
    request.employeeName = this.employeeName;
    request.page = 1;
    request.itemsPerPage = this.itemsPerPage;
    request.paged = true;
    this.employeeService.getByCompanyId(request);
  }

  exportToExcel() {
    var request = new EmployeeGetByCompanyIdRequest();
    request.companyId = this.companyId;
    request.employeeName = this.employeeName;
    request.page = 1;
    request.itemsPerPage = this.itemsPerPage;
    request.paged = false;
    this.employeeService.exportToExcel(request);
  }
}
