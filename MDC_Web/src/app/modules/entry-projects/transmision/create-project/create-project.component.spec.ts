

import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { TransmisionComponent } from './create-project.component';
import { SharedModule } from '@shared/shared.module';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { MessageService } from '@shared/services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PromoterMockService } from '@shared/unit-test/mocks/promoter-mock.service'
import { GeneralTypesMockService } from '@shared/unit-test/mocks/generalTypes-mock.service';
import { TransmisionMockService } from '@shared/unit-test/mocks/transmision-mock.service';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsService } from '@shared/services/proyect-entry/documents.service';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { DocumentsMockService } from '@shared/unit-test/mocks/documents-mock.service';
import { MastereDataMockService } from '@shared/unit-test/mocks/master-mock.service';
import { TransmisionDTO } from '@core/entry-projects/model/ITransmisionDTO';
import { of } from 'rxjs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';
import { ProjectRequirementMockService } from '@shared/unit-test/mocks/project-requiremet-mock.service';
import { JustificationModalComponent } from '../justification-modal/justification-modal.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('TransmisionComponent', () => {
  let component: TransmisionComponent;
  let fixture: ComponentFixture<TransmisionComponent>;
  let masterService: MastereDataService;
  let transmisionService: TransmisionService;
  let documentService: DocumentsService;

  let el: HTMLElement;

  beforeEach(async(() => {

    // Create a fake PromoterService object with a `getPromoters()` spy
    //const promoterService = jasmine.createSpyObj('PromoterService', ['getPromoters']);


    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [TransmisionComponent, JustificationModalComponent],
      providers: [
        {
          provide: PromoterService, useClass: PromoterMockService
        },
        {
          provide: TransmisionService, useClass: TransmisionMockService
        },
        {
          provide: GeneralTypesService, useClass: GeneralTypesMockService
        },
        {
          provide: MessageService, useClass: MessageService
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
          provide: DocumentsService, useClass: DocumentsMockService
        },
        {
          provide: MastereDataService, useClass: MastereDataMockService
        },
        {
          provide: ProjectRequirementService, useClass: ProjectRequirementMockService
        },
        {
          provide: Router
        }
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ JustificationModalComponent ]
      }
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(TransmisionComponent);
        component = fixture.componentInstance;
        component.isUnitTest = true;
        component.transmisionDTO = new TransmisionDTO();
        component.typeAdjudicationList = [
          { typeMRID: 6, codeValue: '-1', detailValue: 'Indefinido' },
          { typeMRID: 7, codeValue: '1', detailValue: 'Convocatoria UPME' },
          { typeMRID: 8, codeValue: '2', detailValue: 'Ampliación del STN' },
          { typeMRID: 9, codeValue: '3', detailValue: 'Expansión del Operador de Red' }
        ];
        masterService = TestBed.get(MastereDataService);
        transmisionService = TestBed.get(TransmisionService);
        documentService = TestBed.get(DocumentsService);
      });
  }));

  it('should create transmision create', () => {
    expect(component).toBeTruthy();
  });
  
  
  
  it('should set 10 year on yearsUpme', () => {
    component.yearsUpme = [];
    component.setYears();
    expect(component.yearsUpme.length).toEqual(11);
  });
  
  it('should set ten previous years', () => {
    component.yearsUpme = [];
    const yearListTest: any[] = [];
    const actualYear = new Date().getFullYear();
    for (let i = actualYear; i >= (actualYear - 10); i--) {
      yearListTest.push(i);
    }
    component.setYears();
    expect(component.yearsUpme).toEqual(yearListTest);
  });
  
  it('should onSelectArea method set subAreaList', () => {
    const area: any = { codeValue: 1, detailValue: 'Area Antioquia' };
    spyOn(masterService, 'getAllSubAreasByIdArea').and.returnValue(of([{ codeValue: 1, detailValue: 'Area Antioquia' }]));
    component.onSelectArea(area);
    expect(component.subAreaListSelect.length).toBeGreaterThan(0);
  });
  
  it('should onSelectTypeProject conexion de carga show uploap component', () => {
    component.arrayListFiles = [{ name: 'name', datePicker: new NgbDate(2019, 10, 10) }];
    const typeProject: any = { codeValue: '3', typeMRID: 4, detailValue: 'conexion de carga' };
    component.typeProjectSelect = { codeValue: '3', typeMRID: 4, detailValue: 'conexion de carga' };
    component.onSelectTypeProject(typeProject);
    expect(component.showUpload).toBeFalsy();
  });
  
  it('should onSelectTypeProject conexion de carga hidden uploap component', () => {
    const typeProject: any = { codeValue: '2', typeMRID: 4, detailValue: 'STN/STR' };
    component.typeProjectSelect = { typeMRID: 3, codeValue: '1', detailValue: 'STN' };
    component.transmisionDTO = {};
    component.onSelectTypeProject(typeProject);
    expect(component.showUpload).toBeTruthy();
  });
  
  it('should onSelectAnnouncement with parameter true set award with Convocatoria UPME', () => {
    component.typeProjectSelect = { detailValue: 'STN' };
    component.onSelectAnnouncement(true);
    const valueAward: any = 'Convocatoria UPME';
    expect(component.award.toString()).toEqual(valueAward);
  });
  
  it('should onSelectAnnouncement with parameter true set award value null', () => {
    component.typeProjectSelect = { detailValue: 'Conexión de carga' };
    component.onSelectAnnouncement(false);
    expect(component.nameNumberAnnoucement).toBeNull();
  });
  
  it('should onSelectAnnouncement with parameter false  and typeProyectSelect STN', () => {
    component.typeProjectSelect = { detailValue: 'STN' };
    
    component.onSelectAnnouncement(false);
    expect(component.award).toEqual('Ampliación del STN');
    expect(component.showUploadAlso).toBeFalsy();
  });
  
  it('should validNumberAnnoucement method set numberAnnoucement only number', () => {
    const letters = '...//letters';
    component.numberAnnoucement = '00';
    component.validNumberAnnoucement(letters);
    expect(component.numberAnnoucement).toEqual('0');
  });
  
  it('should clearNumberAnnoucement method set numberAnnoucement, numberAnnoucement, yearUpemSelect w number', () => {
    const letters = '...//letters';
    component.numberAnnoucement = '00';
    component.validNumberAnnoucement(letters);
    expect(component.numberAnnoucement).toEqual('0');
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
    spyOn(transmisionService, 'registerTransmisionProyect')
    .and.returnValue(of({}));
    spyOn(documentService, 'uploadDocumentUpme')
    .and.returnValue(of({ Url: 'url' }));
    component.arrayListFiles = [
      { id: null, name: 'file1', datePicker: new NgbDate(2019, 10, 10) },
      { id: null, name: 'file2', datePicker: new NgbDate(2019, 10, 10) }
    ];
    component.stagesList = [
      { StageOrder: 1, StageDescription: 'StageDescription', date: { year: 2019, month: 9, day: 9 } },
      { StageOrder: 2, StageDescription: 'StageDescription2', date: { year: 2019, month: 9, day: 10 } },
      { StageOrder: 3, StageDescription: 'StageDescription2', date: { year: 2019, month: 9, day: 11 } }
    ];
    component.isUnitTest = true;
    component.projectFPO = { year: 2019, month: 9, day: 11 };
    expect(component.onSubmit(form)).toBeUndefined();
  });
  
  it('should call getClasses method', () => {
    component.validation_alert_danger = { idorName: ['', ''] };
    expect(component.getClasses('idorName', 1)).toBeFalsy();
  });
  
  it('should call setTypeConexion method', () => {
    component.validation_alert_danger = {};
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('should set projectFPO when call onEventChild method with a event != null', () => {
    const event = {
      'validForm': true,
      'projectFPO': {
        'year': 2019,
        'month': 10,
        'day': 23
      },
      'stages': [
        {
          'date': {
            'year': 2019,
            'month': 10,
            'day': 18
          },
          'StageDescription': 'asdasd'
        },
        {
          'date': {
            'year': 2019,
            'month': 10,
            'day': 23
          },
          'StageDescription': 'asdasd'
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
  
  it('should delete only the document of the arrayListFile when call onDeleteFile method', () => {
    component.arrayListFiles = [];
    component.arrayListFiles = [
      {
        base64: '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',
        name: 'cedula ampliada.pdf',
        datePicker: { year: 2019, month: 10, day: 10 },
        size: 0.24234485626220703
      }
    ];
    
    expect(component.onDeleteFileAndDate(0, new MouseEvent('click', null))).toBeUndefined();
  });
  
  it('should call onselectDateOfDocument method', () => {
    const file = {
      base64: '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',
      name: 'cedula ampliada.pdf',
      date: { year: 2019, month: 10, day: 10 },
      size: 0.24234485626220703,
      datePicker: new NgbDate(2019, 10, 11)
    };
    component.projectFPO = { year: 2019, month: 10, day: 10 };
    expect(component.onselectDateOfDocument(file)).toBeUndefined();
  });
  
  it('should get subArea by idSubArea and fill subAreaSelect variable', () => {
    spyOn(masterService, 'getSubAreaById').and.returnValue(of({ id: 1, code: '1', name: 'subarea', area: { id: 1 } }));
    component.areaList = [
      { id: 1, code: '1' }
    ];
    component.getSubAreaByIdSubArea(1);
    expect(component.subAreaSelect.name).toEqual('subarea');
  });
  
  it('should re-assign values when transformData is called', () => {
    const data = {
      stages: [{ fpoDate: '2019-10-11T11:11', stageOrder: 1, stageDescription: '' }],
      documentsUpme: [{ instanceDocument: 1, urlDocument: '', connectionConceptUpme: 'name', fpoUpme: '2019-10-10T11:11' }],
      announcementNumberUpme: 'name-100-2019'
    };
    component.typeProjectSelect = {
      detailValue: 'STN'
    };
    component.transformData(data);
    
    expect(component.showUploadAlso).toBeFalsy();
    expect(component.award).toEqual('Ampliación del STN');
    expect(component.arrayListFiles.length).toEqual(1);
    expect(component.stagesList.length).toEqual(1);
  });


  it('should open ModalViewFileXmComponent when viewFile is called', async(inject([NgbModal], (modal: NgbModal) => {
    component.viewFile({}, { preventDefault: () => { } });
    expect(modal.hasOpenModals()).toBeFalsy();
  })));
  
  
  
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
  
  
  it('should call clickBack method', () => {
    expect(component.clickBack()).toBeUndefined();
  });

  it('should call clickBack method with editId ', () => {
    component.editId = 4;
    expect(component.clickBack()).toBeUndefined();
  });
  
  it('should call validControl method', () => {
    expect(component.validControl(null)).toBeTruthy();
  });
  
  it('should call clickStateRequirement method to refuse requirement', () => {
    component.editId = 1;
    component.stateRequirement = {
      "projectRequirementRId": 33,
      "requirementId": 1,
      "projectId": 67,
      "requirementName": "Datos básicos",
      "daysBeforeFpo": 180,
      "requirementStatusId": 54,
      "requirementStatusName": "Pendiente",
      "categoryRequirementId": 62,
      "categoryRequirementName": "Formulario de Proyecto",
      "remainingDays": -176,
      "receivedDate": null,
      "comment": "Observacion"
    };
    expect(component.clickStateRequirement(57)).toBeUndefined();
  });
  
  it('should call clickStateRequirement method to approve requirement', () => {
    component.editId = 1;
    component.stateRequirement = {
      "projectRequirementRId": 33,
      "requirementId": 1,
      "projectId": 67,
      "requirementName": "Datos básicos",
      "daysBeforeFpo": 180,
      "requirementStatusId": 54,
      "requirementStatusName": "Pendiente",
      "categoryRequirementId": 62,
      "categoryRequirementName": "Formulario de Proyecto",
      "remainingDays": -176,
      "receivedDate": null,
      "comment": "Observacion"
    };
    expect(component.clickStateRequirement(56)).toBeUndefined();
  });
  

});
