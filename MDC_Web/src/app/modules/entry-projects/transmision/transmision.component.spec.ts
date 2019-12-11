import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './transmision.component';
import { SharedModule } from '@shared/shared.module';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { DatePipe } from '@angular/common';
import { TransmisionMockService } from '@shared/unit-test/mocks/transmision-mock.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [ProjectListComponent],
      providers: [
        {
          provide: TransmisionService, useClass: TransmisionMockService
        },
        {
          provide: DatePipe
        },
        {
          provide: Router
        }
      ]
    })

      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    component.transmisionSearch = {};
    component.transmisionStageSearch = {};
    expect(component).toBeTruthy();
  });
  
  it('should set transmisionSearch.item when setTransmisionStageProjects is executed', () => {
    component.transmisionStageSearch = {};
    component.setTransmisionStageProjects('');
    expect(component.transmisionStageSearch.items.length).toBeGreaterThan(0);
  });
  
  
  
  it('should set viewStages to be true when call viewBy(etapas) ', () => {
    component.viewBy('etapas');
    expect(component.viewStages).toBeTruthy();
  });

  it('should set viewStages to be false when call viewBy(projets) ', () => {
    component.viewBy('projets');
    expect(component.viewStages).toBeFalsy();
  });


  it('should call to setTransmisionStageProjects() from onEventChild when  viewStages is true ', () => {
    component.viewStages = true;
    expect(component.onEventChild('')).toBeUndefined();
  });

  it('should call to setTransmisionProjects() from onEventChild when  viewStages is false ', () => {
    component.viewStages = false;
    expect(component.onEventChild('')).toBeUndefined();
  });





});
