import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { IAssets } from '@core/entry-projects/model/IAssets';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { MessageService } from '@shared/services/message.service';
import { Router } from '@angular/router';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-subestacion',
  templateUrl: './subestacion.component.html'
})
export class SubestacionComponent implements OnInit, OnChanges {

  @Input() project: ITransmisionProject;
  @Input() asset: IAssets;
  @Input() subestacionForm: FormGroup;
  @Input() hasRequirement: boolean;
  @Output() formSubmit = new EventEmitter();
  object: any;
  text: string;
  isValid: boolean;

  constructor(
    private activosService: ActivosTransmisionService,
    private messageService: MessageService,
    private readonly router: Router) {
    this.isValid = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
  }

  sendProject(evt: any) {
    this.isValid = !this.isValid;
    this.activosService.sendProject(this.project.projectId).subscribe(
      (ressend) => {
        this.messageService.openSucessConfirm(
          {
            title: 'El envío de los activos ha sido exitoso',
            text: 'Los parámetros técnicos de los activos se han envíado correctamente.',
            confirmButtonText: 'OK'
          }).then((value: SweetAlertResult) => {
            // Actualizar los datos de la tabla Acción
            this.activosService.newSubestacionControl({}, {});
            this.isValid = !this.isValid;
            if (value.value) {
              this.clickBack();
            }
          });
      },
      (err) => {
        let message: string;
        if (err.error.statusCode === 404) {
          message = `En este momento no es posible enviar
           la información de los parámetros,
           debido a que existen parámetros sin diligenciar`;
        }
        this.messageService.openError(
          {
            title: ' No se ha podido finalizar el envío: ',
            text: message
          });
        this.isValid = !this.isValid;
      }

    );
  }

  onSubmit(evt: any) {
    if (this.hasRequirement) { return; }
    this.formSubmit.emit(evt);
  }


  clickBack() {
    if (this.project.projectId != null && this.project.projectId) {
      if (this.hasRequirement) {
        this.router.navigate(['requirements']);
      } else {
        this.router.navigate([`transmision/requirementsProject`, this.project.projectId]);
      }
    }
  }

  clickAprove() {
    this.isValid = !this.isValid;
    this.activosService.approveSendProjectById(this.project.projectId).subscribe(
      (ressend) => {
        this.messageService.openSucessConfirm(
          {
            title: 'La aprobación de los activos ha sido exitosa',
            text: 'Los parámetros técnicos de los activos se han aprobado correctamente.',
            confirmButtonText: 'OK'
          }).then((value: SweetAlertResult) => {
            this.isValid = !this.isValid;
            if (value.value) {
              this.clickBack();
            }
          });
      },
      (err) => {
        let message: string;
        if (err.error.statusCode === 404) {
          message = `En este momento no es posible aprobar
           la información de los parámetros,
           para mayor infomración consulte a un Administrador`;
        }
        this.messageService.openError(
          {
            title: ' No se ha podido finalizar la aprobación: ',
            text: message
          });
        this.isValid = !this.isValid;
      }

    );
  }

  clickReject() {
    this.messageService.openWarning('No puede utilizar esta función, para mas información consulte con el Adminstrador.');
  }

}
