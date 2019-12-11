import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosTransmisionComponent } from './activos-transmision.component';

const routes: Routes = [
  {
    path: ':id',
    component : ActivosTransmisionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivosTransmisionRoutingModule { }
