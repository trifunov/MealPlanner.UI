import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Plan } from '../models/plan';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  baseUrl: string = '';

  public showDeletePopUpByIds = new BehaviorSubject([0]);

  private planToEditSource = new BehaviorSubject<Plan>({
    ids: [],
    shifts: [],
    shiftNames: [],
    activeFrom: moment().format('YYYY-MM-DD'),
    activeTo: moment().format('YYYY-MM-DD'),
    editableFrom: moment().format('YYYY-MM-DD'),
    editableTo: moment().format('YYYY-MM-DD'),
    companyId: -1,
    mealIds: [],
    totalMeals: 0
  });
  planToEditObs = this.planToEditSource.asObservable();

  private planGetByCompanyIdSource = new BehaviorSubject<Plan[]>([]);
  planGetByCompanyIdObs = this.planGetByCompanyIdSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getByCompanyId() {
    return this.http.get<Plan[]>(this.baseUrl + "/plan/getbycompanyid").subscribe(data => {
      this.planGetByCompanyIdSource.next(data);
    });
  }

  getByIds(ids: number[]) {
    return this.http.post<Plan>(this.baseUrl + "/plan/getbyids", ids).subscribe(data => {
      this.planToEditSource.next(data);
    });
  }

  create(plan: Plan) {
    return this.http.post(this.baseUrl + "/plan/add", plan);
  }

  delete(ids: number[]) {
    return this.http.post(this.baseUrl + "/plan/delete", ids);
  }
}
