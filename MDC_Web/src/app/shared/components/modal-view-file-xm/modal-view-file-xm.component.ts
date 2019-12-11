import { AfterViewInit, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IFileXM } from '@shared/model/file-xm.model';
import { FileTypeEnum } from '@core/entry-projects/enums/file-type.enum';
import { Util } from '@util';

declare var Tiff: any;
declare var MSGReader: any;

@Component({
  selector: 'app-modal-view-file-xm',
  templateUrl: './modal-view-file-xm.component.html',
  styleUrls: ['./modal-view-file-xm.component.scss']
})
export class ModalViewFileXmComponent implements AfterViewInit {

  @Input() file: IFileXM = {};
  fileTypes = FileTypeEnum;
  msgModel: any;

  constructor(
    private readonly modalService: NgbActiveModal
  ) { }

  ngAfterViewInit() {
      this.loadTifFile();
      this.loadMSGFile();
  }

  getFileExtension() {
    if (!this.file || !this.file.name) {
      return null;
    }

    const splittedName = this.file.name.split('.');
    return splittedName.length > 1 ? splittedName[1] : null;
  }

  downloadFile() {
    Util.downloadFile(this.file.base64, this.file.name);
  }

  loadMSGFile() {
    if (this.file && this.file.name.includes(this.fileTypes.MSG)) {
      const msg = new MSGReader(Util.base64ToArrayBuffer(this.file.base64));
      setTimeout(() => {
          this.msgModel = msg.getFileData();
      }, 0);
    }
  }

  loadTifFile() {
    if (this.file && this.file.name.includes(this.fileTypes.TIF)
      || this.file.name.includes(this.fileTypes.TIFF)) {
      const tiff = new Tiff({buffer: Util.base64ToArrayBuffer(this.file.base64)});
      const canvas = tiff.toCanvas();
      document.getElementById('myCanvas').appendChild(canvas);
    }
  }

  dismiss() {
    this.modalService.dismiss();
  }

}
