import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { LoaderComponent } from './loader/loader/loader.component';
import { AccountModule } from './account/account.module';
import { CompanyModule } from './company/company.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from './shared/services/config.service';
import { AuthInterceptor } from './authinterceptor';
import { FormsModule } from '@angular/forms';
import { EmployeeModule } from './employee/employee.module';
import { MealModule } from './meal/meal.module';
import { PlanModule } from './plan/plan.module';
import { OrderModule } from './order/order.module';
import { NotifierComponent } from './notifier/notifier/notifier.component';
import { PaginationModule } from './pagination/pagination.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    NotifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AccountModule,
    CompanyModule,
    EmployeeModule,
    MealModule,
    PlanModule,
    OrderModule,
    PaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
