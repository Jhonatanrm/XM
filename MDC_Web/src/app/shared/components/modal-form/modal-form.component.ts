import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { Subestacion } from '@core/entry-projects/model/ISubestation';
import { Busbar } from '@core/entry-projects/model/IBusbar';
import { Subscription } from 'rxjs';
import { BusBarService } from '@shared/services/proyect-entry/busbar.service';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html'
})
export class ModalFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input() component: string;
  @Input() tittle: string;
  @Input() form: FormGroup;
  @Output() formSubmit = new EventEmitter();
  @Input() project: any; // puede ser dos tipo de proyecto
  @Input() flagButton: boolean; // control de si tiene o no boton
  @Input() flagButtonView: boolean; // control de si es solo vista
  @ViewChild('modalForm', null) modalForm: ElementRef;
  object: any; // puede llegar cualquier objeto, Subestacion, Linea, etc
  suscriptiontabControModal: Subscription; // ante el cambio de tab
  suscriptionEditAsset: Subscription;
  ngbTabset: string; // ligado al ngbTabset del formulario
  mapFormGroups: string[];
  controlsForm: any[];
  selectObjInput: any;
  closeResult: string;
  subAsset: string;
  bottonValid: boolean; // bloquea o desbloque el boton del modal
 
  constructor(
    private modalService: NgbModal,
    private messageService: MessageService,
    private activosService: ActivosTransmisionService,
    private busbarService: BusBarService
  ) {
    // inicialización de variables
    this.bottonValid = false;
    this.ngbTabset = 'informacionBasica';
    this.mapFormGroups = [''];
    this.controlsForm = [];
  }

  ngOnInit(): void {    
    // Suscripción a botones de tabla
    this.suscriptionEditAsset = this.activosService.observableEditControModal
      .subscribe((asset: any) => {
        if (asset) {
          switch (asset.assetType) {
            case 'Subestación':
              this.activosService.getSubestationBK(asset.assetId, asset.isActive)
                .subscribe((subestation: Subestacion) => {
                  this.object = new Subestacion(subestation, asset.assetControl);

                  this.openModalForm(this.modalForm, {
                    id: 'createSubestacion',
                    name: 'Subestación',
                    object: true
                  });
                  this.activosService.changeEditModalControl({
                    assetId: 0,
                    assetType: undefined,
                  });
                });
              break; // create a object
            case 'Barra':
              this.busbarService.getBusBarBK(asset.assetId, asset.isActive)
                .subscribe(busbar => {
                  this.object = new Busbar(busbar, asset.assetControl, asset.isActive);
                  this.openModalForm(this.modalForm, {
                    id: 'createBarra',
                    name: 'Barra',
                    object: true
                  });
                  this.activosService.changeEditModalControl({
                    assetId: 0,
                    assetType: undefined,
                  });
                });
              break;
            default: break;
          }
        }
      });
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.suscriptionEditAsset.unsubscribe();
  }

  // COMPORTAMIENTO INTERNO
  // select a input
  selectInput(evt: any) {
    this.selectObjInput = evt;
    this.ngbTabset = evt.formGroup; // Se agrego, el observer observabletabControModal, noOK
  }

  openModalForm(modal: any, evt: any) {
    /* inicio de control solo para subestacion*/
    this.bottonValid = false;
    this.subAsset = evt ? evt.id : undefined;
    this.tittle = evt ? evt.name : undefined;


    if (!evt.object) {
      // Creacion de Object
      switch (this.subAsset) {
        case 'createSubestacion':
          this.object = new Subestacion();
          break;
        case 'createBarra':
          this.object = new Busbar();
          break;

        /*
        * OJO TAMBIEN CAMBIAR EL OBJEC DEL SUB EN CUESNTION (barra, bahia,...)
        */

        default:
          break;

      }
    }

    /* Al servicio de cambio de boton */
    // emite a observable para que el padre se entere y cambie comportameinto de formulario
    if (this.subAsset) { this.activosService.changeButtonControl(evt, this.subAsset); }

    this.modalService.open(modal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      backdropClass: 'light-blue-backdrop',
      backdrop: 'static'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.activosService.changeEditModalControl({
        assetId: 0,
        assetType: undefined,
      });

      // volvemos las variables, evita errores de consistencia 7 pasadas
      this.ngbTabset = 'informacionBasica';
      this.mapFormGroups = [''];
      this.controlsForm = [];
      this.object = null; // se elimina el objeto
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  modalFormclose(modal: { close: (arg0: string) => void; }) {
    this.messageService.openGeneralConfirm(`¿Esta seguro de cancelar la solicitud de cambio?`)
    .then((value: SweetAlertResult) => {
      if (value.value) {
        this.modalService.dismissAll(`Closed with: Cancel button`);
        modal.close('');
      }
    });
  }

  // COMPORTAMIENTO INTERNO
  // Botones siguiente y anterior
  toTabModal(obj: any) {
    if (this.mapFormGroups.length) {
      const index = this.mapFormGroups.indexOf(this.ngbTabset);
      if (index >= 0) {
        if (obj.id === 'beforeTab') {
          // si hay un valor antes
          if (this.mapFormGroups[Number(index) - 1]) {
            this.ngbTabset = this.mapFormGroups[Number(index) - 1];
          }
        }
        if (obj.id === 'nextTab') {
          // si hay un valor despues
          if (this.mapFormGroups[Number(index) + 1]) {
            this.ngbTabset = this.mapFormGroups[Number(index) + 1];
          }
        }
      }
    }
  }

  // llegada de controles de Formulario
  // esto es para el buscador de campos
  // y para la navegacion adelante atras
  // esto lo emite el hijo formulario
  onControls(evt: any) {
    this.mapFormGroups = evt.mapFormGroups;
    this.ngbTabset = evt.tab;
    // this.controlsForm = evt.mapFormControls;
    if ('mapFormControls' in evt) {
      setTimeout(() => {
        const controls = 'controls';
        let formControl = {};
        this.controlsForm = [];
        for (const key in this.form.controls) {
          if (controls in this.form.controls[key]) {
            // tslint:disable-next-line: forin
            for (const key2 in this.form.controls[key][controls]) {
              if (evt.mapFormControls[key2]) {
                formControl = { formControl: key2, formGroup: key, name: evt.mapFormControls[key2] };
                this.controlsForm.push(formControl);
              }
            }
          }
        }
      }, 0); // asincrona
    }
  }

  // Para validar el btn-disabled del cambio de solicitud
  requestChangeValid(): boolean {
    let valid = false;
    if (this.form.valid) {
      if ('substationInstanceId' in this.form.value) {
        // Es una subestacion, validamos campo acampo
        // El substationName
        valid = this.form.value.informacionBasica.substationName !== this.object.substationName ? true : valid;
        valid = this.form.value.informacionBasica.DivisionPoliticaMunicipio.id !== this.object.geographicLocation ? true : valid;
        valid = this.form.value.informacionBasica.latitude !== this.object.latitude ? true : valid;
        valid = this.form.value.informacionBasica.longitude !== this.object.longitude ? true : valid;
        valid = this.form.value.informacionBasica.SubArea.id !== this.object.subAreaId ? true : valid;
        // La Etapa
        // El Municipio

      }
      if ('busbarInstanceId' in this.form.value) {
        // Es una barra
        // informacionBasica
        valid = this.form.value.informacionBasica.busbarName !== this.object.busbarName ? true : valid;
        // tslint:disable-next-line: max-line-length
        valid = this.form.value.informacionBasica.subestation.substationInstanceId !== this.object.subestation.substationInstanceId ? true : valid;
        // tslint:disable-next-line: max-line-length
        valid = this.form.value.informacionBasica.nominalTension.substationConfigurationId !== this.object.substationConfigurationId ? true : valid;
        valid = this.form.value.informacionBasica.operator.codigoAgente !== this.object.operatingAgent ? true : valid;
        valid = this.form.value.informacionBasica.owner.codigoAgente !== this.object.ownerAgent ? true : valid;

        // datosTecnicos
        valid = this.form.value.datosTecnicos.tensionDiseno !== this.object.tensionDiseno ? true : valid;
        valid = this.form.value.datosTecnicos.currentCapacity !== this.object.currentCapacity ? true : valid;
        valid = `${this.form.value.datosTecnicos.encapsulatedBusbar}` !== `${this.object.busbarEncapsulated}` ? true : valid;
        // secciones de barras
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.form.value.datosTecnicos.sectionsBusbar.length; i++ ) {
          // tslint:disable-next-line: max-line-length
          valid = this.form.value.datosTecnicos.sectionsBusbar[i].sectionName !== this.object.busbarSection[i].busbarSectionName ? true : valid;
          // tslint:disable-next-line: max-line-length
          valid = this.form.value.datosTecnicos.sectionsBusbar[i].shortCircuit !== this.object.busbarSection[i].shortCircuitCapacity ? true  : valid;
        }
      }
    }

    return !valid;

  }

  onSubmit(modal: { close: (arg0: string) => void; }, statment: string) {
    this.bottonValid = statment === 'validate' ? false : true;
    this.formSubmit.emit({
      component: this.component,
      subasset: this.subAsset,
      object: this.object,
      statment,
      modal,
    });
  }
}
