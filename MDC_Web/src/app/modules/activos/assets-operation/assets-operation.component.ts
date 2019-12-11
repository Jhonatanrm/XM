import { Component, OnInit, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { MessageService } from '@shared/services/message.service';
import { Router } from '@angular/router';
import { BusBarService } from '@shared/services/proyect-entry/busbar.service';
import { AssetsOperationService } from '@shared/services/assets-operation/assets-operation.service';
import { saveAs, importedSaveAs } from 'file-saver';
import { SweetAlertResult } from 'sweetalert2';

@Component({
    selector: 'app-assets-operation',
    templateUrl: './assets-operation.component.html'
})

export class AssetsOperationComponent implements OnInit, OnChanges {

    wait: boolean; // Para el envio de informacion
    selectedType: any;
    selectedSubstation: any;
    controlValue: any;
    tittle: string;
    text: any;
    project: any;
    Form: FormGroup;
    flagButtonView: boolean;
    isValid: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activosService: ActivosTransmisionService,
        private assetsOperationService: AssetsOperationService,
        private busbarService: BusBarService,
        private messageService: MessageService
    ) {
        this.tittle = 'Activos en operación';
        this.text = `Consulta los parámetros de los
        activos que se encuentran en operación,
        en las acciones adicionales podrás visualizar
        una solicitud de cambio de párametros ante el CND.`;
        this.isValid = true;
    }
    ngOnInit() {
        this.Form = this.fb.group({});
    }

    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    }

    // FUNCIONES ESPECIALES DE ASIGNACION VIEW
    setSubestation(flagDisabled: boolean, control: string) {
        // a esta altura ya no importa le proyecto
        this.flagButtonView = flagDisabled;
        this.project = {
            projectFpo: '', version: { versionNumber: '', validFrom: '', validTo: '' }, stages: [''], subArea: { area: { id: null } }
        };
        switch (control) {
            case 'Mostrar':
                this.Form = this.fb.group({
                    informacionBasica: this.fb.group({
                        substationName: [{ value: '', disabled: flagDisabled }],
                        XMStagePerSubstation: [{ value: '', disabled: flagDisabled }],
                        latitude: [{ value: '', disabled: flagDisabled }],
                        longitude: [{ value: '', disabled: flagDisabled }],
                        DivisionPoliticaDepartamento: [{ value: '', disabled: flagDisabled }],
                        DivisionPoliticaMunicipio: [{ value: '', disabled: flagDisabled }],
                        SubArea: [{ value: '', disabled: flagDisabled }],
                        AreaProyecto: [{ value: '', disabled: flagDisabled }]
                    }),
                    datosTecnicos: this.fb.group({
                        subestationConfiguration: this.fb.array([]),
                    }),
                    datosAdministrativos: this.fb.group({
                        consignable: [{ value: '', disabled: flagDisabled }],
                        Herope: [{ value: '', disabled: flagDisabled }],
                        Commercial: [{ value: '', disabled: flagDisabled }],
                    }),
                    Vigencia: this.fb.group({
                        versionComments: [{ value: '', disabled: flagDisabled }],
                    })
                });

                break;
            case 'Solicitud':
                this.Form = this.fb.group({
                    informacionBasica: this.fb.group({
                        substationName: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        XMStagePerSubstation: [{ value: '', disabled: flagDisabled }, { validators: [] }],
                        latitude: [{ value: '', disabled: flagDisabled },
                        {
                            validators:
                                [
                                    Validators.required,
                                    Validators.min(-90), Validators.max(90),
                                    Validators.maxLength(5)
                                ]
                        }],
                        longitude: [{ value: '', disabled: flagDisabled },
                        {
                            validators:
                                [
                                    Validators.required,
                                    Validators.min(-180),
                                    Validators.max(180),
                                    Validators.maxLength(5)
                                ]
                        }],
                        DivisionPoliticaDepartamento: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        DivisionPoliticaMunicipio: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        SubArea: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        AreaProyecto: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }]
                    }),
                    datosTecnicos: this.fb.group({
                        subestationConfiguration: this.fb.array([], { validators: [Validators.required] }),
                    })
                });
                break;
            default:
                break;
        }
    }

    setBarra(flagDisabled: boolean, control: string) {
        // a esta altura ya no importa le proyecto
        this.project = {
            projectFpo: '', version: { versionNumber: '', validFrom: '', validTo: '' }, stages: [''], subArea: { area: { id: null } }
        };
        switch (control) {
            case 'Mostrar':
                this.Form = this.fb.group({
                    informacionBasica: this.fb.group({
                        busbarName: [{ value: '', disabled: flagDisabled }],
                        subestation: [{ value: '', disabled: flagDisabled }],
                        stageProject: [{ value: '', disabled: flagDisabled }],
                        nominalTension: [{ value: '', disabled: flagDisabled }],
                        busbarNumber: [{ value: '', disabled: flagDisabled }],
                        owner: [{ value: '', disabled: flagDisabled }],
                        operator: [{ value: '', disabled: flagDisabled }]
                    }),
                    datosTecnicos: this.fb.group({
                        tensionDiseno: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        currentCapacity: [{ value: '', disabled: flagDisabled }],
                        encapsulatedBusbar: [{ value: '', disabled: flagDisabled }],
                        sectionedBusbar: [{ value: '', disabled: flagDisabled }],
                        sectionsBusbar: this.fb.array([], { validators: [Validators.required] }),
                        shortCircuitCapacity: [{ value: '', disabled: flagDisabled }],
                        elementPerProjectStageInstanceId: [{ value: '', disabled: flagDisabled }],
                        busbarSectionInstanceId: [{ value: '', disabled: flagDisabled }],
                        remove: [{ value: '', disabled: flagDisabled }],
                    }),
                    datosAdministrativos: this.fb.group({
                        consignable: [{ value: '', disabled: flagDisabled }],
                        Herope: [{ value: '', disabled: flagDisabled }],
                        Commercial: [{ value: '', disabled: flagDisabled }],
                    }),
                    Vigencia: this.fb.group({
                        versionComments: [{ value: '', disabled: flagDisabled }],
                        fpo: [{ value: '', disabled: flagDisabled }],
                    })
                });
                break;
            case 'Solicitud':
                this.Form = this.fb.group({
                    informacionBasica: this.fb.group({
                        busbarName: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        subestation: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        stageProject: [{ value: '', disabled: flagDisabled }, { validators: [] }],
                        nominalTension: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        busbarNumber: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        owner: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        operator: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }]
                    }),
                    datosTecnicos: this.fb.group({
                        tensionDiseno: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        currentCapacity: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        encapsulatedBusbar: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        sectionedBusbar: [{ value: '', disabled: flagDisabled }, { validators: [Validators.required] }],
                        sectionsBusbar: this.fb.array([]),
                        shortCircuitCapacity: [{ value: '', disabled: flagDisabled }],
                        elementPerProjectStageInstanceId: [{ value: '', disabled: flagDisabled }],
                        busbarSectionInstanceId: [{ value: '', disabled: flagDisabled }],
                        remove: [{ value: '', disabled: flagDisabled }],
                    })
                });
                break;
            default:
                break;
        }
    }

    selectedFilters(evt: any) {
        this.selectedType = evt.assetType;
        this.selectedSubstation = evt.substation;
        this.controlValue = evt.controlValue;

        // habilita o deshabilita el boton de reporte
        this.isValid = this.selectedType ? false : true;
    }

    // Una de las llamadas ante click en boton de la tabla
    controlModalOption(evt: any) {
        switch (evt.row.row.assetType) {
            case 'Subestación':
                this.setSubestation(!evt.view, evt.row.buttonElement.buttonName);
                break;
            case 'Barra':
                this.setBarra(!evt.view, evt.row.buttonElement.buttonName);
                break;
            default:
                break;
        }
    }

    // se llama en onSubmit
    selctService(evt: any) {
        switch (evt.component) {
            case 'app-subestacion-crear':
                switch (evt.subasset) {
                    case 'createSubestacion': return this.activosService;
                    case 'createBarra': return this.busbarService;
                    default: return this.activosService;
                }
            default: return this.activosService;
        }
    }

    // Evento clik en boton de reporte
    sendReport(evt: any): void {
        this.isValid = true;

        this.messageService.openSuccessInput({ title: '', text: 'message' }, 'hello')
            .then((value: SweetAlertResult) => {
                console.log(value);
                if (value.value) {

                }
            });
        // Consumo de servicio para descarga de archivo

        this.assetsOperationService.getReportExcelExport('').subscribe(
            res => {
                this.isValid = false;

                // PARA EL CONSUMO DE SERVICIO TIPO BLOD
                const blob = new Blob([res.body], { type: 'application/vnd.ms.excel' });
                const file = new File([blob], `Subestaciones.xlsx`, { type: 'application/vnd.ms.excel' });
                saveAs(file);

            },
            (err) => {
                console.error(err);
            }
        );

    }

    onSubmit(evt: any) {
        if (this.Form.valid) {
            if (evt.object.validControl(this.Form, 'controls')) {
                // Solo guardamos si almenos tiene el nombre de la subestacion
                this.wait = !this.wait;
                // Guardado
                evt.object.setObject(this.Form);
                this.wait = !this.wait;
                evt.object.addObject(
                    this.selctService(evt), // este no se debe enviar - Marcado para Morir
                    this.messageService,
                    this.router,
                    this.project,
                    evt.modal);
                // construccion de objeto
            }
        }
    }
}
