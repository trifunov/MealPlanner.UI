import { Component, OnInit } from '@angular/core';
import { DateShift } from '../../shared/models/date-shift';
import { Meal } from '../../shared/models/meal';
import { Order } from '../../shared/models/order';
import { ConfigService } from '../../shared/services/config.service';
import { MealService } from '../../shared/services/meal.service';
import { NotifierService } from '../../shared/services/notifier.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateOrderComponent implements OnInit {

  meals: Meal[];
  selectedShift: number = -1;
  selectedPlan: number = -1;

  constructor(private mealService: MealService, private orderService: OrderService, private configService: ConfigService, private notifierService: NotifierService) {
    this.mealService.mealGetValidObs.subscribe((data) => {
      this.meals = data;
    });

    this.orderService.selectedPlanObs.subscribe((data) => {
      this.selectedPlan = data;
    });
  }

  ngOnInit(): void {
    
  }

  changedDateShiftSelection(selectedDateShift: DateShift) {
    this.selectedShift = selectedDateShift.shift;
    if (selectedDateShift.shift == -1) {
      this.meals = [];
    }
    else {
      this.mealService.getValid(selectedDateShift.shift, selectedDateShift.date);
    }
  }

  createOrder(planId: number) {
    var order = new Order();
    order.shift = this.selectedShift;
    order.isDelivered = false;
    order.planId = planId;

    this.orderService.create(order).subscribe(data => {
      this.selectedPlan = planId;
      if (data['message'] !== '') {
        this.notifierService.notificationConfig.next({ type: 'success', message: data['message'].toString() });
      }
    });
  }
}
