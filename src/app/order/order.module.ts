import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../shared/services/order.service';



@NgModule({
  declarations: [CreateOrderComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [OrderService],
  bootstrap: [CreateOrderComponent]
})
export class OrderModule { }
