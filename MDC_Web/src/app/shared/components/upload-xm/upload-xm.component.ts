import { Component, Input, OnChanges } from '@angular/core';
import { IFileXM } from '@shared/model/file-xm.model';
import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-upload-xm',
  templateUrl: './upload-xm.component.html',
  styleUrls: ['./upload-xm.component.scss']
})
export class UploadXmComponent implements OnChanges {

  // File Variables
  @Input() maxSizeFile: number;  // hace referencia al tamaño máximo que tendrá cada archivo
  @Input() formartFile: string[];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  @Input() maxLengthFile: number;  // se refiere a el maximo de documentos admitidos

  @Input() arrayListFiles: IFileXM[] = [];  // lista de archivos



  FileXmTemp: IFileXM = {};

  formartFileText = '';
  totalSizeFile: number;

  modeUnitTest = false;



  constructor(
    private readonly messageService: MessageService
  ) {
  }


  /**
   * init method
   */
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.setFormatfileTextAccept();
  }


  /**
   * build string property accept of upload component in it html
   */
  setFormatfileTextAccept() {
    this.formartFileText = this.formartFile.join(', ');
  }



  /**
   * event of upload html select file from pc
   * @param event
   */
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.addNameBase64ToArray(file);
      }
    }
  }


  addNameBase64ToArray(file: File) {

    const reader = new FileReader();
    let base64: any;
    if (!this.modeUnitTest) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        base64 = reader.result.toString()
          .substring(reader.result.toString().indexOf(',') + 1, reader.result.toString().length);
        this.FileXmTemp.file = file;
        this.FileXmTemp.base64 = base64;
        this.FileXmTemp.name = file.name;
        this.FileXmTemp.size = file.size / 1024 / 1024;
        if (this.FileXmTemp.size <= this.maxSizeFile) {
          if (this.arrayListFiles.length < this.maxLengthFile) {
            this.arrayListFiles.push(this.FileXmTemp);
            this.FileXmTemp = {};
          }else{
            this.messageService.openConfirm({ title: '', text: 'El número de documentos a adjuntar no debe ser mayor a  '+this.maxLengthFile, confirmButtonText: 'Aceptar' });
            return;
          }
        }else{
          // tslint:disable-next-line: max-line-length
          this.messageService.openConfirm({ title: '', text: 'El tamaño del documento adjunto no debe superar ' + this.maxSizeFile + ' MB', confirmButtonText: 'Aceptar' });
        }
      };
    } else {
      this.FileXmTemp.name = file.name;
      this.FileXmTemp.size = file.size / 1024 / 1024;
      this.arrayListFiles.push(this.FileXmTemp);
    }
  }



}
