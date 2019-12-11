import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WaitComponent } from './components/wait/wait.component';
import { NgSelectComponent } from './components/ng-select/ng-select.component';
import { StagesComponent } from './components/stages/stages.component';
import { ProjectPipe } from './pipes/project-pipe/project-pipe.pipe';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { LineaCrearComponent } from 'app/modules/activos/activos-transmision/linea/linea-crear/linea-crear.component';
import { ValidateComponent } from './components/validate/validate.component';
import { BarraCrearComponent } from 'app/modules/activos/activos-transmision/subestacion/barra-crear/barra-crear.component';
// tslint:disable-next-line: max-line-length
import { BahiaSeccionamientoCrearComponent } from 'app/modules/activos/activos-transmision/subestacion/bahia-seccionamiento-crear/bahia-seccionamiento-crear.component';
// tslint:disable-next-line: max-line-length
import { BahiaAcopleCrearComponent } from 'app/modules/activos/activos-transmision/subestacion/bahia-acople-crear/bahia-acople-crear.component';
// tslint:disable-next-line: max-line-length
import { BahiaCorteCentralCrearComponent } from 'app/modules/activos/activos-transmision/subestacion/bahia-corte-central-crear/bahia-corte-central-crear.component';
// tslint:disable-next-line: max-line-length
import { BahiaTransferenciaCrearComponent } from 'app/modules/activos/activos-transmision/subestacion/bahia-transferencia-crear/bahia-transferencia-crear.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
// tslint:disable-next-line: max-line-length
import { SubestacionCrearComponent } from 'app/modules/activos/activos-transmision/subestacion/subestacion-crear/subestacion-crear.component';
import { DashboardDetailComponent } from './components/dashboard-detail/dashboard-detail.component';
// tslint:disable-next-line: max-line-length
import { SubestacionConfiguracionComponent } from 'app/modules/activos/activos-transmision/subestacion/subestacion-configuracion/subestacion-configuracion.component';
import { MatSortModule } from '@angular/material';

import { TableXmComponent } from './components/table-xm/table-xm.component';
import { CdkTableModule } from '@angular/cdk/table';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { SubstationTablePipe } from '@shared/pipes/subestation-table-pipe/subTable-pipe.pipe';
import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
import { TraductionPipe } from './pipes/traduction-pipe/traduction-pipe.pipe';
import { UploadXmComponent } from './components/upload-xm/upload-xm.component';
import { ModalViewFileXmComponent } from './components/modal-view-file-xm/modal-view-file-xm.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NumberFloatInputDirective } from './directives/number-float-input.directive';
import { IntegersNumberDirective } from './directives/integers-numbers-only.directive';
import { NaturalNumberDirective } from './directives/natural-numbers-only.directive';
import { SlicePipePipe } from './pipes/slice-pipe/slice-pipe.pipe';
import { EditStateModalComponent } from '@shared/components/edit-state-modal/edit-state-modal.component';
import { SplitCameCasePipe } from './pipes/split-came-case/split-came-case.pipe';
import { SplitUnderscorePipe } from './pipes/split-underscore/split-underscore.pipe';
import { ChunkArrayPipe } from './pipes/chunk-array.pipe';
import { ChgParameterTablePipe } from './pipes/chg-parameter-table-pipe/chgParameterTable-pipe.pipe';


@NgModule({
  declarations: [
    WaitComponent,
    NgSelectComponent,
    ModalFormComponent,
    SubestacionCrearComponent,
    ProjectPipe,
    LineaCrearComponent,
    BarraCrearComponent,
    BahiaSeccionamientoCrearComponent,
    BahiaAcopleCrearComponent,
    BahiaCorteCentralCrearComponent,
    BahiaTransferenciaCrearComponent,
    StagesComponent,
    ValidateComponent,
    DashboardDetailComponent,
    NumberFloatInputDirective,
    BlockCopyPasteDirective,
    TableXmComponent,
    NgbdSortableHeader,
    SubestacionConfiguracionComponent,
    SubstationTablePipe,
    LowercaseFormsPipe,
    TraductionPipe,
    UploadXmComponent,
    ModalViewFileXmComponent,
    SafeHtmlPipe,
    IntegersNumberDirective,
    NaturalNumberDirective,
    SlicePipePipe,
    EditStateModalComponent,
    SlicePipePipe,
    SplitCameCasePipe,
    SplitUnderscorePipe,
    ChunkArrayPipe,
    ChgParameterTablePipe
  ],
  entryComponents: [
    ModalViewFileXmComponent,
    EditStateModalComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatSortModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    WaitComponent,
    NgSelectComponent,
    StagesComponent,
    ProjectPipe,
    ValidateComponent,
    ModalFormComponent,
    DashboardDetailComponent,
    NumberFloatInputDirective,
    BlockCopyPasteDirective,
    StagesComponent,
    CdkTableModule,
    TableXmComponent,
    NgbdSortableHeader,
    SubestacionConfiguracionComponent,
    MatSortModule,
    SubstationTablePipe,
    LowercaseFormsPipe,
    TraductionPipe,
    UploadXmComponent,
    ModalViewFileXmComponent,
    IntegersNumberDirective,
    NaturalNumberDirective,
    EditStateModalComponent,
    NaturalNumberDirective,
    SplitCameCasePipe,
    SplitUnderscorePipe,
    ChunkArrayPipe,
    ChgParameterTablePipe
  ]
})
export class SharedModule { }
