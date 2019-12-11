import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigElementsComponent } from './config-elements.component';
import { VariablesComponent } from '../variables/variables.component';
import { ParametersComponent } from '../parameters/parameters.component';
import { ServiceProvidersComponent } from '../service-providers/service-providers.component';
import { TypeElementsComponent } from '../type-elements/type-elements.component';
import { ChunkArrayPipe } from '@shared/pipes/chunk-array.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfigElementsComponent', () => {
  let component: ConfigElementsComponent;
  let fixture: ComponentFixture<ConfigElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigElementsComponent,
        VariablesComponent,
        ParametersComponent,
        ServiceProvidersComponent,
        TypeElementsComponent,
        ChunkArrayPipe
      ],
      imports: [
        FormsModule,
        CommonModule,
        NgSelectModule,
        NgbModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
