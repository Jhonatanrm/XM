import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeptunoRoutingModule } from './neptuno-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BulkInformationComponent } from './bulk-information/bulk-information.component';
import { ExternalFileComponent } from './external-file/external-file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { ManualInformationComponent } from './manual-information/manual-information.component';
import { NepOnlyNumbersDirective } from './nep-only-numbers.directive';

@NgModule({
  declarations: [
    BulkInformationComponent,
    ExternalFileComponent,
    UploadFileComponent,
    ResultModalComponent,
    ManualInformationComponent,
    NepOnlyNumbersDirective
  ],
  entryComponents: [ResultModalComponent],
  imports: [
    CommonModule,
    NeptunoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NeptunoModule {
}
