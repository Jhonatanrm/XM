import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { GeneralList } from './IGeneralList';
import { FormGroup } from '@angular/forms';
import { BusBarService } from '@shared/services/proyect-entry/busbar.service';
import { MessageService } from '@shared/services/message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BusbarSection } from './IBusbarSection';
import { AssetsStateEnum } from '@core/entry-projects/enums/assets-state.enum';

export interface IBusbar {
    busbarInstanceId?: number;
    elementId?: number;
    busbarName?: string;
    busbarNumber?: number;
    substationConfigurationId?: number;
    stageProjectId?: number;
    ownerAgent?: string; // FK
    operatingAgent?: string; // FK
    tensionDiseno?: number; // PowerByDesign
    capacidadCorrienteNominal?: number;
    busbarEncapsulated?: number;
    stnHerope?: number; // FK
    strHerope?: number; // FK
    stnCommercial?: number;
    strCommercial?: number;
    consignable?: number;
    recordState?: any;
    versionComments?: number;
    username?: string;
    fpo?: string;
    state?: string;
    version?: string;
    energizedOn?: string;
    busbarSection: BusbarSection[];
    // Las de abajo no hacen parte del modelo en BD
    elementPerProjectStageInstanceId?: number;
    validFrom?: NgbDateStruct;
    validTo?: NgbDateStruct;
    RecordState?: number;
    control?: string;
    justificacion?: string;

    // Elementos
    GeneralLists?: GeneralList[];
}

export class Busbar implements IBusbar {
    busbarInstanceId?: number;
    busbarName?: string;
    busbarNumber?: any;
    substationConfigurationId?: number;
    stageProjectId?: number;
    ownerAgent?: string; // FK
    operatingAgent?: string; // FK
    tensionDiseno?: number;
    capacidadCorrienteNominal?: number;
    busbarEncapsulated?: number;
    stnHerope?: number; // FK
    strHerope?: number; // FK
    stnCommercial?: number;
    strCommercial?: number;
    consignable?: number;
    recordState?: any;
    versionComments?: number;
    username?: string;
    fpo?: string;
    state?: string;
    version?: string;
    energizedOn?: string;
    busbarSection: BusbarSection[];
    // Las de abajo no hacen parte del modelo en BD pero son usados por el Form
    elementPerProjectStageInstanceId?: number;
    validFrom?: NgbDateStruct;
    validTo?: NgbDateStruct;
    isActive: boolean;
    RecordState: number;
    control: string;
    justificacion: string;
    elementId: number;

    constructor(object?: any, control?: string, isActive?: boolean) {

        this.busbarSection = [];
        // se setean todos los atributos
        if (!object) { return; }
        // set
        this.isActive = isActive ? isActive : false;
        this.busbarInstanceId = object.busbarInstanceId;
        this.busbarName = object.busbarName;
        this.busbarNumber = object.busbarNumber;
        this.substationConfigurationId = object.substationConfigurationId;
        this.stageProjectId = object.stageProjectId;
        this.ownerAgent = object.ownerAgent;
        this.operatingAgent = object.operatingAgent;
        this.tensionDiseno = object.tensionDiseno;
        this.capacidadCorrienteNominal = object.capacidadCorrienteNominal;
        this.busbarEncapsulated = object.busbarEncapsulated;
        this.stnHerope = object.stnHerope;
        this.strHerope = object.strHerope;
        this.stnCommercial = object.stnCommercial;
        this.strCommercial = object.strCommercial;
        this.consignable = object.consignable;
        this.recordState = object.recordState;
        this.versionComments = object.versionComments;
        this.username = object.username;
        this.fpo = object.fpo;
        this.state = object.state;
        this.version = object.version;
        this.energizedOn = object.energizedOn;
        this.busbarSection = object.busbarSection;
        this.control = control ? control : null; // Es el control de solicitud de cambio y editar
        this.elementId = object.elementId ? object.elementId : null;
    }

    validControl(form: FormGroup, controls?: string): boolean {
        // habilitar los campos de nombre y número
        form.get('informacionBasica').get('busbarName').enable();
        form.get('informacionBasica').get('busbarNumber').enable();

        if (form.controls.informacionBasica[controls].busbarName.valid &&
            form.controls.informacionBasica[controls].subestation.valid &&
            form.controls.informacionBasica[controls].nominalTension.valid &&
            form.controls.informacionBasica[controls].stageProject.valid &&
            form.controls.informacionBasica[controls].busbarNumber.valid) {
            return true;
        }

        // Tocamos el formulario
        form.controls.informacionBasica.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].busbarName.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].subestation.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].nominalTension.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].stageProject.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].busbarNumber.markAsTouched({ onlySelf: true });

        form.controls.datosTecnicos.markAsTouched({ onlySelf: true });
        form.controls.datosTecnicos[controls].tensionDiseno.markAsTouched({ onlySelf: true });
        form.controls.datosTecnicos[controls].currentCapacity.markAsTouched({ onlySelf: true });
        form.controls.datosTecnicos[controls].shortCircuitCapacity.markAsTouched({ onlySelf: true });
        return false;
    }

    setObject(form: FormGroup, id?: number): void {

        this.elementId = form.value.elementId ?
            form.value.elementId : null;

        this.busbarInstanceId = form.value.busbarInstanceId ?
            form.value.busbarInstanceId : null;

        // informacionBasica
        this.substationConfigurationId = form.value.informacionBasica.nominalTension ?
            form.value.informacionBasica.nominalTension.substationConfigurationId : null;

        this.stageProjectId = form.value.informacionBasica.stageProject ?
            form.value.informacionBasica.stageProject.id : null;

        this.busbarName = form.value.informacionBasica.busbarName ?
            form.value.informacionBasica.busbarName : '';

        this.busbarNumber = form.value.informacionBasica.busbarNumber ?
            form.value.informacionBasica.busbarNumber : 0;

        this.ownerAgent = form.value.informacionBasica.owner ?
            '' + form.value.informacionBasica.owner.codigoAgente : '';
        // '' + 1 : ''; // esto esta quemado

        this.operatingAgent = form.value.informacionBasica.operator ?
            '' + form.value.informacionBasica.operator.codigoAgente : '';
        // '' + 1 : ''; // esto esta quemado

        // datosTecnicos

        this.elementPerProjectStageInstanceId = form.value.datosTecnicos.elementPerProjectStageInstanceId ?
        form.value.datosTecnicos.elementPerProjectStageInstanceId : null,

        this.tensionDiseno = form.value.datosTecnicos.tensionDiseno ?
            form.value.datosTecnicos.tensionDiseno : '';

        this.capacidadCorrienteNominal = form.value.datosTecnicos.currentCapacity ?
            form.value.datosTecnicos.currentCapacity : '';

        this.busbarEncapsulated = form.value.datosTecnicos.encapsulatedBusbar === 'true' ? 1 : 0;

        // datos Administrativos
        if ('datosAdministrativos' in form.value) {
            this.stnHerope = form.value.datosAdministrativos.Herope === 'stnHerope' ? 1 : 0;
            this.strHerope = form.value.datosAdministrativos.Herope === 'strHerope' ? 1 : 0;
            this.stnCommercial = form.value.datosAdministrativos.Commercial === 'stnCommercial' ? 1 : 0;
            this.strCommercial = form.value.datosAdministrativos.Commercial === 'strCommercial' ? 1 : 0;
            this.consignable = form.value.datosAdministrativos.consignable ? 1 : 0;
        }

        if ('Vigencia' in form.value) {
            this.versionComments = form.value.Vigencia.versionComments ? form.value.Vigencia.versionComments : null;
            this.fpo = form.value.Vigencia.fpo ? form.value.Vigencia.fpo : '';
            this.energizedOn = form.value.Vigencia.fpo ? form.value.Vigencia.fpo : '';
        }

        if ('Justificacion' in form.value) {
            this.justificacion = form.value.Justificacion.justificacion ? form.value.Justificacion.justificacion : '';
        }


        // el siguiente set se usa solo para Solicitudes de cambio al perder de vista
        // el id de proyecto y la capacidad de traer un objeto XMStagePerSubstation
        // ver linea 671 const stage = this.project.stages.find(el => el.id === this.object.stageProjectId);
        // stage estará undefines para Solicitud pero tendra datos para editar
        if (!this.stageProjectId) {
            this.stageProjectId = form.value.stageProjectId ?
                form.value.stageProjectId : null;
        }

        this.username = 'xmuserFront';
        this.recordState = this.recordState ? this.recordState : AssetsStateEnum.INPROCESS;
        this.RecordState = !this.recordState ? AssetsStateEnum.INPROCESS : this.recordState;

        this.busbarSection = [];
        if (!form.value.datosTecnicos.sectionsBusbar.length) {
            this.setConfiguration(form.value.datosTecnicos);
        } else {
            this.setConfigurations(form.value.datosTecnicos.sectionsBusbar);
        }
        if ('deletedSections' in form.value) {
            this.setConfigurations(form.value.deletedSections);
        }
        // this.setConfiguration(form.value.datosTecnicos);
        // this.setConfigurationDelete(form.value);

    }

    setConfiguration(datosTecnicos: any): void {

        this.busbarSection.push({
            elementPerProjectStageInstanceId: datosTecnicos.elementPerProjectStageInstanceId ?
                datosTecnicos.elementPerProjectStageInstanceId : null,
            busbarSectionInstanceId: datosTecnicos.busbarSectionInstanceId ?
                datosTecnicos.busbarSectionInstanceId : null,
            busbarSectionName: `${this.busbarName} seccion`,
            shortCircuitCapacity: datosTecnicos.shortCircuitCapacity ?
                datosTecnicos.shortCircuitCapacity : null,
            remove: datosTecnicos.remove ? true : false
        });
    }

    setConfigurations(sectionsBusbar: any): void {
        // tslint:disable-next-line: forin
        for (const key in sectionsBusbar) {
            const section = {
                elementPerProjectStageInstanceId: sectionsBusbar[key].elementPerProjectStageInstanceId ?
                    sectionsBusbar[key].elementPerProjectStageInstanceId : null,

                busbarSectionInstanceId: sectionsBusbar[key].busbarSectionInstanceId ?
                    sectionsBusbar[key].busbarSectionInstanceId : null,

                busbarSectionName: sectionsBusbar[key].sectionName ?
                    sectionsBusbar[key].sectionName : null,

                shortCircuitCapacity: sectionsBusbar[key].shortCircuit ?
                    sectionsBusbar[key].shortCircuit : null,

                remove: sectionsBusbar[key].remove ?
                    sectionsBusbar[key].remove : false,
            };
            this.busbarSection.push(section);
        }
    }

    addObject(
        busBarService: BusBarService,
        messageService: MessageService,
        router: Router,
        project: any,
        modal: any
    ) {
        // console.log(this);
        // return;

        const message = this.busbarInstanceId ?
            'Fué editada la barra:  exitosamente.' :
            'Fué creada la barra:  exitosamente.';

        busBarService.addBusBarBK(this)
            .subscribe(busbarrequest => {
                modal.close(''); // para cerrar el modal
                messageService.openSuccess({ title: '', text: message });
                if ('projectId' in project) {
                    router.navigate(['/activos-transmision/' + project.projectId]);
                    busBarService.newBusBarControl({}, busbarrequest); // emito nueva barra
                } else {
                    // control para solicitud de cambio
                    if ('control' in this) {
                        if (this.control === 'Solicitud') {
                            router.navigate(['/assets-operation']);
                        }
                    }
                }

            }, (error: HttpErrorResponse) => {

                if (error.status === 422) {
                    messageService.openError(
                        {
                            title: ' No se ha podido finalizar el envío: ',
                            text: error.error.Errors[0].Message
                        });
                } else {

                    if (error.status === 404 || error.status === 400 || error.status === 500) {
                        messageService.openError(
                            {
                                title: 'No se ha podido finalizar el envío: ',
                                text: error.message,
                            });
                    } else {
                        // tslint:disable-next-line: max-line-length
                        messageService.openError(
                            {
                                title: 'No se ha podido finalizar el envío: ',
                                text: error.error.Errors[0].Message,
                            });
                    }

                }
            });
    }
}
