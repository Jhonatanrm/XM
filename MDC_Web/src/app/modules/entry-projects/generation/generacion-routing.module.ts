import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneracionComponent } from  './generacion.component'
import { CreateProjectComponent } from './create-project/create-project.component';

const routes: Routes = [

  {
    path: '',
    component : GeneracionComponent
  },
  {
    path: 'createProject',
    component : CreateProjectComponent
  },
  {
    path: 'createProject/:id',
    component : CreateProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneracionRoutingModule { }
