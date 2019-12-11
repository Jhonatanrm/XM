import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BulkInformationComponent} from './bulk-information/bulk-information.component';

const routes: Routes = [
  {
    path: '',
    component : BulkInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeptunoRoutingModule { }
