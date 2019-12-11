import { Component, OnInit } from '@angular/core';
import { IFileXM } from '@shared/model/file-xm.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewFileXmComponent } from '@shared/components/modal-view-file-xm/modal-view-file-xm.component';
import { Util } from '@shared/util';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { SlicePipePipe } from '@shared/pipes/slice-pipe/slice-pipe.pipe';

@Component({
  selector: 'app-justification-chg-prm',
  templateUrl: './justification-chg-prm.component.html',
  providers: [ProjectPipe, SlicePipePipe]
})
export class JustificationChgPrmComponent implements OnInit {

  // File Variables, solo para solicitud de cambio
  maxSizeFile = 20;  // hace referencia al tamaño máximo que tendrá cada archivo (MB)
  formartFile: string[] = [];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  maxLengthFile = 10;  // se refiere a el maximo de documentos admitidos
  arrayListFiles: IFileXM[] = [];  // lista de archivos
  isUnitTest = false;

  constructor(private readonly modalService: NgbModal) { }

  ngOnInit() {

    this.arrayListFiles = [
      {
        id: 1,
        name: 'string',
        size: 400,
        base64: 'any',
        file: null,
        sended: true,
        urlDocument: 'string',
        datePicker: null,
        date: null
      },
      {
        id: 1,
        name: 'string',
        size: 400,
        base64: 'any',
        file: null,
        sended: true,
        urlDocument: 'string',
        datePicker: null,
        date: null
      },
      {
        id: 1,
        name: 'string',
        size: 400,
        base64: 'any',
        file: null,
        sended: true,
        urlDocument: 'string',
        datePicker: null,
        date: null
      }
    ];



  }

  downloadFile(file: IFileXM, event: any) {
    event.preventDefault();
    if (!this.isUnitTest) {
      Util.downloadFile(file.base64, file.name);
    }
  }
  viewFile(file: any, event: any) {
    if (!this.isUnitTest) {
      event.preventDefault();
      const modalRef = this.modalService.open(ModalViewFileXmComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.file = file;
    }
  }

}
