import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardChgPrmComponent } from './change-parameters/dashboard-chg-prm/dashboard-chg-prm.component';


const routes: Routes = [
  {
    path: '',
    component : DashboardComponent
  },
  {
    path: ':id',
    component : DashboardChgPrmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequirementsRoutingModule { }
