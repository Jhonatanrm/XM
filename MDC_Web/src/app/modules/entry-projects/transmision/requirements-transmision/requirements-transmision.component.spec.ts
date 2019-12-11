import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsTransmisionComponent } from './requirements-transmision.component';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '@shared/services/message.service';
import { ProjectRequirementMockService } from '@shared/unit-test/mocks/project-requiremet-mock.service';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

describe('RequirementsTransmisionComponent', () => {
  let component: RequirementsTransmisionComponent;
  let fixture: ComponentFixture<RequirementsTransmisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [ RequirementsTransmisionComponent ],
      providers: [
        {
          provide: ProjectRequirementService, useClass: ProjectRequirementMockService
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
          provide: DatePipe
        },
        {
          provide: Router
        },
        {
          provide: MessageService, useClass: MessageService
        }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(RequirementsTransmisionComponent);
      component = fixture.componentInstance;
      component.isTestUnit = true;
      fixture.detectChanges();
    });
  }));

 

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onEventChild method to set ArrayList ', () => {
    component.onEventChild('filterQuery');
    expect(component.arrayList.length).toBeGreaterThan(0);
  });

  
  it('should call onEventChild method to set ArrayList ', () => {
    const button : any = {
      "row": {
        "projectRequirementRId": 1,
        "requirementId": 1,
        "projectId": 1,
        "requirementName": "Formulario",
        "daysBeforeFpo": 180,
        "requirementStatusId": 54,
        "requirementStatusName": "Pendiente",
        "categoryRequirementId": 62,
        "categoryRequirementName": "Formulario de Proyecto",
        "deadline": "03/06/2019",
        "remainingDays": -169,
        "receivedDate": "18/11/2019"
      },
      "buttonElement": {
        "buttonName": "Editar",
        "className": "xm-btn-editar",
        "iconName": "open_in_new"
      }
    };
    
    expect(component.eventClickInButtons(button)).toBeUndefined();
  });
  
  
  it('should call onClickBack ', () => {
    expect(component.onClickBack()).toBeUndefined();
  });

  
});
