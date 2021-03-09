import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Meal } from '../../shared/models/meal';
import { Order } from '../../shared/models/order';
import { ConfigService } from '../../shared/services/config.service';
import { MealService } from '../../shared/services/meal.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateOrderComponent implements OnInit {

  meals: Meal[];
  dates = [];
  shifts = [];
  selectedDate: string;
  selectedShift: number = -1;
  selectedPlan: number = -1;
  elementsToShow: number = 4;
  dateFormatPresentation: string = 'dddd DD MMM YY';

  constructor(private mealService: MealService, private orderService: OrderService, private configService: ConfigService) {
    this.mealService.mealGetValidObs.subscribe((data) => {
      this.meals = data;
    });
  }

  ngOnInit(): void {
    if (window.screen) {
      if (screen.width < 768) {
        this.elementsToShow = 1;
        this.dateFormatPresentation = 'ddd DD MMM YY';
      }
    }

    for (var i = 0; i < 20; i++) {
      var hiddenValue = false;
      if (i > this.elementsToShow) {
        hiddenValue = true;
      }
      this.dates.push({
        value: moment().add(i, 'days').format('YYYY-MM-DD'),
        label: moment().add(i, 'days').format(this.dateFormatPresentation),
        hidden: hiddenValue
      });
    }

    this.shifts = this.configService.getShifts();
  }

  selectDate(date) {
    this.selectedDate = date.value;
    this.selectedShift = -1;
    this.meals = [];
  }

  selectShift(shift) {
    this.selectedShift = shift.id;
    this.mealService.getValid(this.selectedShift, this.selectedDate);
  }

  changeDates(days: number) {
    for (var i = 0; i < this.dates.length; i++) {
      if (this.dates[i].hidden === false && (days + i) >= 0 && (days + i) < this.dates.length) {
        this.generateHiddenDates(days, i);
        break;
      }
    }
  }

  generateHiddenDates(days: number, startingIndex: number) {
    this.dates = this.dates.map(function (val, index) {
      val.hidden = true;
      return val;
    });

    for (var i = 0; i < Math.abs(days); i++) {
      this.dates[startingIndex + days].hidden = false;
      startingIndex++;
    }
  }

  createOrder(planId: number) {
    var order = new Order();
    order.shift = this.selectedShift;
    order.isDelivered = false;
    order.planId = planId;

    this.orderService.create(order).subscribe(data => {
      this.selectedPlan = planId;
    });
  }
}
