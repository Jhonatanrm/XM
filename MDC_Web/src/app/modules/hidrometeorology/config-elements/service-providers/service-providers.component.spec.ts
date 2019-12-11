import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvidersComponent } from './service-providers.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceProvidersComponent', () => {
  let component: ServiceProvidersComponent;
  let fixture: ComponentFixture<ServiceProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProvidersComponent ],
      imports: [ FormsModule, CommonModule, NgSelectModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
