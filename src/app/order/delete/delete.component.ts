import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  showDeletePopUpById: number;

  constructor(private orderService: OrderService) {
    this.orderService.showDeletePopUpById.subscribe((data) => {
      this.showDeletePopUpById = data;
    });}

  ngOnInit(): void {
  }

  proceed(toDelete: boolean) {
    if (toDelete === true) {
      this.orderService.delete(this.showDeletePopUpById).subscribe(data => {
        this.orderService.refreshOrderList.next(true);
      });
    }
    this.orderService.showDeletePopUpById.next(0);
  }
}
