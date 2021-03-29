import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../shared/services/order.service';
import { DeliveryComponent } from './delivery/delivery.component';
import { ListOrderComponent } from './list/list.component';
import { DateShiftSelectComponent } from './date-shift-select/date-shift-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { DpDatePickerModule } from 'ng2-date-picker';
import { OrderCreateEditFromListComponent } from './create-edit-from-list/create-edit-from-list.component';
import { DeleteComponent } from './delete/delete.component';



@NgModule({
  declarations: [CreateOrderComponent, DeliveryComponent, ListOrderComponent, DateShiftSelectComponent, OrderCreateEditFromListComponent, DeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    DpDatePickerModule 
  ],
  providers: [OrderService],
  bootstrap: [CreateOrderComponent]
})
export class OrderModule { }
