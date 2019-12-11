import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementsRoutingModule } from './requirements-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { DashboardChgPrmComponent } from './change-parameters/dashboard-chg-prm/dashboard-chg-prm.component';
import { TableChgPrmComponent } from './change-parameters/table-chg-prm/table-chg-prm.component';
import { JustificationChgPrmComponent } from './change-parameters/justification-chg-prm/justification-chg-prm.component';
import { ChangingPendingDateComponent } from './changing-pending-date/changing-pending-date.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FilterComponent,
    TableComponent,
    DashboardChgPrmComponent,
    TableChgPrmComponent,
    JustificationChgPrmComponent,
    ChangingPendingDateComponent],
  imports: [
    CommonModule,
    RequirementsRoutingModule,
    SharedModule,
  ]
})
export class RequirementsModule { }
