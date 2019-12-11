import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GeneracionComponent } from './generacion.component';
import { SharedModule } from '@shared/shared.module';
import { GenerationService } from '@shared/services/proyect-entry/generation.service';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { DatePipe } from '@angular/common';
import { GenerationMockService } from '@shared/unit-test/mocks/generation-mock.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('GeneracionComponent', () => {
  let component: GeneracionComponent;
  let fixture: ComponentFixture<GeneracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [GeneracionComponent],
      providers: [
        {
          provide: GenerationService, useClass: GenerationMockService
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
    fixture = TestBed.createComponent(GeneracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    component.generationSearch = {};
    expect(component).toBeTruthy();
  });


  it('should show stages view', () => {
    const view = 'etapas';
    component.viewBy(view);
    expect(component.viewStages).toEqual(true);
  });
  
  it('should not show stages view', () => {
    const view = 'et';
    component.viewBy(view);
    expect(component.viewStages).toEqual(false);
  });
  it('should call setGenerationStageProjects if viewStages is true', () => {
    const spyMethod = spyOn(GeneracionComponent.prototype, 'setGenerationStageProjects');
    component.viewStages = true;
    component.onEventChild('');
    expect(spyMethod).toHaveBeenCalledWith('');
  });

  it('should call setGenerationProjects if viewStages is false', () => {
    const spyMethod = spyOn(GeneracionComponent.prototype, 'setGenerationProjects');
    component.viewStages = false;
    component.onEventChild('');
    expect(spyMethod).toHaveBeenCalledWith('');
  });

});
