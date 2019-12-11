import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnChanges {

  acceptedFormat = '.nep';
  @Input() file: File;
  @Output() changeFile = new EventEmitter();

  constructor(private readonly messageService: MessageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.file.currentValue) {
      const input: any = document.getElementById('uploadFile');
      input.value = '';
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.validateFormat(this.file, this.acceptedFormat);
      this.emitEvent();
    }
  }

  validateFormat(file: File, extension: string) {
    const fileExt = file.name.split('.')[1]; // separar la extension del nombre
    if (`.${fileExt.toLowerCase()}` !== extension) {
      this.messageService.openError({
        text: `El formato del archivo seleccionado no concuerda con la extensión ${extension}`,
        title: 'Formato inválido'
      });
      this.file = null;
      this.emitEvent();
    }
  }

  emitEvent() {
    this.changeFile.emit(this.file);
  }

  deleteFile(event: any) {
    event.preventDefault();
    this.file = null;
    this.emitEvent();
  }

}
