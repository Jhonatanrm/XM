import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFileComponent } from './external-file.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ExternalFileComponent', () => {
  let component: ExternalFileComponent;
  let fixture: ComponentFixture<ExternalFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalFileComponent, UploadFileComponent ],
      imports: [
        FormsModule,
        CommonModule,
        NgSelectModule,
        HttpClientTestingModule,
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
