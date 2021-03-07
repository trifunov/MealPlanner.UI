import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  //getByCompanyId() {
  //  return this.http.get<Plan[]>(this.baseUrl + "/plan/getbycompanyid").subscribe(data => {
  //    this.planGetByCompanyIdSource.next(data);
  //  });
  //}

  create(order: Order) {
    return this.http.post(this.baseUrl + "/order/add", order);
  }

  edit(order: Order) {
    return this.http.post(this.baseUrl + "/order/update", order);
  }

  delete(id: number) {
    return this.http.get(this.baseUrl + "/order/delete?id=" + id);
  }
}
