import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaComponent } from './linea.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';

describe('LineaComponent', () => {
  let component: LineaComponent;
  let fixture: ComponentFixture<LineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LineaComponent,
        ],
      imports: [
        NgbModule,
        CommonModule,
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
    fixture = TestBed.createComponent(LineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Linea', () => {
    expect(component).toBeTruthy();
  });

  it('should run onSumit funtion Linea', () => {
    component.onSubmit({});
    expect(component.formSubmit).toBeDefined();
  });
});

