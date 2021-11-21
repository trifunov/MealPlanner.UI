import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { OrderDelivery } from '../models/order-delivery';
import { OrderFilteredRequest } from '../models/order-filtered-request';
import { OrderFilteredResponse } from '../models/order-filtered-response';
import { OrderForEdit } from '../models/order-for-edit';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = '';

  public showDeletePopUpById = new BehaviorSubject(0);
  public showCreateEditPopUpById = new BehaviorSubject(-1);
  public refreshOrderList = new BehaviorSubject(false);

  private orderToEditSource = new BehaviorSubject<OrderForEdit>({ orderId: -1, shift: -1, date: '', planId: -1, employeeId: -1 });
  orderToEditObs = this.orderToEditSource.asObservable();

  private selectedPlanSource = new BehaviorSubject<number>(0);
  selectedPlanObs = this.selectedPlanSource.asObservable();

  private orderGetFilteredSource = new BehaviorSubject<OrderFilteredResponse[]>(null);
  orderGetFilteredObs = this.orderGetFilteredSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getOrderByIdForEdit(id: number) {
    this.http.get<OrderForEdit>(this.baseUrl + "/order/getbyid?id=" + id).subscribe(data => {
      this.orderToEditSource.next(data);
      this.showCreateEditPopUpById.next(id);
    });
  }

  setOrderForCreate() {
    var order = new OrderForEdit();
    order.orderId = 0;
    order.shift = -1;
    order.date = moment().format('YYYY-MM-DD');
    order.planId = -1;
    order.employeeId = -1;

    this.orderToEditSource.next(order);
    this.showCreateEditPopUpById.next(0);
  }

  create(order: Order) {
    return this.http.post<object>(this.baseUrl + "/order/add", order);
  }

  createFromList(order: OrderForEdit) {
    return this.http.post<object>(this.baseUrl + "/order/addFromList", order);
  }

  edit(order: Order) {
    return this.http.post(this.baseUrl + "/order/update", order);
  }

  editFromList(order: OrderForEdit) {
    return this.http.post<object>(this.baseUrl + "/order/editFromList", order);
  }

  delete(id: number) {
    return this.http.get(this.baseUrl + "/order/delete?id=" + id);
  }

  delivered(orderId: number, softMealId: number) {
    return this.http.get(this.baseUrl + "/order/delivered?orderId=" + orderId + "&softMealId=" + softMealId);
  }

  getByDateAndShift(shift: number, date: string) {
    return this.http.post<number>(this.baseUrl + "/order/getByDateAndShift", { date: date, shift: shift }).subscribe(data => {
      this.selectedPlanSource.next(data);
    });
  }

  getByRfid(rfid: string, shift: number, date: string) {
    return this.http.post<OrderDelivery>(this.baseUrl + "/order/getByRfid", { rfid: rfid, date: date, shift: shift });
  }

  getFiltered(request: OrderFilteredRequest) {
    return this.http.post<OrderFilteredResponse[]>(this.baseUrl + "/order/getfiltered", request).subscribe(data => {
      this.orderGetFilteredSource.next(data);
    });
  }
}
