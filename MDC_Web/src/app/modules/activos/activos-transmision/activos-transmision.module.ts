import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '@shared/shared.module';

import { ActivosTransmisionRoutingModule } from './activos-transmision-routing.module';
import { ActivosTransmisionComponent } from './activos-transmision.component';
import { LineaComponent } from './linea/linea/linea.component';
import { SubestacionComponent } from './subestacion/subestacion/subestacion.component';
import { SubestacionListarComponent } from './subestacion/subestacion-listar/subestacion-listar.component';
import { SubestacionTableroComponent } from './subestacion/subestacion-tablero/subestacion-tablero.component';

@NgModule({
  declarations: [
    ActivosTransmisionComponent,
    LineaComponent,
    SubestacionComponent,
    SubestacionListarComponent,
    SubestacionTableroComponent
  ],
  imports: [
    CommonModule,
    ActivosTransmisionRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule
  ]
})
export class ActivosTransmisionModule { }
