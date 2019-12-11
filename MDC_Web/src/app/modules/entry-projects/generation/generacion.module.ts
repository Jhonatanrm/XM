import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneracionRoutingModule } from './generacion-routing.module';
import { GeneracionComponent } from './generacion.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SharedModule } from '@shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [GeneracionComponent, CreateProjectComponent],
  imports: [
    CommonModule,
    GeneracionRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class GeneracionModule { }
