import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglelineDiagramComponent } from './singleline-diagram.component';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '@shared/services/message.service';
import { TransmisionMockService } from '@shared/unit-test/mocks/transmision-mock.service';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { ProjectRequirementMockService } from '@shared/unit-test/mocks/project-requiremet-mock.service';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';
import { DocumentsMockService } from '@shared/unit-test/mocks/documents-mock.service';
import { DocumentsService } from '@shared/services/proyect-entry/documents.service';
import { PromoterMockService } from '@shared/unit-test/mocks/promoter-mock.service';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SinglelineDiagramComponent', () => {
  let component: SinglelineDiagramComponent;
  let fixture: ComponentFixture<SinglelineDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule, HttpClientTestingModule],
      declarations: [SinglelineDiagramComponent],
      providers: [
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
          provide: Router
        },
        {
          provide: NgbModal
        },
        {
          provide: MessageService, useClass: MessageService
        },
        {
          provide: TransmisionService, useClass: TransmisionMockService
        },
        {
          provide: ProjectRequirementService, useClass: ProjectRequirementMockService
        },
        {
          provide: DocumentsService, useClass: DocumentsMockService
        },
        {
          provide: PromoterService, useClass: PromoterMockService
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SinglelineDiagramComponent);
        component = fixture.componentInstance;
        component.isTestUnit = true;
        component.arrayRequirements = [
          {
            "projectRequirementRId": 190,
            "requirementId": 1,
            "projectId": 133,
            "requirementName": "Datos básicos",
            "daysBeforeFpo": 180,
            "requirementStatusId": 55,
            "requirementStatusName": "Pendiente",
            "categoryRequirementId": 62,
            "categoryRequirementName": "Formulario de Proyecto",
            "deadline": "2020-04-03T00:00:00",
            "remainingDays": 123,
            "receivedDate": null,
            "comment": null
          },
          {
            "projectRequirementRId": 191,
            "requirementId": 2,
            "projectId": 133,
            "requirementName": "Activos y Parámetros",
            "daysBeforeFpo": 180,
            "requirementStatusId": 54,
            "requirementStatusName": "Pendiente",
            "categoryRequirementId": 63,
            "categoryRequirementName": "Formulario de Activos",
            "deadline": "2020-04-03T00:00:00",
            "remainingDays": 123,
            "receivedDate": null,
            "comment": null
          },
          {
            "projectRequirementRId": 192,
            "requirementId": 3,
            "projectId": 133,
            "requirementName": "Diagrama Unifilar",
            "daysBeforeFpo": 180,
            "requirementStatusId": 55,
            "requirementStatusName": "Pendiente",
            "categoryRequirementId": 65,
            "categoryRequirementName": "Formulario sin Formato",
            "deadline": "2020-04-03T00:00:00",
            "remainingDays": 123,
            "receivedDate": null,
            "comment": null
          }
        ];
        fixture.detectChanges();
      });
  }));



  it('should create method', () => {
    expect(component).toBeTruthy();
  });


  it('should call ClickBack method ', () => {
    expect(component.clickBack()).toBeUndefined();
  });


  it('should call searchDocuments method ', () => {

    expect(component.searchDocuments()).toBeUndefined();
  });

  it('should call sendUnifilarDiagram method ', () => {
    component.arrayListFiles = [
      {
        "name": "CV_Camilo_Frontado (2).pdf",
        "id": 105,
        "urlDocument": "https://intergrupoig.sharepoint.com/sites/XM-MDC-EntradaProyectos/MDC_Documents/ProyectosTransmision/PTRA_100_PROY0212201904/COLOMBINAENERGIASASESP_02_12_2019_DiagramaUnifilar_9b5562afd3744d5fb7e635497b5caa04.pdf",
        "sended": true
      },
      {
        "name": "CV_Camilo_Frontado (2).pdf",
        "urlDocument": "https://intergrupoig.sharepoint.com/sites/XM-MDC-EntradaProyectos/MDC_Documents/ProyectosTransmision/PTRA_100_PROY0212201904/COLOMBINAENERGIASASESP_02_12_2019_DiagramaUnifilar_9b5562afd3744d5fb7e635497b5caa04.pdf",
        "sended": true
      }
    ];
    expect(component.sendUnifilarDiagram()).toBeUndefined();
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


  it('should call changeStateRequirement  method', () => {
    component.idProject = 3;
    component.stateRequirement  = {projectRequirementRId : 2 };
    expect(component.changeStateRequirement()).toBeUndefined();
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



  it('should call viewFile method', () => {
    const file =
    {
      "base64": "+YUlkMrl2ySTW6StYWxd1jSLfW9IudMuWkWC4Xa5jbBx9aUYKGi2Hc5DSfhD4Z0nUIL2NJ5ZIGDIJHyMjpxVNXEd6DSjK++4GfrmjWmvaTPp16pMEwwcdR6EVE4xvzMN1Y5LRfhPo",
      "name": "acta ingeniería.pdf",
      "size": 1.0047130584716797
    };
    expect(component.viewFile(file, new MouseEvent('click', null))).toBeUndefined();
  });




});
