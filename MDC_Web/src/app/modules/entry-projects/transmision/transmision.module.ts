import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TransmisionRoutingModule } from './transmision-routing.module';
import { TransmisionComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './transmision.component';
import { RequirementsTransmisionComponent } from './requirements-transmision/requirements-transmision.component';
import { SinglelineDiagramComponent } from './singleline-diagram/singleline-diagram.component';
import { EditStateModalService } from '@shared/services/proyect-entry/edit-state-modal.service';
import { JustificationModalComponent } from './justification-modal/justification-modal.component';
import { LayoutEntryOperationComponent } from './layout-entry-operation/layout-entry-operation.component';
@NgModule({
  declarations: [TransmisionComponent,
    ProjectListComponent,
    RequirementsTransmisionComponent,
    SinglelineDiagramComponent,
    JustificationModalComponent,
    LayoutEntryOperationComponent
  ],
  imports: [
    CommonModule,
    TransmisionRoutingModule,
    SharedModule,
    NgSelectModule
  ],
  entryComponents: [
    JustificationModalComponent
  ],
  providers: [
    EditStateModalService
  ]
})
export class TransmisionModule { }
