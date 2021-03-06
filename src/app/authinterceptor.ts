import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, EMPTY, } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from './shared/services/account.service';
import { LoaderService } from './shared/services/loader.service';
import { NotifierService } from './shared/services/notifier.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private accountService: AccountService, private loaderService: LoaderService, private notifierService: NotifierService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    var token = localStorage.getItem('token');

    //if (req.url.indexOf('plan/exporttoexcel') == -1) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    //}
    //else {
    //  req = req.clone({ headers: req.headers.set('Content-Type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") });   
    //}

    req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
        }
        else {
          switch (error.status) {
            case 401:      //login
              this.accountService.logout();
              this.router.navigateByUrl("account/loginrfid");
              break;
            case 403:     //forbidden
              this.router.navigateByUrl("account/unauthorized");
              break;
            case 400:
              this.notifierService.notificationConfig.next({ type: 'error', message: error.error });
              break;
          }

          // If you want to return a new response:
          //return of(new HttpResponse({body: [{name: "Default value..."}]}));

          // If you want to return the error on the upper level:
          //return throwError(error);

          // or just return nothing:
          return EMPTY;
        }
      }),
      finalize(() => this.loaderService.isLoading.next(false))
    );
  }
}
