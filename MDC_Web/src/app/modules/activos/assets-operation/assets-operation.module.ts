import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsOperationRoutingModule } from './assets-operation-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AssetsOperationComponent } from './assets-operation.component';
import { FilterAssetsOperationComponent } from './filter-assets-operation/filter-assets-operation.component';
import { TableAssetsOperationComponent } from './table-assets-operation/table-assets-operation.component';

@NgModule({
  declarations: [
    AssetsOperationComponent,
    FilterAssetsOperationComponent,
    TableAssetsOperationComponent
  ],
  imports: [
    CommonModule,
    AssetsOperationRoutingModule,
    SharedModule
  ]
})
export class AssetsOperationModule { }
