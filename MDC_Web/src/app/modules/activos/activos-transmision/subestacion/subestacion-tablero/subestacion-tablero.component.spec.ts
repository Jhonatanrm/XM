import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubestacionTableroComponent } from './subestacion-tablero.component';
import { SharedModule } from '@shared/shared.module';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { TransmisionAssetsMockService } from '@shared/unit-test/mocks/transmision-assets-mock.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs';

describe('SubestacionTableroComponent', () => {
  let component: SubestacionTableroComponent;
  let fixture: ComponentFixture<SubestacionTableroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [SubestacionTableroComponent],
      providers: [
        {
          provide: ActivosTransmisionService, useClass: TransmisionAssetsMockService
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubestacionTableroComponent);
    component = fixture.componentInstance;
    component.loadSubestation = false;
    component.loadSectionBar = false;
    fixture.detectChanges();
  });

  it('Should create component with stages ', () => {
    component.project = {
      hasStages: true,
      projectName: 'Nombre proyecto',
      stages: [
        {
          id: 1,
          stageOrder: 1,
        },
        {
          id: 2,
          stageOrder: 2,
        },
        {
          id: 3,
          stageOrder: 3,
        }
      ]
    };
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });

  it('Should create component without stages', () => {
    component.project = {
      hasStages: false,
      projectName: 'Nombre proyecto',
      stages: [
        {
          id: 1,
          stageOrder: 1,
        }
      ]
    };
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });

  it('Should see alert message error getAssetsCountBk', () => {
    spyOn(console, 'error');
    spyOn(component.getServiceActivosService(), 'getAssetsCountBk').and.returnValue(
      throwError({
        errors: null,
        message: 'No data found',
        statusCode: 404
      }));

    component.setSectionBarCount();
    component.setSubestationCount();
    expect(console.error).toHaveBeenCalledWith('No data found');
  });
});
