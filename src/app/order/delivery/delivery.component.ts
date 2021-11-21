import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateShift } from '../../shared/models/date-shift';
import { Order } from '../../shared/models/order';
import { OrderDelivery } from '../../shared/models/order-delivery';
import { MealService } from '../../shared/services/meal.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  selectedDate: string;
  selectedShift: number;
  rfid: string;
  currentOrder: OrderDelivery = null;
  @ViewChild("rfidField") rfidField: ElementRef;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  changedDateShiftSelection(selectedDateShift: DateShift) {
    this.selectedDate = selectedDateShift.date;
    this.selectedShift = selectedDateShift.shift;
    this.currentOrder = null;
    this.rfid = '';
  }

  getOrderByRfid() {
    this.orderService.getByRfid(this.rfid, this.selectedShift, this.selectedDate).subscribe(data => {
      this.currentOrder = data;
      if (data == null) {
        this.rfid = '';
        this.rfidField.nativeElement.focus();
      }
    });
  }

  deliveredOrder(orderId: number, softMealId: number) {
    this.orderService.delivered(orderId, softMealId).subscribe(data => {
      this.currentOrder = null;
      this.rfid = '';
      this.rfidField.nativeElement.focus();
    },
      err => {
        this.currentOrder = null;
        this.rfid = '';
        this.rfidField.nativeElement.focus();
      });
  }
}
