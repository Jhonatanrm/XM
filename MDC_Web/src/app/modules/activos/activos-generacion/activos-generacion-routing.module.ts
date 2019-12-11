import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosGeneracionComponent } from './activos-generacion.component';

const routes: Routes = [
  {
    path: ':id',
    component : ActivosGeneracionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivosGeneracionRoutingModule { }
