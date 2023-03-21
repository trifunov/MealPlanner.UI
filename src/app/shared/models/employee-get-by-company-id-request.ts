export class EmployeeGetByCompanyIdRequest {
  companyId: string;
  employeeName: string = '';
  page: number = 1;
  itemsPerPage: number = 20;
  paged: boolean = false
}
