import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivosGeneracionRoutingModule } from './activos-generacion-routing.module';
import { ActivosGeneracionComponent } from './activos-generacion.component';
import { PlantasolarComponent } from './plantasolar/plantasolar.component';
import { PlantatermicaComponent } from './plantatermica/plantatermica.component';

@NgModule({
  declarations: [
    ActivosGeneracionComponent,
    PlantasolarComponent,
    PlantatermicaComponent],
  imports: [
    CommonModule,
    ActivosGeneracionRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ActivosGeneracionModule { }
