import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';
import { UserEmployee } from '../models/useremployee';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = '';
  public showCreateEditPopUpById = new BehaviorSubject(-1);

  private employeeToEditSource = new BehaviorSubject<UserEmployee>({ id: -1, companyId: 0, companyName: '', rfid: '', userId: '', username: '' });
  employeeToEditObs = this.employeeToEditSource.asObservable();

  private employeesSource = new BehaviorSubject<UserEmployee[]>([]);
  employeesObs = this.employeesSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getUsersUnemployeed() {
    return this.http.get<UserEmployee[]>(this.baseUrl + "/employee/GetUsersWithoutEmployee").subscribe(data => {
      this.employeesSource.next(data);
    });
  }

  getByCompanyId(companyId: string) {
    return this.http.get<UserEmployee[]>(this.baseUrl + "/employee/GetByCompanyId?companyId=" + companyId).subscribe(data => {
      this.employeesSource.next(data);
    });
  }

  getEmployeeByIdForEdit(id: number) {
    this.http.get<UserEmployee>(this.baseUrl + "/employee/getbyid?id=" + id).subscribe(data => {
      this.employeeToEditSource.next(data);
      this.showCreateEditPopUpById.next(id);
    });
  }

  setEmployeeForCreate(userId: string) {
    var employee = new UserEmployee();
    employee.rfid = '';
    employee.companyId = 0;
    employee.userId = userId;

    this.employeeToEditSource.next(employee);
    this.showCreateEditPopUpById.next(0);
  }

  create(employee: Employee) {
    return this.http.post(this.baseUrl + "/employee/add", employee);
  }

  edit(employee: Employee) {
    return this.http.post(this.baseUrl + "/employee/update", employee);
  }
}
