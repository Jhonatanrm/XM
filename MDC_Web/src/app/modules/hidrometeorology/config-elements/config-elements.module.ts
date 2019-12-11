import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigElementsRoutingModule } from './config-elements-routing.module';
import { ConfigElementsComponent } from './config-elements/config-elements.component';
import { ServiceProvidersComponent } from './service-providers/service-providers.component';
import { ParametersComponent } from './parameters/parameters.component';
import { VariablesComponent } from './variables/variables.component';
import { TypeElementsComponent } from './type-elements/type-elements.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ConfigElementsComponent, ServiceProvidersComponent, ParametersComponent, VariablesComponent, TypeElementsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfigElementsRoutingModule,
    SharedModule
  ]
})
export class ConfigElementsModule { }
