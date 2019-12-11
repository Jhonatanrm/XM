import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CreateProjectComponent } from './create-project.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { PromoterMockService } from '@shared/unit-test/mocks/promoter-mock.service';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { GeneralTypesMockService } from '@shared/unit-test/mocks/generalTypes-mock.service';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { ActivosTransmisionMockService } from '@shared/unit-test/mocks/activostransmision-mock.service';
import { MessageService } from '@shared/services/message.service';
import { GenerationService } from '@shared/services/proyect-entry/generation.service';
import { GenerationMockService } from '@shared/unit-test/mocks/generation-mock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { MastereDataMockService } from '@shared/unit-test/mocks/master-mock.service';
import { DocumentsService } from '@shared/services/proyect-entry/documents.service';
import { DocumentsMockService } from '@shared/unit-test/mocks/documents-mock.service';
import { NgForm } from '@angular/forms';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [CreateProjectComponent],
      providers: [
        {
          provide: PromoterService,
          useClass: PromoterMockService
        },
        {
          provide: GeneralTypesService,
          useClass: GeneralTypesMockService
        },
        {
          provide: ActivosTransmisionService,
          useClass: ActivosTransmisionMockService
        },
        {
          provide: MessageService, useClass: MessageService
        },
        {
          provide: GenerationService, useClass: GenerationMockService
        },
        {
          provide: Router
        },
        {
          provide: NgbModal
        },
        {
          provide: NgbModal
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '1';
                },
              },
            },
          }
        },
        {
          provide: MastereDataService, useClass: MastereDataMockService
        },
        {
          provide: DocumentsService, useClass: DocumentsMockService
        }

      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CreateProjectComponent);
        component = fixture.componentInstance;
        component.isUnitTest = true;
      });
  }));

  beforeEach(() => {

    fixture.detectChanges();
  });

  it('should create generation form', () => {
    expect(component).toBeTruthy();
  });

  it('should fill init variables', () => {
    expect(component.promoterList).toBeDefined();
    expect(component.generationResourceList).toBeDefined();
    expect(component.productiveProcessList).toBeDefined();
    expect(component.productiveProcessList).toBeDefined();
    expect(component.typeCicleList).toBeDefined();
  });


  it('should replace values on subAreaListSelect', () => {
    const area = {
      code: 1
    };
    component.subAreaListSelect = [
      { code: '1' },
      { code: '2' }
    ];
    component.onSelectArea(area);
    expect(component.generationDTO.SubAreaID).toEqual(18);
  });


  it('should show general confirm and should equalize centProyect to capacityTransport value ' +
    'when onFirmEnergy is called', fakeAsync(async () => {
      const event = false;
      component.firmEnergy = true;
      component.dateOEF = { year: 2019, month: 2, day: 2 };
      component.cenProyect = 20;
      component.capacityTransport = 7;
      component.capacityOEF = 10;
      component.onFirmEnergy(event);
      const el: HTMLElement = fixture.nativeElement.nextElementSibling.querySelector('.swal2-confirm.swal2-styled');
      el.click();
      tick(7000);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.cenProyect).toEqual(10);
    }));

  it('should show general confirm and should equalize firmEnergy to true' +
    'when onFirmEnergy is called', fakeAsync(async () => {
      const event = false;
      component.capacityOEF = 3;
      component.onFirmEnergy(event);
      const el: HTMLElement = fixture.nativeElement.nextElementSibling.querySelector('.swal2-cancel.swal2-styled');
      el.click();
      tick(7000);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.firmEnergy).toBeTruthy();
    }));

  it('should do the false logic when onFirmEnergy is called', () => {
    const event = true;
    component.dateOEF = { year: 2020, month: 1, day: 1 };
    component.capacityOEF = 7;
    component.onFirmEnergy(event);
    expect(component.capacityOEF).toBeNull();
    expect(component.dateOEF).toBeNull();
  });

  it('should  setAssets method to be called', () => {
    expect(component.setAssets()).toBeUndefined();
  });



  it('should  onKeyDensidad accept 3 integer number', () => {
    component.density = '4444';
    const event: any = {
      key: "8",
    };
    component.onKeyDensidad(event, true);
    expect(component.density.length).toBeLessThan(4);
  });

  it('should  onKeyTemperature accept 2 integer positive number', () => {
    component.generationDTO = {};
    component.generationDTO.averageRoomTemperature = 54;
    component.onKeyTemperature();
    expect(component.temperatureEnviromentLength).toBeLessThan(3);
  });


  it('should  clearFieldsChildGenerationResource to be null any properties', () => {

    component.clearFieldsChildGenerationResource();
    expect(component.generationDTO.averageRoomTemperature).toBeNull();
    expect(component.generationDTO.windSpeed).toBeNull();
    expect(component.generationDTO.windDensity).toBeNull();
    expect(component.generationDTO.averageHorizontalGlobalIrradiation).toBeNull();
    expect(component.generationDTO.averagePanelIrradiation).toBeNull();
  });

  it('should call focusOut method', () => {
    const event = {
      srcElement: {
        name: true
      }
    };
    component.validation_alert_danger = [];
    expect(component.focusOut(event)).toBeUndefined();
  });

  it('should call onSubmit method', () => {
    const form = new NgForm(null, null);
    component.projectFPO = { year: 2019, month: 9, day: 11 };
    expect(component.onSubmit(form)).toBeUndefined();
  });


  it('should call validateSetAssets when call onchangeSubArea  method', () => {
    expect(component.onchangeSubArea()).toBeUndefined();
  });


  it('should call an alert when onDeleteFileAndDate  method is called', () => {
    component.arrayListFiles = [
      {
        "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
        "name": "acta ingeniería.pdf",
        "size": 1.0047130584716797
      },
      {
        "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
        "name": "acta ingeniería2.pdf",
        "size": 1.0047130584716797
      },
    ];
    expect(component.onDeleteFileAndDate(0, new MouseEvent('click', null))).toBeUndefined();
  });


  it('should set projectFPO when call onEventChild method with a event != null', () => {
    const event = {
      "validForm": true,
      "projectFPO": {
        "year": 2019,
        "month": 10,
        "day": 23
      },
      "stages": [
        {
          "date": {
            "year": 2019,
            "month": 10,
            "day": 18
          },
          "StageDescription": "asdasd"
        },
        {
          "date": {
            "year": 2019,
            "month": 10,
            "day": 23
          },
          "StageDescription": "asdasd"
        }
      ]
    };
    component.stagesList = [];
    component.projectFPO = { year: 2018, month: 10, day: 10 };

    component.onEventChild(event);
    expect(component.projectFPO).toEqual(event.projectFPO);
  });


  it('should set projectFPO = null when call onEventChild method with a event  null', () => {
    const event = null;
    component.onEventChild(event);
    expect(component.projectFPO).toBeNull();
  });

  it('should call downloadFile  method', () => {
    const file =
    {
      "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
      "name": "acta ingeniería.pdf",
      "size": 1.0047130584716797
    };
    expect(component.downloadFile(file, new MouseEvent('click', null))).toBeUndefined();
  });


  it('should call viewFile method', () => {
    const file =
    {
      "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
      "name": "acta ingeniería.pdf",
      "size": 1.0047130584716797
    };
    expect(component.viewFile(file, new MouseEvent('click', null))).toBeUndefined();
  });

  it('should call onselectDateOfDocument method and validate projectFPO', () => {
    const file =
    {
      "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
      "name": "acta ingeniería.pdf",
      "size": 1.0047130584716797,
      "datePicker": {
        year: 2019,
        month: 20,
        day: 15
      }
    };
    expect(component.onselectDateOfDocument(file)).toBeUndefined();
  });

  it('should call validControl method', () => {
    const form = new NgForm(null, null);
    component.arrayListFiles = [
      {
        "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
        "name": "acta ingeniería.pdf",
        "size": 1.0047130584716797
      },
      {
        "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
        "name": "acta ingeniería2.pdf",
        "size": 1.0047130584716797
      },
    ];
    expect(component.validControl(form)).toBeTruthy();
  });






});
