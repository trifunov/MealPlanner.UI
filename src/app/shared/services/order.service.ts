import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { OrderDelivery } from '../models/order-delivery';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = '';

  private selectedPlanSource = new BehaviorSubject<number>(0);
  selectedPlanObs = this.selectedPlanSource.asObservable();

  private currentOrderSource = new BehaviorSubject<OrderDelivery>(null);
  currentOrderObs = this.currentOrderSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  create(order: Order) {
    return this.http.post(this.baseUrl + "/order/add", order);
  }

  edit(order: Order) {
    return this.http.post(this.baseUrl + "/order/update", order);
  }

  delete(id: number) {
    return this.http.get(this.baseUrl + "/order/delete?id=" + id);
  }

  delivered(id: number) {
    return this.http.get(this.baseUrl + "/order/delivered?id=" + id);
  }

  getByDateAndShift(shift: number, date: string) {
    return this.http.post<number>(this.baseUrl + "/order/getByDateAndShift", { date: date, shift: shift }).subscribe(data => {
      this.selectedPlanSource.next(data);
    });
  }

  getByRfid(rfid: string, shift: number, date: string) {
    return this.http.post<OrderDelivery>(this.baseUrl + "/order/getByRfid", { rfid: rfid, date: date, shift: shift }).subscribe(data => {
      this.currentOrderSource.next(data);
    });
  }
}
