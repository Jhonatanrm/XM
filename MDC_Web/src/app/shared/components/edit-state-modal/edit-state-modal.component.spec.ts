import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { EditStateModalComponent } from './edit-state-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { SharedModule } from '@shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditStateModalComponent', () => {
  let component: EditStateModalComponent;
  let fixture: ComponentFixture<EditStateModalComponent>;
  let transmisionService: TransmisionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
    transmisionService = TestBed.get(TransmisionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', async(inject([NgbModal], (modal: NgbModal) => {
    component.dismiss();
    expect(modal.hasOpenModals()).toBeFalsy();
  })));

  /*
  it('should call the updateState service and close the modal', async(inject([NgbModal], (modal: NgbModal) => {
    spyOn(transmisionService, 'updateProjectState').and.returnValue(of());
    component.project = { projectInstanceId: 1 };
    component.selectedState = { typeMRID: 2 };
    component.justification = 'Test cambio de estado';
    component.save();
    expect(transmisionService.updateProjectState).toHaveBeenCalled();
    expect(modal.hasOpenModals()).toBeFalsy();
  })));
  */
});
