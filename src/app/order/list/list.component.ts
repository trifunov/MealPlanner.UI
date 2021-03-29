import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { OrderFilteredRequest } from '../../shared/models/order-filtered-request';
import { OrderFilteredResponse } from '../../shared/models/order-filtered-response';
import { UserEmployee } from '../../shared/models/useremployee';
import { AccountService } from '../../shared/services/account.service';
import { EmployeeService } from '../../shared/services/employee.service';
import { OrderService } from '../../shared/services/order.service';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListOrderComponent implements OnInit {

  datePickerConfig;
  employees: UserEmployee[];
  orders: OrderFilteredResponse[];
  employeeIds: number[];
  fromDate: string;
  toDate: string;
  loggedInUser: LoggedInUser;

  constructor(private employeeService: EmployeeService, private orderService: OrderService, private accountService: AccountService, private planService: PlanService) {
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
    this.orderService.refreshOrderList.subscribe(data => {
      if (data === true) {
        this.getFiltered();
      }
    });

    this.orderService.orderGetFilteredObs.subscribe((data) => {
      this.orders = data;
    });

    this.employeeService.employeesFromTokenObs.subscribe((data) => {
      this.employees = data;
    });

    this.datePickerConfig = {
      format: 'YYYY-MM-DD'
    }
  }

  ngOnInit(): void {
    this.employeeService.getByCompanyIdFromToken();
  }

  convertDateToMomentString(date: Date) {
    return this.planService.convertDateToMomentString(date);
  }

  getFiltered() {
    var request = new OrderFilteredRequest();
    request.employeeIds = this.employeeIds;
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;

    if (
      ((this.loggedInUser.role == 'HR' && this.employeeIds != null && this.employeeIds.length > 0) || this.loggedInUser.role != 'HR')
      && this.fromDate != null
      && this.toDate != null) {
      this.orderService.getFiltered(request);
    }
  }

  create() {
    this.orderService.setOrderForCreate();
  }

  edit(id: number) {
    this.orderService.getOrderByIdForEdit(id);
  }

  delete(id: number) {
    this.orderService.showDeletePopUpById.next(id);
  }
}
