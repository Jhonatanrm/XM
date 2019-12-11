import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { ModalViewFileXmComponent } from './modal-view-file-xm.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FileTypeEnum } from '@core/entry-projects/enums/file-type.enum';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';
import { By } from '@angular/platform-browser';
import { MSG_BASE64_STUB, TIFF_BASE64_STUB } from '@shared/components/modal-view-file-xm/base64-stub';

describe('ModalViewFileXmComponent', () => {
  let component: ModalViewFileXmComponent;
  let fixture: ComponentFixture<ModalViewFileXmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal, NgbModal],
      declarations: [ModalViewFileXmComponent, SafeHtmlPipe],
      imports: [NgxExtendedPdfViewerModule, NgbModalModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewFileXmComponent);
    component = fixture.componentInstance;
    component.file = {
      name: 'file.jpg',
      base64: TIFF_BASE64_STUB
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a pdf/jpg/png/tif extension from file name', () => {
    component.file = {
      name: 'file.pdf'
    };
    const pdfExtension = component.getFileExtension();
    expect(pdfExtension).toEqual(FileTypeEnum.PDF);

    component.file.name = 'file.jpg';
    const jpgExtension = component.getFileExtension();
    expect(jpgExtension).toEqual(FileTypeEnum.JPG);

    component.file.name = 'file.png';
    const pngExtension = component.getFileExtension();
    expect(pngExtension).toEqual(FileTypeEnum.PNG);

    component.file.name = 'file.tif';
    const tifExtension = component.getFileExtension();
    expect(tifExtension).toEqual(FileTypeEnum.TIF);
  });

  it('should get null when the file name is incorrect', () => {
    component.file = {
      name: 'file_ext'
    };
    const tifExtension = component.getFileExtension();
    expect(tifExtension).toEqual(null);
  });

  it('should close the active modal', async(inject([NgbModal], (modal: NgbModal) => {
    component.dismiss();
    expect(modal.hasOpenModals()).toEqual(false);
  })));

  it('should render a canvas when file type is .tif', () => {
    component.file.name = 'file.tiff';
    component.ngAfterViewInit();
    expect(fixture.debugElement.query(By.css('#myCanvas')).nativeElement).toBeTruthy();
  });

  it('should fill the msgModel variable', fakeAsync(() => {
    component.file.name = 'file.msg';
    component.file.base64 = MSG_BASE64_STUB;
    component.ngAfterViewInit();
    tick(100);
    expect(component.msgModel).toBeDefined();
  }));

  it('should render a msg reader when file type is .msg', fakeAsync(() => {
    component.file.name = 'file.msg';
    component.file.base64 = MSG_BASE64_STUB;
    component.ngAfterViewInit();
    tick(100);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(fixture.debugElement.query(By.css('#msgReader')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#to')).nativeElement.innerText).toEqual('Cfrontado@intergrupo.com');
      });
  }));

  it('should return null if the file or file name is undefined', () => {
    component.file = null;
    expect(component.getFileExtension()).toBeNull();

    component.file = {};
    expect(component.getFileExtension()).toBeNull();
  });
});
