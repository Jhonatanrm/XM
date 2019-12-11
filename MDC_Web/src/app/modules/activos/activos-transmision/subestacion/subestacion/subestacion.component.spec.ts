/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubestacionComponent } from './subestacion.component';
import { SubestacionTableroComponent } from '../subestacion-tablero/subestacion-tablero.component';
import { DashboardDetailComponent } from '@shared/components/dashboard-detail/dashboard-detail.component';
import { ModalFormComponent } from '@shared/components/modal-form/modal-form.component';
import { SubestacionListarComponent } from '../subestacion-listar/subestacion-listar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubestacionCrearComponent } from '../subestacion-crear/subestacion-crear.component';
import { BarraCrearComponent } from '../barra-crear/barra-crear.component';
import { BahiaCorteCentralCrearComponent } from '../bahia-corte-central-crear/bahia-corte-central-crear.component';
import { BahiaSeccionamientoCrearComponent } from '../bahia-seccionamiento-crear/bahia-seccionamiento-crear.component';
import { BahiaTransferenciaCrearComponent } from '../bahia-transferencia-crear/bahia-transferencia-crear.component';
import { BahiaAcopleCrearComponent } from '../bahia-acople-crear/bahia-acople-crear.component';
import { TableXmComponent } from '@shared/components/table-xm/table-xm.component';
import { LineaComponent } from '../../linea/linea/linea.component';
import { LineaCrearComponent } from '../../linea/linea-crear/linea-crear.component';
import { ValidateComponent } from '@shared/components/validate/validate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSortModule } from '@angular/material';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';
import { SubestationEditComponent } from '../subestation-edit/subestation-edit.component';
import { SimpleChange } from '@angular/core';

describe('SubestacionComponent', () => {
  let component: SubestacionComponent;
  let fixture: ComponentFixture<SubestacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubestacionComponent,
        SubestacionTableroComponent,
        SubestacionListarComponent,
        SubestationEditComponent
      ],
      imports: [
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatSortModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        ActivosTransmisionService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubestacionComponent);
    component = fixture.componentInstance;
    component.project = { projectName: 'NameProject' };
    component.asset = { assetId: 148 };
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
*/
