import { FormGroup } from '@angular/forms';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { MessageService } from '@shared/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AssetsStateEnum } from '@core/entry-projects/enums/assets-state.enum';

export interface ISubestacion {
    substationMRID?: number; // PK
    substationInstanceId?: number;
    elementId?: number;
    elementPerProjectStageInstanceId?: number;
    substationName?: string;
    substationCode?: string;
    latitude?: number;
    longitude?: number;
    geographicLocation?: number; // FK
    subArea?: number;
    subAreaId?: number;
    stageProjectId?: number;
    recordState?: number;
    stnHerope?: number;
    strHerope?: number;
    stnCommercial?: number;
    strCommercial?: number;
    energizedOn?: string;
    fpo?: string;
    state?: string;
    version?: string;
    consignable?: number;
    versionComments?: string;
    username?: string;
    complete?: number;
    RecordState?: number;
    control?: string;
    justificacion?: string;
}

export class Subestacion implements ISubestacion {
    substationInstanceId: number;
    elementPerProjectStageInstanceId: number;
    substationName: any;
    substationCode: any;
    latitude: any;
    longitude: any;
    geographicLocation: any;
    subArea: any;
    subAreaId: number;
    stageProjectId: number;
    recordState: number;
    stnHerope: any;
    strHerope: any;
    stnCommercial: any;
    strCommercial: any;
    consignable: any;
    energizedOn: any;
    fpo?: any;
    state?: string;
    version?: string;
    versionComments: any;
    username: any;
    complete: number;
    substationConfiguration: any[]; // Array<any> Array<T>
    RecordState: number;
    control: string;
    justificacion: string;
    elementId: number;

    constructor(object?: any, control?: string) {

        this.substationConfiguration = [];
        // se setean todo los atributos
        if (!object) { return; }
        // set
        this.substationInstanceId = object.substationInstanceId;
        this.elementPerProjectStageInstanceId = object.elementPerProjectStageInstanceId;
        this.substationName = object.substationName;
        // this.substationCode = object.substationCode;
        this.latitude = object.latitude;
        this.longitude = object.longitude;
        this.geographicLocation = object.geographicLocation;
        this.subAreaId = object.subAreaId;
        this.stageProjectId = object.stageProjectId;
        this.recordState = object.recordState;
        this.stnHerope = object.stnHerope;
        this.fpo = object.fpo;
        this.energizedOn = object.energizedOn;
        this.strHerope = object.strHerope;
        this.stnCommercial = object.stnCommercial;
        this.strCommercial = object.strCommercial;
        this.consignable = object.consignable;
        this.username = object.username;
        this.state = object.state;
        this.version = object.version;
        this.versionComments = object.versionComments;
        this.substationConfiguration = object.substationConfiguration;
        this.control = control ? control : null; // Es el control de solicitud de cambio y editar
        this.elementId = object.elementId ? object.elementId : null;
    }

    validControl(form: FormGroup, controls?: string): boolean {

        if (form.controls.informacionBasica[controls].substationName.valid &&
            form.controls.informacionBasica[controls].XMStagePerSubstation.valid &&
            form.controls.datosTecnicos[controls].subestationConfiguration.valid) {
            return true;
        }

        // Tocamos el formulario
        form.controls.informacionBasica.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].substationName.markAsTouched({ onlySelf: true });
        form.controls.informacionBasica[controls].XMStagePerSubstation.markAsTouched({ onlySelf: true });

        form.controls.datosTecnicos.markAsTouched({ onlySelf: true });
        // tslint:disable-next-line: forin
        for (const key in form.controls.datosTecnicos[controls].subestationConfiguration[controls]) {
            // tslint:disable-next-line: forin
            for (const key2 in form.controls.datosTecnicos[controls].subestationConfiguration[controls][key][controls]) {
                // tslint:disable-next-line: max-line-length
                form.controls.datosTecnicos[controls].subestationConfiguration[controls][key][controls][key2].markAsTouched({ onlySelf: true });
            }
        }
        return false;
    }

    setObject(form: FormGroup, id?: number): void {

        this.elementId = form.value.elementId ?
            form.value.elementId : null;

        this.elementPerProjectStageInstanceId = form.value.elementPerProjectStageInstanceId ?
            form.value.elementPerProjectStageInstanceId : null;

        this.stageProjectId = form.value.informacionBasica.XMStagePerSubstation ?
            form.value.informacionBasica.XMStagePerSubstation.id : 0;

        // el siguiente set se usa solo para Solicitudes de cambio al perder de vista
        // el id de proyecto y la capacidad de traer un objeto XMStagePerSubstation
        // ver linea 503 const stage = this.project.stages.find(el => el.id === this.object.stageProjectId);
        // stage estará undefines para Solicitud pero tendra datos para editar
        if (!this.stageProjectId) {
            this.stageProjectId = form.value.stageProjectId ?
                form.value.stageProjectId : null;
        }

        this.substationName = form.value.informacionBasica.substationName ?
            form.value.informacionBasica.substationName : '';

        this.substationCode = this.substationName;
        this.latitude = form.value.informacionBasica.latitude ? form.value.informacionBasica.latitude : 0;
        this.longitude = form.value.informacionBasica.longitude ? form.value.informacionBasica.longitude : 0;
        // tslint:disable-next-line: max-line-length
        this.geographicLocation = form.value.informacionBasica.DivisionPoliticaMunicipio ? form.value.informacionBasica.DivisionPoliticaMunicipio.id : 15366;
        this.subAreaId = form.value.informacionBasica.SubArea ? form.value.informacionBasica.SubArea.id : 0;

        if ('datosAdministrativos' in form.value) {
            this.stnHerope = form.value.datosAdministrativos.Herope === 'stnHerope' ? 1 : 0;
            this.strHerope = form.value.datosAdministrativos.Herope === 'strHerope' ? 1 : 0;
            this.stnCommercial = form.value.datosAdministrativos.Commercial === 'stnCommercial' ? 1 : 0;
            this.strCommercial = form.value.datosAdministrativos.Commercial === 'strCommercial' ? 1 : 0;
            this.consignable = form.value.datosAdministrativos.consignable ? 1 : 0;
        }

        if ('Vigencia' in form.value) {
            this.energizedOn = form.value.Vigencia.fpo ? form.value.Vigencia.fpo : '';
            this.fpo = form.value.Vigencia.fpo ? form.value.Vigencia.fpo : '';
            this.versionComments = form.value.Vigencia.versionComments ? form.value.Vigencia.versionComments : null;
        }

        if ('Justificacion' in form.value) {
            this.justificacion = form.value.Justificacion.justificacion ? form.value.Justificacion.justificacion : '';
        }
        this.username = 'xmuserFront';
        this.RecordState = !this.recordState ? AssetsStateEnum.INPROCESS : this.recordState;

        // seteamos antes de empezar
        this.substationConfiguration = [];
        this.setConfiguration(form.value.datosTecnicos.subestationConfiguration, id, false);
        if (form.value.deletedConfigs) {
            this.setConfiguration(form.value.deletedConfigs, id, true);
        }
    }

    setConfiguration(subestationConfiguration: any, id?: number, isremove?: boolean): void {

        // tslint:disable-next-line: forin
        for (const key in subestationConfiguration) {
            if (isremove && !subestationConfiguration[key].SubstationConfigurationInstanceId) {
                break;
            }
            const config = {
                substationConfigurationInstanceId: subestationConfiguration[key].SubstationConfigurationInstanceId ?
                    subestationConfiguration[key].SubstationConfigurationInstanceId : null,

                shortCircuitCapacity: 0,

                substationConfigurationId: subestationConfiguration[key].SubstationConfigurationKind ?
                    subestationConfiguration[key].SubstationConfigurationKind.codeValue : null,

                voltageLevelId: subestationConfiguration[key].VoltageLevelKind ?
                    subestationConfiguration[key].VoltageLevelKind.codeValue : null,

                diagramUrl: subestationConfiguration[key].unifilarDiagram ?
                    subestationConfiguration[key].unifilarDiagram : null,

                remove: isremove,
            };
            this.substationConfiguration.push(config);
        }
    }

    addObject(
        activosService: ActivosTransmisionService,
        messageService: MessageService,
        router: Router,
        project: any,
        modal: any
    ) {

        let message = this.substationInstanceId ?
            'Fué editada la subestación:  exitosamente.' :
            'Fué creada la subestación:  exitosamente.';

        if (this.control === 'Solicitud') {
            message = 'Se ha enviado su solicitud de cambio: exitosamente.';
        }
        activosService.addSubestacionBK(this)
            .subscribe(subestacionrequest => {
                modal.close(''); // para cerrar el modal
                messageService.openSuccess({ title: '', text: message });
                if ('projectId' in project) {
                    if (project.projectId) {
                        router.navigate(['/activos-transmision/' + project.projectId]);
                    }
                } else {
                    // control para solicitud de cambio
                    if ('control' in this) {
                        if (this.control === 'Solicitud') {
                            router.navigate(['/assets-operation']);
                        }
                    }
                }
                activosService.newSubestacionControl({}, subestacionrequest); // emito nueva subestacion
                // console.log(subestacionrequest);
            }, (error: HttpErrorResponse) => {
                console.log(this);
                console.log(error);
                if (error.status === 422) {
                    messageService.openError(
                        {
                            title: ' No se ha podido finalizar el envío: ',
                            text: error.error.Errors[0].Message
                        });
                } else {
                    // tslint:disable-next-line: max-line-length
                    messageService.openError(
                        {
                            title: 'No se ha podido finalizar el envío: ',
                            text: error.message,
                        });
                }
            });
    }
}
