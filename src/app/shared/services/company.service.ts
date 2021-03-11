import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { BehaviorSubject } from 'rxjs';
import { Company } from '../models/company';
import { CompanyName } from '../models/company-name';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  baseUrl: string = '';

  public showDeletePopUpById = new BehaviorSubject(0);
  public showCreateEditPopUpById = new BehaviorSubject(-1);

  private companyToEditSource = new BehaviorSubject<Company>({ id: -1, name: '' });
  companyToEditObs = this.companyToEditSource.asObservable();

  private companyGetAllSource = new BehaviorSubject<Company[]>([]);
  companyGetAllObs = this.companyGetAllSource.asObservable();

  private companyNameSource = new BehaviorSubject<string>('');
  companyNameObs = this.companyNameSource.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getApiURI();
  }

  getAll() {
    return this.http.get<Company[]>(this.baseUrl + "/company/getall").subscribe(data => {
      this.companyGetAllSource.next(data);
    });
  }

  getCompanyByIdForEdit(id: number) {
    this.http.get<Company>(this.baseUrl + "/company/getbyid?id=" + id).subscribe(data => {
      this.companyToEditSource.next(data);
      this.showCreateEditPopUpById.next(id);
    });
  }

  getName(id: string) {
    this.http.get<CompanyName>(this.baseUrl + "/company/getname?id=" + id).subscribe(data => {
      this.companyNameSource.next(data.name);
    });
  }

  setCompanyForCreate() {
    var company = new Company();
    company.id = 0;
    company.name = '';

    this.companyToEditSource.next(company);
    this.showCreateEditPopUpById.next(0);
  }

  create(company: Company) {
    return this.http.post(this.baseUrl + "/company/add", company);
  }

  edit(company: Company) {
    return this.http.post(this.baseUrl + "/company/update", company);
  }

  delete(id: number) {
    return this.http.get(this.baseUrl + "/company/delete?id=" + id);
  }
}
