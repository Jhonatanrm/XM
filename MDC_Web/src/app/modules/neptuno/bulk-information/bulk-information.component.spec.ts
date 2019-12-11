import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInformationComponent } from './bulk-information.component';
import { ExternalFileComponent } from '../external-file/external-file.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManualInformationComponent } from '../manual-information/manual-information.component';
import { NepOnlyNumbersDirective } from '../nep-only-numbers.directive';

describe('BulkInformationComponent', () => {
  let component: BulkInformationComponent;
  let fixture: ComponentFixture<BulkInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkInformationComponent, ExternalFileComponent, UploadFileComponent,
        ManualInformationComponent, NepOnlyNumbersDirective ],
      imports: [ NgbModule, NgSelectModule, FormsModule, CommonModule, HttpClientTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
