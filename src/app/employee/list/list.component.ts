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
  companyName: string;
  employees: UserEmployee[];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private companyService: CompanyService) {
    this.employeeService.employeesObs.subscribe((data) => {
      this.employees = data;
    });

    this.companyService.companyNameObs.subscribe((data) => {
      this.companyName = data;
    });
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

  delete(id: number, userId: string) {
    this.employeeService.delete(id, userId);
  }
}
