import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransmisionComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './transmision.component';
import { RequirementsTransmisionComponent } from './requirements-transmision/requirements-transmision.component';
import { SinglelineDiagramComponent } from './singleline-diagram/singleline-diagram.component';
import { LayoutEntryOperationComponent } from './layout-entry-operation/layout-entry-operation.component';
const routes: Routes = [
  {
    path: '',
    component : ProjectListComponent
  },
  {
    path: 'createProject',
    component : TransmisionComponent
  },
  {
    path: 'createProject/:id',
    component : TransmisionComponent
  },
  {
    path: 'requirementsProject/:id',
    component : RequirementsTransmisionComponent
  },
  {
    path: 'singleLineDiagram/:id',
    component : SinglelineDiagramComponent
  },
  {
    path: 'layoutEntryOperation/:id/:stage',
    component : LayoutEntryOperationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransmisionRoutingModule { }
