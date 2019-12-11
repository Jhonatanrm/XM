import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadXmComponent } from './upload-xm.component';

describe('UploadXmComponent', () => {
  let component: UploadXmComponent;
  let fixture: ComponentFixture<UploadXmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadXmComponent ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadXmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set format file text from a formatFile array', () => {
    component.formartFile = [];
    component.formartFile.push('.jpg');
    component.formartFile.push('.pdf');
    component.formartFile.push('.tif');
    component.formartFile.push('.msg');
    component.ngOnChanges(null);
    expect(component.formartFileText.length).toBeGreaterThanOrEqual(0);
  });

  it('should set formatFile array when onSelectFile method is executed', () => {
    component.modeUnitTest = true;
    const event: any = {
      target : {
        files: [
          {
            name: "recibo de pago.pdf",
            lastModified: 1569501613407,
            size: 49442,
            type: "application/pdf"
          },
          {
            name: "recibo de pago.pdf",
            lastModified: 1569501613407,
            size: 49442,
            type: "application/pdf"
          }
        ]
      }
    };
    component.onSelectFile(event);
    expect(component.arrayListFiles.length).toBeGreaterThan(0);
  });


});
