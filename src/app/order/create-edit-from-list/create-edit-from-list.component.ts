import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../../shared/models/loggedinuser';
import { Meal } from '../../shared/models/meal';
import { OrderForEdit } from '../../shared/models/order-for-edit';
import { Plan } from '../../shared/models/plan';
import { UserEmployee } from '../../shared/models/useremployee';
import { AccountService } from '../../shared/services/account.service';
import { ConfigService } from '../../shared/services/config.service';
import { EmployeeService } from '../../shared/services/employee.service';
import { MealService } from '../../shared/services/meal.service';
import { NotifierService } from '../../shared/services/notifier.service';
import { OrderService } from '../../shared/services/order.service';
import { PlanService } from '../../shared/services/plan.service';

@Component({
  selector: 'app-order-create-edit-from-list',
  templateUrl: './create-edit-from-list.component.html',
  styleUrls: ['./create-edit-from-list.component.css']
})
export class OrderCreateEditFromListComponent implements OnInit {

  showCreateEditPopUpById: number;
  employees: UserEmployee[];
  meals: Meal[];
  shifts = [];
  date: string;
  shift: number;
  planId: number;
  employeeId: number;
  datePickerConfig;
  loggedInUser: LoggedInUser;

  constructor(private mealService: MealService, private configService: ConfigService, private orderService: OrderService, private planService: PlanService, private notifierService: NotifierService, private accountService: AccountService, private employeeService: EmployeeService) {
    this.accountService.loggedInObs.subscribe(data => this.loggedInUser = data);
    this.mealService.mealGetValidObs.subscribe((data) => {
      this.meals = data;
    });

    this.shifts = this.configService.getShifts();

    this.orderService.showCreateEditPopUpById.subscribe(data => {
      this.showCreateEditPopUpById = data;
    });

    this.orderService.orderToEditObs.subscribe(data => {
      this.date = this.planService.convertDateStringToMomentString(data.date);
      this.shift = data.shift;
      this.planId = data.planId;
      this.employeeId = data.employeeId;

      if (this.shift > -1) {
        this.mealService.getValid(this.shift, this.date);
      }
    });

    this.employeeService.employeesFromTokenObs.subscribe(data => {
      this.employees = data;
    });

    this.datePickerConfig = {
      format: 'YYYY-MM-DD'
    }
  }

  ngOnInit(): void {
    //this.employeeService.getByCompanyIdFromToken();
  }

  onChangeDate(event) {
    if (this.showCreateEditPopUpById == 0) {
      this.planId = -1;
      this.shift = -1;
      this.meals = [];
    }
  }

  onChangeShift(event) {
    this.planId = -1;
    this.mealService.getValid(this.shift, this.date);
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var order = new OrderForEdit();
      order.orderId = this.showCreateEditPopUpById;
      order.date = this.date;
      order.shift = this.shift;
      order.planId = this.planId;
      order.employeeId = this.employeeId;

      if (this.showCreateEditPopUpById == 0) {
        this.orderService.createFromList(order).subscribe(data => {
          this.orderService.refreshOrderList.next(true);
          if (data['message'] !== '') {
            this.notifierService.notificationConfig.next({ type: 'success', message: data['message'].toString() });
          }
        });
      }
      else {
        this.orderService.editFromList(order).subscribe(data => {
          this.orderService.refreshOrderList.next(true);
        });
      }
    }

    this.orderService.showCreateEditPopUpById.next(-1);
  }
}
