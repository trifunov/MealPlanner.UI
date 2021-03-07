import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../shared/models/company';
import { UserEmployee } from '../../shared/models/useremployee';
import { CompanyService } from '../../shared/services/company.service';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListEmployeeComponent implements OnInit {

  companyId: string;
  employees: UserEmployee[];
  
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.employeeService.employeesObs.subscribe((data) => {
      this.employees = data;
    });
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.queryParamMap.get('companyId');

    if (this.companyId == '0') {
      this.employeeService.getUsersUnemployeed();
    }
    else {
      this.employeeService.getByCompanyId(this.companyId);
    }
  }

  createEdit(id: number, userId: string) {
    if (id == 0) {
      this.employeeService.setEmployeeForCreate(userId);
    }
    else {
      this.employeeService.getEmployeeByIdForEdit(id);
    }
  }
}
