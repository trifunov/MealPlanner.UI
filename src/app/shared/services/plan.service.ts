import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Plan } from '../models/plan';
import { PlanReportDetailedRequest } from '../models/plan-report-detailed-request';
import { PlanReportDetailedResponse } from '../models/plan-report-detailed-response';
import { PlanReportRequest } from '../models/plan-report-request';
import { PlanReportResponse } from '../models/plan-report-response';
import { ConfigService } from './config.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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
    date: moment().format('YYYY-MM-DD'),
    editableFrom: moment().format('YYYY-MM-DD'),
    editableTo: moment().format('YYYY-MM-DD'),
    companyId: -1,
    mealIds: [],
    totalMeals: 0
  });
  planToEditObs = this.planToEditSource.asObservable();

  private planGetByCompanyIdSource = new BehaviorSubject<Plan[]>([]);
  planGetByCompanyIdObs = this.planGetByCompanyIdSource.asObservable();

  private planGetReportsSource = new BehaviorSubject<PlanReportResponse[]>([]);
  planGetReportsObs = this.planGetReportsSource.asObservable();

  private planGetDetailedReportsSource = new BehaviorSubject<PlanReportDetailedResponse[]>([]);
  planGetDetailedReportsObs = this.planGetDetailedReportsSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getByCompanyId() {
    return this.http.get<Plan[]>(this.baseUrl + "/plan/getbycompanyid").subscribe(data => {
      this.planGetByCompanyIdSource.next(data);
    });
  }

  getReports(request: PlanReportRequest) {
    return this.http.post<PlanReportResponse[]>(this.baseUrl + "/plan/getreports", request).subscribe(data => {
      this.planGetReportsSource.next(data);
    });
  }

  getDetailedReports(request: PlanReportDetailedRequest) {
    return this.http.post<PlanReportDetailedResponse[]>(this.baseUrl + "/plan/getdetailedreports", request).subscribe(data => {
      this.planGetDetailedReportsSource.next(data);
    });
  }

  exportToExcel(request: PlanReportRequest) {
    return this.http.post<PlanReportResponse[]>(this.baseUrl + "/plan/getreports", request).subscribe(data => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const file: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      FileSaver.saveAs(file, request.companyId + '_' + this.convertDateStringToMomentString(request.fromDate) + '_' + this.convertDateStringToMomentString(request.toDate) + '_' + new Date().getTime() + '.xlsx');
    });
  }

  exportToExcelDetailed(request: PlanReportDetailedRequest) {
    return this.http.post<PlanReportDetailedResponse[]>(this.baseUrl + "/plan/getdetailedreports", request).subscribe(data => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const file: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      FileSaver.saveAs(file, request.companyId + '_' + this.convertDateStringToMomentString(request.fromDate) + '_' + this.convertDateStringToMomentString(request.toDate) + '_' + request.shift + '_' + request.delivered + '_' + new Date().getTime() + '.xlsx');
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

  convertDateToMomentString(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  convertDateStringToMomentString(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}
