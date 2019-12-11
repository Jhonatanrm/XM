import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigElementsComponent } from './config-elements/config-elements.component';

const routes: Routes = [
  {
    path: '',
    component : ConfigElementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigElementsRoutingModule { }
