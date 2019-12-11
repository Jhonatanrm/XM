import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsOperationComponent } from './assets-operation.component';

const routes: Routes = [
  {
    path: '',
    component: AssetsOperationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsOperationRoutingModule { }
