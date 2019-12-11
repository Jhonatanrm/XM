import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ValidateComponent } from '@shared/components/validate/validate.component';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { GeneralList } from '@core/entry-projects/model/IGeneralList';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';
import { BusBarService } from '@shared/services/proyect-entry/busbar.service';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IFileXM } from '@shared/model/file-xm.model';
import { Util } from '@shared/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewFileXmComponent } from '@shared/components/modal-view-file-xm/modal-view-file-xm.component';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { SlicePipePipe } from '@shared/pipes/slice-pipe/slice-pipe.pipe';
import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
import { AssetsOperationService } from '@shared/services/assets-operation/assets-operation.service';

@Component({
  selector: 'app-barra-crear',
  templateUrl: './barra-crear.component.html',
  providers: [LowercaseFormsPipe, ProjectPipe, SlicePipePipe]
})

export class BarraCrearComponent implements OnChanges, OnInit {

  @Input() barraForm: FormGroup;
  @Input() project: ITransmisionProject;
  @Input() object: any;
  @Output() formControls = new EventEmitter();
  @Input() flagButtonView: boolean;
  @Input() ngbTabset: string;
  mapFormControls: any; // mapa de inputs al padre
  mapFormGroups: any[]; // mapa de grupos al padre
  projectFpo: string;
  energizedOn: string;

  subestations: any[];
  nominaltensions: any[];
  voltageLevelKinds: GeneralList[]; // de base, la lista completa
  configurationKinds: GeneralList[]; // de base, la lista completa
  swichSectionedBusbar: boolean;

  searchSubstation: any;
  searchFailedSubstation = false;
  formatterSubstation: any;

  searchOwner: any;
  searchFailedOwner = false;
  formatterOwner: any;
  assetState: string;
  assetVersion: string;

  searchOperator: any;
  searchFailedOperator = false;
  formatterOperator: any;

  // File Variables, solo para solicitud de cambio
  maxSizeFile = 20;  // hace referencia al tamaño máximo que tendrá cada archivo (MB)
  formartFile: string[] = [];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  maxLengthFile = 10;  // se refiere a el maximo de documentos admitidos
  arrayListFiles: IFileXM[] = [];  // lista de archivos
  isUnitTest = false;

  public validate: ValidateComponent;

  controlRequestChange: boolean; // para solicitud de cambio, switch para tabs

  constructor(
    private activosService: ActivosTransmisionService,
    private assetsOperationService: AssetsOperationService,
    private generalList: GeneralTypesService,
    private readonly promoterService: PromoterService,
    private busbarService: BusBarService,
    private messageService: MessageService,
    private masterData: MastereDataService,
    private readonly modalService: NgbModal) {

    this.controlRequestChange = false;
    this.flagButtonView = true;

  }

  public getActivosService() { return this.activosService; }
  public getGeneralListService() { return this.generalList; }
  public getMasterData() { return this.masterData; }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
  }

  ngOnInit(): void {
    // INICIALIZACION
    // comunicación con el buscador de inputs, anterior y siguiente
    this.ngbTabset = 'informacionBasica';
    this.validate = new ValidateComponent();
    this.setProjectFpo();

    this.autocompleteBehavior();

    // CONSUMO DE SERVICIOS
    this.VoltageLevelKinds(); // tipos de tension
    this.ConfigurationKinds(); // tipos de configuracion

    // CREACION DE FORMULARIO
    this.formCreate();

    // inicamos el map control para el buscador de input
    this.modalsMaps();

    // COMPORTAMIENTO
    this.onChangesForm();

    // COMPORTAMIENTO EDITAR
    this.setAttr();

    // COMPORTAMIENTO PARA SOLICITAR
    this.requestChange();

    // EMMITERS PRIMEROS
    // emite al padre modal para que cree su mapa de tabs
    // el setTimeout es porque no se entiende el LIFEcYCLE de Angular
    setTimeout(() => {
      this.formControls.emit({
        tab: this.ngbTabset,
        mapFormGroups: this.mapFormGroups,
        mapFormControls: this.mapFormControls
      });
    }, 0); // asincrona
  }
  // INICIALIZACION
  setProjectFpo() {
    // si no tiene etapas
    if (!this.project.hasStages) {
      this.projectFpo = this.energizedOn = this.project.projectFpo.slice(0, this.project.projectFpo.indexOf('T'));
    }
  }

  formCreate(): void {
    this.barraForm.addControl('informacionBasica', new FormGroup({
      busbarName: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
      subestation: new FormControl(null, { validators: [Validators.required] }),
      stageProject: new FormControl(
        this.project.stages[0],
        { validators: [Validators.required], updateOn: 'blur' }),
      nominalTension: new FormControl(null, { validators: [Validators.required] }),
      // { value: '', disabled: true }
      busbarNumber: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
      owner: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
      operator: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' })
    }));

    this.barraForm.addControl('datosTecnicos', new FormGroup({
      tensionDiseno: new FormControl(
        '',
        { validators: [Validators.required, Validators.min(10), Validators.max(700), Validators.maxLength(8)] }),
      currentCapacity: new FormControl('', { validators: [Validators.required, Validators.min(0)] }),
      encapsulatedBusbar: new FormControl('false', { validators: [] }),
      sectionedBusbar: new FormControl('false', { validators: [] }),
      sectionsBusbar: new FormArray([], {}),
      shortCircuitCapacity: new FormControl('', { validators: [Validators.required, Validators.min(0)] }),
      elementPerProjectStageInstanceId: new FormControl(null, { validators: [] }),
      busbarSectionInstanceId: new FormControl(null, { validators: [] }),
      remove: new FormControl(null, { validators: [] }),
    }));

    this.barraForm.addControl('datosAdministrativos', new FormGroup({
      consignable: new FormControl('', { validators: [] }),
      Herope: new FormControl('', { validators: [] }),
      Commercial: new FormControl('', { validators: [] }),
    }));

    this.barraForm.addControl('Vigencia', new FormGroup({
      versionComments: new FormControl(this.project.version.comments, { validators: [], updateOn: 'blur' }),
      fpo: new FormControl(
        this.project.projectFpo.slice(0, this.project.projectFpo.indexOf('T')),
        { validators: [], updateOn: 'blur' })
    }));

    this.barraForm.addControl('deletedSections', new FormArray([], {}));

  }

  autocompleteBehavior(): void {
    // variable de entrada para el selector tipo automonplete de subestaciones
    this.searchSubstation = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.length < 2 ? []
          : this.activosService.getSubestationKeyNoObBK(term).pipe(
            // : this.assetsOperationService.getSubestationsInOperationBk(term, null).pipe(
            tap(() => this.searchFailedSubstation = false),
            catchError(() => {
              this.searchFailedSubstation = true;
              return of([]);
            }))
        )
      );
    // variable de entrada para el selector tipo automonplete
    this.formatterSubstation = (x: { substationName: string }) => x.substationName;
    // this.formatterSubstation = (x: { assetName: string }) => x.assetName;

    // variable de entrada para el selector tipo automonplete de promotor
    this.searchOwner = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.length < 2 ? []
          : this.masterData.getAgentsByKey(term, 'owner').pipe(
            tap(() => this.searchFailedOwner = false),
            catchError(() => {
              this.searchFailedOwner = true;
              return of([]);
            }))
        )
      );
    // variable de entrada para el selector tipo automonplete
    this.formatterOwner = (x: { nombreAgente: string }) => x.nombreAgente;

    // variable de entrada para el selector tipo automonplete de agente
    this.searchOperator = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.length < 2 ? []
          : this.masterData.getAgentsByKey(term, 'agent').pipe(
            tap(() => this.searchFailedOperator = false),
            catchError(() => {
              this.searchFailedOperator = true;
              return of([]);
            }))
        )
      );
    // variable de entrada para el selector tipo automonplete
    this.formatterOperator = (x: { nombreAgente: string }) => x.nombreAgente;
  }

  modalsMaps(): void {
    // inicamos el map control para el buscador de input
    this.mapFormControls = {
      busbarName: 'Nombre de la barra',
      subestation: 'Subestación',
      nominalTension: 'Tensión nominal de operación',
      busbarNumber: 'Número de la barra',
      owner: 'Propietario',
      operator: 'Operador',
      tensionDiseno: 'Tensión de diseño',
      currentCapacity: 'Capacidad de corriente nominal',
      encapsulatedBusbar: 'Barra encapsulada GIS',
      sectionsBusbar: 'Barra seccionada',
      Herope: 'Es activo STN ó STR Herope',
      Commercial: 'Es activo comercial STN ó STR',
      versionComments: 'Observaciones',
    };

    if (this.project.hasStages) {
      this.mapFormControls = {
        stageProject: 'Etapa del proyecto',
      };
    }

    this.mapFormGroups = [
      'informacionBasica', 'datosTecnicos', 'datosAdministrativos', 'Vigencia'
    ];

    if (this.objectControl()) {
      // puede ser Mostrar o Solicitar
      if (this.object.control === 'Solicitud') {
        this.mapFormGroups = [
          'informacionBasica',
          'datosTecnicos',
          'Justificacion'
        ];

        this.mapFormControls = {
          busbarName: 'Nombre de la barra',
          subestation: 'Subestación',
          nominalTension: 'Tensión nominal de operación',
          busbarNumber: 'Número de la barra',
          owner: 'Propietario',
          operator: 'Operador',
          tensionDiseno: 'Tensión de diseño',
          currentCapacity: 'Capacidad de corriente nominal',
          encapsulatedBusbar: 'Barra encapsulada GIS',
          sectionsBusbar: 'Barra seccionada',
          justificacion: 'justificacion'
        };

        if (this.project.hasStages) {
          this.mapFormControls.stageProject = 'Etapa';
        }
      }
    }

  }

  // CONSUMO DE SERVICIOS

  // Consulta las configuraciones de una subestacion
  getConfigurations(id: number, act: boolean) {
    this.activosService
      .getSubestationBK(id, act)
      .subscribe(reqsubestation => {
        this.nominaltensions = [];
        // blanquemos los datos
        this.barraForm.get('informacionBasica').patchValue({
          nominalTension: null
        });

        // tslint:disable-next-line: forin
        for (const key in reqsubestation.substationConfiguration) {

          // buscamos los el tipo de configuracion
          let configuration: any;
          configuration = this.configurationKinds.find(
            el => +el.codeValue === reqsubestation.substationConfiguration[key].substationConfigurationId);

          // buscamos los el tipo de voltaje
          let voltage: any;
          voltage = this.voltageLevelKinds.find(el => +el.codeValue === reqsubestation.substationConfiguration[key].voltageLevelId);
          this.nominaltensions.push({
            substationConfigurationId: reqsubestation.substationConfiguration[key].substationConfigurationInstanceId,
            configurationKind: configuration.detailValue,
            voltageLevelKind: voltage.detailValue,
            full_config: `${voltage.detailValue} kV`
          });
        }
        this.setNominalTension();
      },
        (err) => console.error(err.error.message));
    return;
  }

  ConfigurationKinds(): void {
    this.generalList
      .getGeneralList('ConfiguracionSubestacion')
      .subscribe(configuracionsubestacion => {
        this.configurationKinds = configuracionsubestacion;
      },
        (err) => console.error(err.error.message)
      );
  }

  VoltageLevelKinds(): void {
    this.generalList
      .getGeneralList('NivelTension')
      .subscribe(configuracionsubestacion => {
        this.voltageLevelKinds = configuracionsubestacion;
      },
        (err) => console.error(err.error.message),
      );
  }

  // numero de barras para una configuracion
  countBusBar(id: number) {
    if (this.object.busbarInstanceId) { return; }

    this.busbarService
      .countBusBarByNominalTension(id)
      .subscribe(busbarcont => {
        this.barraForm.get('informacionBasica').patchValue({
          busbarNumber: +busbarcont + 1
        });
        this.busbarNameConstructor();
      },
        (err) => console.error(err),
        () => this.setNumber()
      );
  }

  // COMPORTAMIENTO
  onChangesForm() {
    this.barraForm.get('informacionBasica').get('subestation').valueChanges.subscribe(val => {
      this.busbarNameConstructor();
      if (!val) {
        this.barraForm.get('informacionBasica').patchValue({
          nominalTension: null
        });
      }
    });

    this.barraForm.get('informacionBasica').get('nominalTension').valueChanges.subscribe(val => {
      if (val) {
        this.countBusBar(val.substationConfigurationId);
      }
    });

    this.barraForm.get('informacionBasica').get('stageProject').valueChanges.subscribe(val => {
      if (val) {
        this.projectFpo = this.energizedOn = val.fpoDate.slice(0, val.fpoDate.indexOf('T'));
        this.barraForm.get('datosTecnicos').patchValue({
          fpo: this.projectFpo
        });
      } else {
        this.barraForm.get('datosTecnicos').patchValue({
          fpo: null
        });
      }
    });

    // selector de secciones
    this.barraForm.get('datosTecnicos').get('sectionedBusbar').valueChanges.subscribe(val => {

      if (this.barraForm.get('datosTecnicos').get('sectionedBusbar').value === 'true') {
        // si ya tiene elementos entonces no reconstruye
        if (!this.barraForm.get('datosTecnicos').get('sectionsBusbar').value.length) {
          this.addBusBarSectionElementComponent();
          this.addBusBarSectionElementComponent();
        }
        this.barraForm.get('datosTecnicos').get('shortCircuitCapacity').disable();
        this.swichSectionedBusbar = true;
      } else {
        // borramos solo si no hay datos en los imputs
        let sectionsdelete = false;
        const arraySections = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
        for (const keyas in arraySections.controls) {
          if (
            arraySections.at(+keyas).value.sectionName !== '' &&
            arraySections.at(+keyas).value.sectionName !== null &&
            arraySections.at(+keyas).value.sectionName !== undefined ||
            (
              arraySections.at(+keyas).value.shortCircuit !== '' &&
              arraySections.at(+keyas).value.shortCircuit !== null &&
              arraySections.at(+keyas).value.shortCircuit !== undefined
            )) {
            sectionsdelete = true;
          }
        }

        // borramos todos las secciones
        if (sectionsdelete) {
          this.messageService.openGeneralConfirm('¿Esta seguro que la barra no tiene más de una sección?')
            .then((value: SweetAlertResult) => {
              if (value.value) {
                const array = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
                while (array.length > 0) {

                  let arrayDeleted: FormArray;
                  if (this.object.busbarInstanceId) {
                    if (array.at(0).value.busbarSectionInstanceId) {
                      arrayDeleted = this.barraForm.get('deletedSections') as FormArray;
                      array.at(0).patchValue({ remove: true });
                      if (arrayDeleted) { arrayDeleted.push(array.at(0)); }
                    }
                  }

                  array.removeAt(0);
                }
                this.barraForm.get('datosTecnicos').get('shortCircuitCapacity').enable();
                this.swichSectionedBusbar = false;
              } else {
                // no borrar
                this.barraForm.get('datosTecnicos').patchValue({
                  sectionedBusbar: 'true'
                });
              }
            });
        } else {
          // borrado directo sin preguntar
          this.barraForm.get('datosTecnicos').get('sectionsBusbar').reset();
          const array = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
          while (array.length > 0) {
            array.removeAt(0);
          }
          this.barraForm.get('datosTecnicos').get('shortCircuitCapacity').enable();
          this.swichSectionedBusbar = false;
        }
      }
    });
  }

  // COMPORTAMIENTO DE AGREGAR
  // evento generado por el usuario
  addBusBarSectionElement(evt: { preventDefault: () => void; }): void {
    evt.preventDefault();
    const array = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
    array.push(this.createItem(array.length, {}));
  }

  // dentro del componente
  addBusBarSectionElementComponent(): void {
    const array = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
    array.push(this.createItem(array.length, {}));
  }

  createItem(length: number, item: any): FormGroup {

    if (item.busbarSectionInstanceId) {

      if (this.objectControl()) {
        if (this.object.control === 'Solicitud') { this.flagButtonView = true; }
        if (this.object.control === 'Mostrar') { this.flagButtonView = false; }
        if (this.object.control === 'Editar') { this.flagButtonView = true; }
      }
      return new FormGroup({
        sectionName: new FormControl({
          value: item.busbarSectionName,
          disabled: !this.flagButtonView
        }, { validators: [Validators.required] }),
        shortCircuit: new FormControl({
          value: item.shortCircuitCapacity,
          disabled: !this.flagButtonView
        }, { validators: [Validators.required, Validators.min(0)] }),
        elementPerProjectStageInstanceId: new FormControl(item.elementPerProjectStageInstanceId ?
          item.elementPerProjectStageInstanceId : null, {}),
        busbarSectionInstanceId: new FormControl(item.busbarSectionInstanceId ? item.busbarSectionInstanceId : null, {}),
        remove: new FormControl(item.remove ? true : false, {})
      });
    }
    const name = this.busbarNameSeccionConstructor(length);
    return new FormGroup({
      sectionName: new FormControl(name, { validators: [Validators.required] }),
      shortCircuit: new FormControl('', { validators: [Validators.required, Validators.min(0)] }),
    });

  }

  onDeleteSection(index: any, evt: { preventDefault: () => void; }) {
    evt.preventDefault();
    const array = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
    this.messageService.openGeneralConfirm('¿Esta seguro de eliminar la sección de barra?')
      .then((value: SweetAlertResult) => {
        if (value.value) {
          let arrayDeleted: FormArray;
          if (this.object.busbarInstanceId) {
            if (array.at(index).value.busbarSectionInstanceId) {
              arrayDeleted = this.barraForm.get('deletedSections') as FormArray;
              array.at(index).patchValue({ remove: true });
              if (arrayDeleted) { arrayDeleted.push(array.at(index)); }
            }
          }
          array.removeAt(index);
          // re-asignamos los valores a las secciones restantes
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < array.length; i++) {
            array.at(i).patchValue(
              {
                sectionName: this.busbarNameSeccionConstructor(i),
                shortCircuit: array.at(i).value.shortCircuit
              }
            );
          }
        }
      });
  }

  // COMPORTAMIENTO DE FORMULARIO DESDE TEMPLETE
  // ante la seleccion de un nombre de subestacion
  onSelectSubestation(evt: any) {
    this.barraForm.get('informacionBasica').patchValue({
      nominalTension: null
    });
    // solo para barras nuevas, no entras ni en la edición ni en la solicitud
    if (!this.objectIsSet) {
      this.barraForm.get('informacionBasica').patchValue({
        busbarNumber: null
      });
    }
    this.nominaltensions = [];
    // hacemos consulta de configuraciones una subestacion
    // Control de consulta (editar, mostrar, solicitar), dependiendo de pantalla    
    let contr = false;
    contr = this.object.isActive ? this.object.isActive : contr;
    contr = evt.recordState === 53 ? true : contr;
    if ('control' in this.object) {
      contr = this.object.control === 'Mostrar' || this.object.control === 'Solicitud' ? true : this.object.isActive;
    }
    this.getConfigurations(evt.item.substationInstanceId, contr);
  }

  onSelectOwner(evt: any) {

  }

  busbarNameConstructor() {

    if (this.object.busbarInstanceId) { return; }

    // primero lo nulifica
    this.barraForm.get('informacionBasica').patchValue({
      busbarName: null
    });

    // 1 asignamos nombre de Subestción
    this.barraForm.get('informacionBasica').patchValue({
      busbarName: this.barraForm.get('informacionBasica').get('subestation').value ?
        this.barraForm.get('informacionBasica').get('subestation').value.substationName :
        ''
    });

    this.barraForm.get('informacionBasica').patchValue({
      busbarName: this.barraForm.get('informacionBasica').get('busbarNumber').value ?
        // tslint:disable-next-line: max-line-length
        `${this.barraForm.get('informacionBasica').get('busbarName').value} ${this.barraForm.get('informacionBasica').get('busbarNumber').value}` :
        this.barraForm.get('informacionBasica').get('busbarName').value
    });

    this.barraForm.get('informacionBasica').patchValue({
      busbarName: this.barraForm.get('informacionBasica').get('nominalTension').value ?
        // tslint:disable-next-line: max-line-length
        `${this.barraForm.get('informacionBasica').get('busbarName').value} ${this.barraForm.get('informacionBasica').get('nominalTension').value.voltageLevelKind} kV` :
        this.barraForm.get('informacionBasica').get('busbarName').value
    });
  }

  busbarNameSeccionConstructor(index: number) {

    let name = ``;
    name =
      this.barraForm.get('informacionBasica').get('subestation').value ?
        `${name} ${this.barraForm.get('informacionBasica').get('subestation').value.substationName}` :
        `${name}`;

    name =
      this.barraForm.get('informacionBasica').get('busbarNumber').value ?
        `${name} ${this.barraForm.get('informacionBasica').get('busbarNumber').value}` :
        `${name}`;

    name = `${name} Sección ${index + 1}`;


    name =
      this.barraForm.get('informacionBasica').get('nominalTension').value ?
        `${name} ${this.barraForm.get('informacionBasica').get('nominalTension').value.voltageLevelKind} kV` :
        `${name}`;
    return name;

  }

  heropeClick(obj: any) {
    if (this.barraForm.get('datosAdministrativos').get('Herope').value === obj &&
      this.barraForm.get('datosAdministrativos').get('Herope').value != null) {
      this.barraForm.get('datosAdministrativos').patchValue({
        Herope: null
      });
    }
  }

  heroCommercialpeClick(obj: any) {
    if (this.barraForm.get('datosAdministrativos').get('Commercial').value === obj &&
      this.barraForm.get('datosAdministrativos').get('Commercial').value != null) {
      this.barraForm.get('datosAdministrativos').patchValue({
        Commercial: null
      });
    }
  }

  plantaTabChange(evt: any) {
    /* Al servicio de cambio de tab */
    this.ngbTabset = evt.nextId; this.formControls.emit(
      {
        tab: this.ngbTabset,
        mapFormGroups: this.mapFormGroups,
        // mapFormControls: this.mapFormControls
      }); // this.activosService.changeTabModalControl(evt);
  }

  onSubmit() {
    return;
  }

  // COMPORTAMIENTO EDITAR
  objectIsSet() {
    return 'busbarInstanceId' in this.object ? true : false;
  }

  async setAttr() {
    if (this.objectIsSet()) {
      // CONSULTAS
      const stage = this.project.stages.find(el => el.id === this.object.stageProjectId);
      this.setAgent(this.object.ownerAgent, 'owner');
      this.setAgent(this.object.operatingAgent, 'operator');
      this.assetState = this.object.state;
      this.assetVersion = this.object.version;

      // subestacion
      // Control de consulta (editar, mostrar, Solicitud)
      const contr: boolean = this.object.control === 'Mostrar' || this.object.control === 'Solicitud' ? true : this.object.isActive;

      // Llamado a configuraciones para asegurar su existencia
      await this.generalList.getGeneralList('ConfiguracionSubestacion').toPromise();

      this.activosService.getSubstationConfigurationKeyBK(this.object.substationConfigurationId, contr)
        .subscribe(
          sub => {
            this.object.subestation = sub;
            this.barraForm.get('informacionBasica').patchValue({ subestation: sub });
            this.getConfigurations(sub.substationInstanceId, contr);
          }
        );
      // promotor
      // this.promoterService.getPromotersByKey()
      // .subscribe();

      this.barraForm.addControl('busbarInstanceId', new FormControl(this.object.busbarInstanceId));
      this.barraForm.addControl('stageProjectId', new FormControl(this.object.stageProjectId));
      this.barraForm.addControl('elementId', new FormControl(this.object.elementId));
      this.barraForm.get('informacionBasica').patchValue({
        stageProject: stage,
        busbarName: this.object.busbarName,
        busbarNumber: this.object.busbarNumber ? this.object.busbarNumber : 1,
      });

      this.barraForm.get('datosTecnicos').patchValue({
        tensionDiseno: this.object.tensionDiseno ? this.object.tensionDiseno : '',
        currentCapacity: this.object.capacidadCorrienteNominal ? this.object.capacidadCorrienteNominal : '',
        encapsulatedBusbar: this.object.busbarEncapsulated ? `${this.object.busbarEncapsulated}` : 'false',
        sectionedBusbar: `${(this.object.busbarSection.length > 1)}`
      });

      if (this.object.busbarSection.length === 1) {
        this.barraForm.get('datosTecnicos').patchValue({
          shortCircuitCapacity: this.object.busbarSection[0].shortCircuitCapacity ?
            this.object.busbarSection[0].shortCircuitCapacity : '',
          elementPerProjectStageInstanceId: this.object.busbarSection[0].elementPerProjectStageInstanceId ?
            this.object.busbarSection[0].elementPerProjectStageInstanceId : null,
          busbarSectionInstanceId: this.object.busbarSection[0].busbarSectionInstanceId ?
            this.object.busbarSection[0].busbarSectionInstanceId : null,
          remove: this.object.busbarSection[0].remove ? true : false,
        });
      } else {
        const array = this.barraForm.get('datosTecnicos').get('sectionsBusbar') as FormArray;
        while (array.length > 0) { array.removeAt(0); }
        this.object.busbarSection.forEach((el: any) => array.push(this.createItem(null, el)));
      }

      if (this.barraForm.get('datosAdministrativos')) {
        if (this.object.strHerope) {
          this.barraForm.get('datosAdministrativos').patchValue({
            Herope: 'strHerope'
          });
        } else if (this.object.stnHerope) {
          this.barraForm.get('datosAdministrativos').patchValue({
            Herope: 'stnHerope'
          });
        }

        if (this.object.strCommercial) {
          this.barraForm.get('datosAdministrativos').patchValue({
            Commercial: 'strCommercial'
          });
        } else if (this.object.stnCommercial) {
          this.barraForm.get('datosAdministrativos').patchValue({
            Commercial: 'stnCommercial'
          });
        }

        if (this.object.consignable) {
          this.barraForm.get('datosAdministrativos').patchValue({
            consignable: this.object.consignable
          });
        }
      }


      if (this.barraForm.get('Vigencia')) {
        this.barraForm.get('Vigencia').patchValue({
          versionComments: this.object.versionComments
        });
      }
    }

    // REASIGNACIONES DE VARIABLES
    this.object.currentCapacity = this.object.capacidadCorrienteNominal;
    this.object.encapsulatedBusbar = this.object.busbarEncapsulated;

  }

  setNominalTension() {
    if (this.objectIsSet()) {
      const config = this.nominaltensions.find(el => el.substationConfigurationId === this.object.substationConfigurationId);
      this.barraForm.get('informacionBasica').patchValue({ nominalTension: config });
    }

  }

  setNumber() {
    if (this.objectIsSet()) {
      this.barraForm.get('informacionBasica').patchValue({
        busbarNumber: +this.barraForm.get('informacionBasica').get('busbarNumber').value - 1
      });
    }
  }

  setAgent(cod: string, type: string) {
    this.masterData.getAgentById(`${cod}`).subscribe((agent) => {
      if (type === 'operator') {
        this.barraForm.get('informacionBasica').patchValue({
          operator: agent
        });
      } else {
        this.barraForm.get('informacionBasica').patchValue({
          owner: agent
        });
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  // COMPORTAMIENTO PARA SOLICITUD DE CAMBIO
  objectControl() {
    // Editar tambien tiene control
    return 'control' in this.object ? true : false;
  }

  // realiza swiche en los grupos del formulario
  requestChange() {
    if (this.objectControl) {
      if (this.object.control === 'Solicitud') {
        this.controlRequestChange = true;
        this.barraForm.removeControl('datosAdministrativos');
        this.barraForm.removeControl('Vigencia');
        this.barraForm.addControl('Justificacion', new FormGroup({
          justificacion: new FormControl(
            null,
            { validators: [Validators.required, Validators.maxLength(255)] }),
        }));

        this.barraForm.get('datosTecnicos').get('sectionedBusbar').disable();
      }
    }
  }

  // validacion para cambio de solicitud dentro de ngClass
  requestChangeParameter(group: string, parameter: string) {
    if (this.objectControl()) {
      if (this.object.control === 'Solicitud') {
        const formParamenter = this.barraForm.get(group).get(parameter).value;
        if (formParamenter) {
          if (typeof formParamenter === 'object') {
            if ('configurationKind' in formParamenter) {
              // es una tension nominal
              if (formParamenter.substationConfigurationId !== this.object.substationConfigurationId) {
                return 'change-parameter';
              }
            }
            if ('substationInstanceId' in formParamenter) {
              // es una subesación
              if (formParamenter.substationInstanceId !== this.object.subestation.substationInstanceId) {
                return 'change-parameter';
              }
            }
            if ('typeAgent' in formParamenter) {
              // es un Agente
              if (formParamenter.typeAgent === 'owner') {
                // es un propieario
                if (formParamenter.codigoAgente !== this.object.ownerAgent) {
                  return 'change-parameter';
                }
              }

              if (formParamenter.typeAgent === 'agent') {
                // es un  agente promotor
                if (formParamenter.codigoAgente !== this.object.operatingAgent) {
                  return 'change-parameter';
                }
              }
            }

          } else {
            if (parameter === 'shortCircuitCapacity') {
              // es un  agente promotor
              if (`${formParamenter}` !== `${this.object.busbarSection[0].shortCircuitCapacity}`) {
                return 'change-parameter';
              }
            } else {
              if (`${formParamenter}` !== `${this.object[parameter]}`) {
                return 'change-parameter';
              }
            }

          }
        } else {
          return 'change-parameter';
        }
      }
    }
    return '';
  }

  requestChangeParameterSub(group: string, subgroup: string, parameter: string) {
    if (this.objectControl()) {
      if (this.object.control === 'Solicitud') {
        const formParamenter = this.barraForm.get(group).get('sectionsBusbar').value[subgroup][parameter];
        if (formParamenter) {
          if (parameter === 'sectionName') {
            if (`${formParamenter}` !== `${this.object.busbarSection[subgroup].busbarSectionName}`) {
              return 'change-parameter';
            }
          }

          if (parameter === 'shortCircuit') {
            if (`${formParamenter}` !== `${this.object.busbarSection[subgroup].shortCircuitCapacity}`) {
              return 'change-parameter';
            }
          }
        }
      }
    }
    return '';
  }

  // dentro de solicitud de cambio
  buildFormatFiles() {
    this.formartFile.push('.docx');
    this.formartFile.push('.xlsx');
    this.formartFile.push('.pptx');
    this.formartFile.push('.jpg');
    this.formartFile.push('.png');
    this.formartFile.push('.img');
    this.formartFile.push('.pdf');
    this.formartFile.push('.txt');
    this.formartFile.push('.zip');
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

  onDeleteFileAndDate(index: any, evt: any) {
    this.arrayListFiles.splice(index, 1);
  }
}
