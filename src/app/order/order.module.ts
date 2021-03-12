import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../shared/services/order.service';
import { DeliveryComponent } from './delivery/delivery.component';
import { ListOrderComponent } from './list/list.component';
import { DateShiftSelectComponent } from './date-shift-select/date-shift-select.component';



@NgModule({
  declarations: [CreateOrderComponent, DeliveryComponent, ListOrderComponent, DateShiftSelectComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [OrderService],
  bootstrap: [CreateOrderComponent]
})
export class OrderModule { }
