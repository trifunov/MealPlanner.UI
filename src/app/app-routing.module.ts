import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRfidComponent } from './account/login-rfid/login-rfid.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { UnauthorizedComponent } from './account/unauthorized/unauthorized.component';
import { ListComponent } from './company/list/list.component';
import { ListEmployeeComponent } from './employee/list/list.component';
import { ListMealComponent } from './meal/list/list.component';
import { CreateOrderComponent } from './order/create/create.component';
import { DeliveryComponent } from './order/delivery/delivery.component';
import { ListOrderComponent } from './order/list/list.component';
import { CreateeditPlanComponent } from './plan/createedit/createedit.component';
import { ListPlanComponent } from './plan/list/list.component';


const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/loginrfid', component: LoginRfidComponent },
  { path: 'account/unauthorized', component: UnauthorizedComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'company/list', component: ListComponent },
  { path: 'employee/list', component: ListEmployeeComponent },
  { path: 'meal/list', component: ListMealComponent },
  { path: 'plan/list', component: ListPlanComponent },
  { path: 'plan/createedit', component: CreateeditPlanComponent },
  { path: 'order/create', component: CreateOrderComponent },
  { path: 'order/list', component: ListOrderComponent },
  { path: 'order/delivery', component: DeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
