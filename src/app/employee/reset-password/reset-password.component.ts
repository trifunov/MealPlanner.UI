import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeGetByCompanyIdRequest } from '../../shared/models/employee-get-by-company-id-request';
import { User } from '../../shared/models/user';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-employee-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  showResetPasswordPopUp: string;
  successfulSave: boolean;

  username: string = "";
  password: string = "";
  userId: string = "";

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {
    this.employeeService.showResetPasswordPopUp.subscribe(data => {
      this.showResetPasswordPopUp = data;
    });

    this.employeeService.userToResetPasswordObs.subscribe(data => {
      this.username = data.username;
      this.password = data.password;
      this.userId = data.userId;
    });
  }

  ngOnInit(): void {
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var user = new User();
      user.username = this.username;
      user.password = this.password;
      user.userId = this.userId;

      this.employeeService.resetPassword(user).subscribe(data => {
        var request = new EmployeeGetByCompanyIdRequest();
        request.companyId = this.route.snapshot.queryParamMap.get('companyId');
        request.employeeName = '';
        request.page = 1;
        request.itemsPerPage = 20;
        request.paged = true;
        this.employeeService.getByCompanyId(request);
      });
    }

    this.employeeService.showResetPasswordPopUp.next('');
  }
}
