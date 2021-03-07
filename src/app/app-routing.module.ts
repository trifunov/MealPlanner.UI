import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ListComponent } from './company/list/list.component';
import { ListEmployeeComponent } from './employee/list/list.component';
import { ListMealComponent } from './meal/list/list.component';
import { CreateOrderComponent } from './order/create/create.component';
import { CreateeditPlanComponent } from './plan/createedit/createedit.component';
import { ListPlanComponent } from './plan/list/list.component';


const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'company/list', component: ListComponent },
  { path: 'employee/list', component: ListEmployeeComponent },
  { path: 'meal/list', component: ListMealComponent },
  { path: 'plan/list', component: ListPlanComponent },
  { path: 'plan/createedit', component: CreateeditPlanComponent },
  { path: 'order/create', component: CreateOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
