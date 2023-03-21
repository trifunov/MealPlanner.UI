import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeGetByCompanyIdRequest } from '../models/employee-get-by-company-id-request';
import { Order } from '../models/order';
import { User } from '../models/user';
import { UserEmployeePagination } from '../models/user-employee-pagination';
import { UserEmployee } from '../models/useremployee';
import { ConfigService } from './config.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = '';
  public showCreateEditPopUpById = new BehaviorSubject(-1);
  public showResetPasswordPopUp = new BehaviorSubject('');

  private employeeToEditSource = new BehaviorSubject<UserEmployee>({ id: -1, companyId: 0, companyName: '', rfid: '', username: '', email: '', password: '', role: '', userId: '' });
  employeeToEditObs = this.employeeToEditSource.asObservable();

  private userToResetPasswordSource = new BehaviorSubject<User>({ username: '', password: '', userId: '' });
  userToResetPasswordObs = this.userToResetPasswordSource.asObservable();

  private employeesSource = new BehaviorSubject<UserEmployee[]>([]);
  employeesObs = this.employeesSource.asObservable();

  private employeesPagedSource = new BehaviorSubject<UserEmployeePagination>({ userEmployees: [], totalRows: 0 });
  employeesPagedObs = this.employeesPagedSource.asObservable();

  private employeesFromTokenSource = new BehaviorSubject<UserEmployee[]>([]);
  employeesFromTokenObs = this.employeesFromTokenSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getUsersUnemployeed() {
    return this.http.get<UserEmployee[]>(this.baseUrl + "/employee/GetUsersWithoutEmployee").subscribe(data => {
      this.employeesSource.next(data);
    });
  }

  getByCompanyId(request: EmployeeGetByCompanyIdRequest) {
    return this.http.get<UserEmployeePagination>(this.baseUrl + "/employee/GetByCompanyId?companyId=" + request.companyId + "&employeeName=" + request.employeeName + "&page=" + request.page + "&itemsPerPage=" + request.itemsPerPage + "&paged=" + request.paged).subscribe(data => {
      this.employeesPagedSource.next(data);
    });
  }

  getByCompanyIdFromToken() {
    return this.http.get<UserEmployee[]>(this.baseUrl + "/employee/GetByCompanyIdFromToken").subscribe(data => {
      this.employeesFromTokenSource.next(data);
    });
  }

  getEmployeeByIdForEdit(id: number) {
    this.http.get<UserEmployee>(this.baseUrl + "/employee/getbyid?id=" + id).subscribe(data => {
      this.employeeToEditSource.next(data);
      this.showCreateEditPopUpById.next(id);
    });
  }

  setEmployeeForCreate(companyId: number) {
    var employee = new UserEmployee();
    employee.rfid = '';
    employee.companyId = companyId;
    employee.role = "";
    employee.email = "";
    employee.password = "";
    employee.userId = "";

    this.employeeToEditSource.next(employee);
    this.showCreateEditPopUpById.next(0);
  }

  setUserForResetPassword(employee: UserEmployee) {
    var user = new User();
    user.userId = employee.userId;
    user.username = employee.username;
    user.password = employee.password;

    this.userToResetPasswordSource.next(user);
    this.showResetPasswordPopUp.next(employee.userId);
  }

  create(employee: UserEmployee) {
    return this.http.post(this.baseUrl + "/employee/add", employee);
  }

  edit(employee: UserEmployee) {
    return this.http.post(this.baseUrl + "/employee/update", employee);
  }

  delete(id: number, userId: string) {
    return this.http.get(this.baseUrl + "/employee/delete?id=" + id + "&userId=" + userId);
  }

  resetPassword(user: User) {
    return this.http.get(this.baseUrl + "/employee/resetPassword?userId=" + user.userId + "&password=" + user.password);
  }

  exportToExcel(request: EmployeeGetByCompanyIdRequest) {
    return this.http.get<UserEmployeePagination>(this.baseUrl + "/employee/GetByCompanyId?companyId=" + request.companyId + "&employeeName=" + request.employeeName + "&page=" + request.page + "&itemsPerPage=" + request.itemsPerPage + "&paged=" + request.paged).subscribe(data => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.userEmployees);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const file: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      FileSaver.saveAs(file, 'Employees_' + request.companyId + '_' + new Date().getTime() + '.xlsx');
    });
  }
}
