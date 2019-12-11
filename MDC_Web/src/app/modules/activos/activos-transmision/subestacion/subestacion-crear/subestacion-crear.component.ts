import { Component, Input, OnChanges, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { DivisionPolitica, IDivisionPolitica } from '@core/entry-projects/model/IDivisionPolitica';
import { IPromoter } from '@core/entry-projects/model/IPromoter';
import { ValidateComponent } from '@shared/components/validate/validate.component';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { GeneralList } from '@core/entry-projects/model/IGeneralList';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';
import { IFileXM } from '@shared/model/file-xm.model';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { SlicePipePipe } from '@shared/pipes/slice-pipe/slice-pipe.pipe';
import { Util } from '@shared/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewFileXmComponent } from '@shared/components/modal-view-file-xm/modal-view-file-xm.component';

@Component({
  selector: 'app-subestacion-crear',
  templateUrl: './subestacion-crear.component.html',
  providers: [LowercaseFormsPipe, ProjectPipe, SlicePipePipe]
})
export class SubestacionCrearComponent implements OnChanges, OnInit, OnDestroy {

  @Input() subestacionForm: FormGroup;
  @Input() project: ITransmisionProject;
  @Input() object: any;
  @Output() formControls = new EventEmitter();
  @Input() flagButtonView: boolean;
  @Input() ngbTabset: string;
  mapFormGroups: string[];
  mapFormControls: any; // mapa de inputs al padre
  configurationKinds: GeneralList[];
  voltageLevelKinds: GeneralList[];
  departamentos: IDivisionPolitica[];
  municipios: any;
  promotores: IPromoter[]; // Es atributo de Proyecto?????
  areas: any[];
  subareas: any[];
  projectFpo: string;
  assetState: string;
  assetVersion: string;
  controlRequestChange: boolean; // para solicitud de cambio, switch para tabs

  // File Variables, solo para solicitud de cambio
  maxSizeFile = 20;  // hace referencia al tamaño máximo que tendrá cada archivo (MB)
  formartFile: string[] = [];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  maxLengthFile = 10;  // se refiere a el maximo de documentos admitidos
  arrayListFiles: IFileXM[] = [];  // lista de archivos
  isUnitTest = false;

  public validate: ValidateComponent;

  constructor(
    private activosService: ActivosTransmisionService,
    private generalList: GeneralTypesService,
    private masterData: MastereDataService,
    private messageService: MessageService,
    private readonly modalService: NgbModal) {
    this.controlRequestChange = false;
    this.flagButtonView = true;
  }

  public getGeneralListService() { return this.generalList; }
  public getActivosService() { return this.activosService; }
  public getMasterData() { return this.masterData; }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    // INICIALIZACION
    this.departamentos = [];
    this.municipios = { items: [] };
    this.areas = [];
    this.subareas = [];
    this.validate = new ValidateComponent(); // componete visual para pintar validacione full span

    // CONSUMO DE SERVICIOS
    this.ConfigurationKinds(); // tipos de configuracion
    this.getDepartamentos(); // departamentos
    this.getAreas(); // las areas

    // FIN CONSUMO DE SERVICIOS

    // Creación de formulario
    this.formCreate();
    this.setProjectFpo(); // ya que debemos esperar que este listo el formulario
    this.onChangesForm(); // inicia los eventos del formularios

    // inicamos el map control para el buscador de input
    this.modalsMaps();

    // COMPORTAMIENTO DE CONSTRUCCION

    // Etapas
    this.evalStepsProject();

    // COMPORTEAMIENTO EDITAR
    this.setAttr();

    // COMPORTAMIENTO PARA SOLICITAR
    this.requestChange();
    this.buildFormatFiles();

    // COMPORTAMIENTO PARA MOSTRAR PARAMETROS DE REQUERIMIENTO
    this.viewParametersForrequirement();

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
    if (!this.project.hasStages) {
      this.projectFpo = this.project.projectFpo.slice(0, this.project.projectFpo.indexOf('T'));
    } else {
      // agregamos las validaciones al campo etapa por proyecto cuando tenemos etapas
      this.subestacionForm.get('informacionBasica').get('XMStagePerSubstation').setValidators([Validators.required]);
    }
  }

  // Creacion de formulario, se llama en el ngOnInit
  formCreate(): void {
    this.subestacionForm.addControl('informacionBasica', new FormGroup({
      substationName: new FormControl(
        '',
        {
          validators:
            [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
          updateOn: 'blur'
        }),
      XMStagePerSubstation: new FormControl(null, { validators: [], updateOn: 'blur' }),
      latitude: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.min(-90), Validators.max(90),
            Validators.maxLength(5)]
      }),

      longitude: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.min(-180),
            Validators.max(180),
            Validators.maxLength(5)]
      }),
      DivisionPoliticaDepartamento: new FormControl(null, { validators: [Validators.required] }),
      DivisionPoliticaMunicipio: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
      AreaProyecto: new FormControl(null, { validators: [Validators.required] }),
      SubArea: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),

    }));

    this.subestacionForm.addControl('datosTecnicos', new FormGroup({

      subestationConfiguration: new FormArray([
        new FormGroup({
          SubstationConfigurationMRID: new FormControl(null, { validators: [], updateOn: 'blur' }),
          SubstationConfigurationInstanceId: new FormControl(null, { validators: [], updateOn: 'blur' }),
          SubstationMRID: new FormControl(null, { validators: [], updateOn: 'blur' }),
          VoltageLevelKind: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
          shortCircuitCapacity: new FormControl(null, { validators: [], updateOn: 'blur' }),
          SubstationConfigurationKind: new FormControl(null, { validators: [Validators.required] }),
          unifilarDiagram: new FormControl(null, { validators: [], updateOn: 'blur' }),
        }),
      ], {}),

    }));

    this.subestacionForm.addControl('datosAdministrativos', new FormGroup({
      consignable: new FormControl('', { validators: [Validators.required] }),
      Herope: new FormControl('', { validators: [Validators.required] }),
      Commercial: new FormControl('', { validators: [Validators.required] }),
    }));

    this.subestacionForm.addControl('Vigencia', new FormGroup({
      versionComments: new FormControl(this.project.version.comments, { validators: [], updateOn: 'blur' }),
      fpo: new FormControl(
        this.project.projectFpo.slice(0, this.project.projectFpo.indexOf('T')),
        { validators: [], updateOn: 'blur' })
    }));
  }

  // esta función inicializa las variables para el padre Modal
  // indispensables para la navegación
  modalsMaps(): void {
    this.ngbTabset = 'informacionBasica';

    // estandar para la creación y la edición
    this.mapFormControls = {
      substationName: 'Nombre subestación',
      latitude: 'Latitud',
      longitude: 'Longitud',
      DivisionPoliticaDepartamento: 'Departamento',
      DivisionPoliticaMunicipio: 'Municipio',
      AreaProyecto: 'Área operativa',
      SubArea: 'Sub-área operativa',
      consignable: 'Es activo consignable del sistema SNC',
      Herope: 'Es activo STN ó STR Herope',
      Commercial: 'Es activo comercial STN ó STR',
      versionComments: 'Observaciones',
      subestationConfiguration: 'Configuracion de subestación'
    };

    if (this.project.hasStages) {
      this.mapFormControls.XMStagePerSubstation = 'Etapa';
    }
    this.mapFormGroups = [
      'informacionBasica',
      'datosTecnicos',
      'datosAdministrativos',
      'Vigencia'
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
          substationName: 'Nombre subestación',
          latitude: 'Latitud',
          longitude: 'Longitud',
          DivisionPoliticaDepartamento: 'Departamento',
          DivisionPoliticaMunicipio: 'Municipio',
          AreaProyecto: 'Área operativa',
          SubArea: 'Sub-área operativa',
          justificacion: 'justificacion'
        };

        if (this.project.hasStages) {
          this.mapFormControls.XMStagePerSubstation = 'Etapa';
        }
      }
    }
  }

  // CONSUMO DE SERVICIOS

  // Tipos de configuración
  ConfigurationKinds(): void {
    this.generalList
      .getGeneralList('ConfiguracionSubestacion')
      .subscribe(configuracionsubestacion => {
        this.configurationKinds = configuracionsubestacion;
      },
        (err) => console.error(err.error.message),
        () => this.VoltageLevelKinds()
      );
  }

  // Tipos de nivel de tension
  VoltageLevelKinds(): void {
    this.generalList
      .getGeneralList('NivelTension')
      .subscribe(configuracionsubestacion => {
        configuracionsubestacion.forEach(el => el.detailValue = `${el.detailValue} kV`);
        this.voltageLevelKinds = configuracionsubestacion;
      },
        (err) => console.error(err.error.message),
        () => this.setSubstarionConfigrations());
  }

  getDepartamentos(): void {
    this.activosService
      .getAllLocations()
      .subscribe(departamentos => {
        this.departamentos = departamentos;
      },
        (err) => console.error(err.error.message),
        () => this.setDepartment());
  }

  getMunicipios(id: string): void {
    this.activosService
      .getMunicipalitiesByDeparmentCode(id)
      .subscribe(municipios => {
        this.municipios = municipios;
      },
        (err) => console.error(err.error.message),
        () => this.setMunicipalitie());
  }

  // areas
  getAreas() {
    this.masterData
      // tslint:disable-next-line: no-bitwise
      .getAllAreas()
      .subscribe(reqareas => {
        this.areas = reqareas;
      },
        (err) => console.error(err.error.message),
        () => {
          if (!this.project.subArea.area.id) { return; }
          this.areasById();
        });
  }

  // asignar el aree del proyecto
  areasById() {
    this.masterData
      .getAreasId(this.project.subArea.area.id)
      .subscribe(reqarea => {
        // asignamos el area del  proyecto
        this.subestacionForm.get('informacionBasica').patchValue({
          AreaProyecto: reqarea
        });

        this.subestacionForm.get('informacionBasica').patchValue({
          SubArea: this.project.subArea
        });
      },
        (err) => console.error(err.error.message)
      );
  }

  // subarea
  getSubAreas(id: any) {
    this.masterData
      // tslint:disable-next-line: no-bitwise
      .getAllSubAreasByIdArea(id)
      .subscribe(reqsubareas => {
        this.subareas = reqsubareas;
      },
        (err) => console.error(err.error.message),
        () => { });
  }

  // COMPORTAMIENTO DE FORMULARIO

  evalStepsProject() {
    if (this.project.stages.length === 1) {
      // Es un projecto sin etapas
      this.subestacionForm.get('informacionBasica').patchValue({
        XMStagePerSubstation: this.project.stages[0]
      });
    }
  }

  onChangesForm(): void {
    // DivisionPolitica
    this.subestacionForm.get('informacionBasica').get('DivisionPoliticaDepartamento').valueChanges.subscribe(val => {
      this.municipios = []; // limpiamos los municipios
      if (val) {
        this.getMunicipios(val.departmentCode);
      }
      this.subestacionForm.get('informacionBasica').patchValue({
        DivisionPoliticaMunicipio: null
      });

    });

    this.subestacionForm.get('informacionBasica').get('XMStagePerSubstation').valueChanges.subscribe(val => {
      this.projectFpo = null;
      if (val) {
        this.projectFpo = val.fpoDate.slice(0, val.fpoDate.indexOf('T'));
      }
    });

    this.subestacionForm.get('informacionBasica').get('AreaProyecto').valueChanges.subscribe(val => {
      this.subareas = []; // limpiamos las sub-areas
      if (val) {
        this.getSubAreas(val.id);
      }
      this.subestacionForm.get('informacionBasica').patchValue({
        SubArea: null
      });
    });

  }

  heropeClick(obj: any) {
    if (this.subestacionForm.get('datosAdministrativos').get('Herope').value === obj &&
      this.subestacionForm.get('datosAdministrativos').get('Herope').value != null) {
      this.subestacionForm.get('datosAdministrativos').patchValue({
        Herope: null
      });
    }
  }

  heroCommercialpeClick(obj: any) {
    if (this.subestacionForm.get('datosAdministrativos').get('Commercial').value === obj &&
      this.subestacionForm.get('datosAdministrativos').get('Commercial').value != null) {
      this.subestacionForm.get('datosAdministrativos').patchValue({
        Commercial: null
      });
    }
  }

  // COMPORTAMIENTO DE AGREGAR
  addSubestaationConfigAElement(evt: { preventDefault: () => void; }): void {
    evt.preventDefault();
    const array = this.subestacionForm.get('datosTecnicos').get('subestationConfiguration') as FormArray;
    array.push(this.createItem());
  }

  createItem(item?: any): FormGroup {
    // si tiene item es una edición
    if (item) {
      if (this.objectControl()) {
        if (this.object.control === 'Solicitud') { this.flagButtonView = true; }
        if (this.object.control === 'Mostrar') { this.flagButtonView = false; }
        if (this.object.control === 'Editar') { this.flagButtonView = true; }
      }
      return new FormGroup({
        SubstationConfigurationMRID: new FormControl({
          value: null,
          disabled: !this.flagButtonView 
          // || this.controlRequestChange // no se pueden bloquear por aca
        }, { validators: [], updateOn: 'blur' }),
        SubstationConfigurationInstanceId: new FormControl(item.substationConfigurationInstanceId, { validators: [], updateOn: 'blur' }),
        SubstationMRID: new FormControl({
          value: null,
          disabled: !this.flagButtonView  
          //|| this.controlRequestChange
        }, { validators: [], updateOn: 'blur' }),
        VoltageLevelKind: new FormControl(
          {
            value: this.voltageLevelKinds.find((el: any) => el.codeValue === `${item.voltageLevelId}`),
            disabled: !this.flagButtonView 
            //|| this.controlRequestChange
          },
          { validators: [Validators.required] }),
        SubstationConfigurationKind: new FormControl(
          {
            value: this.configurationKinds.find((el: any) => el.codeValue === `${item.substationConfigurationId}`),
            disabled: !this.flagButtonView 
            //|| this.controlRequestChange
          },
          { validators: [Validators.required] }),
        shortCircuitCapacity: new FormControl({
          value: `${item.shortCircuitCapacity} kA`,
          disabled: !this.flagButtonView 
          //|| this.controlRequestChange
        }, { validators: [], updateOn: 'blur' }),
        unifilarDiagram: new FormControl(item.diagramUrl, { validators: [], updateOn: 'blur' }),
        remove: new FormControl(item.remove, { validators: [], updateOn: 'blur' }),
      });
    }
    return new FormGroup({
      SubstationConfigurationMRID: new FormControl(null, { validators: [], updateOn: 'blur' }),
      SubstationConfigurationInstanceId: new FormControl(null, { validators: [], updateOn: 'blur' }),
      SubstationMRID: new FormControl(null, { validators: [], updateOn: 'blur' }),
      VoltageLevelKind: new FormControl(null, { validators: [Validators.required] }),
      SubstationConfigurationKind: new FormControl(null, { validators: [Validators.required] }),
      unifilarDiagram: new FormControl(null, { validators: [], updateOn: 'blur' }),
      remove: new FormControl(false, { validators: [], updateOn: 'blur' }),
      shortCircuitCapacity: new FormControl(null, { validators: [], updateOn: 'blur' })
    });
  }

  onDelete(index: number, evt: { preventDefault: () => void; }) {
    evt.preventDefault();
    const array = this.subestacionForm.get('datosTecnicos').get('subestationConfiguration') as FormArray;

    let arrayDeleted: FormArray;
    if (this.objectIsSet()) {
      arrayDeleted = this.subestacionForm.get('deletedConfigs') as FormArray;
    }

    this.messageService.openGeneralConfirm('¿Esta seguro de eliminar la configuración?')
      .then((value: SweetAlertResult) => {
        if (value.value) {
          if (arrayDeleted) { arrayDeleted.push(array.at(index)); }
          array.removeAt(index);
        }
      });
  }

  uploadUnifilarDiagram(evt: any, index: number) {
    this.subestacionForm.get('datosTecnicos').get('subestationConfiguration').get('' + index).patchValue({
      unifilarDiagram: evt.target.value
    });
  }

  // EVENTOS
  // COMPORTAMIENTO DE INTERFACE
  formTabChange(evt: any) {
    /* Al servicio de cambio de tab */
    this.ngbTabset = evt.nextId; this.formControls.emit(
      {
        tab: this.ngbTabset,
        mapFormGroups: this.mapFormGroups,
      });
  }

  onSubmit() { }

  // COMPORTAMIENTO DE EDITAR
  objectIsSet() {
    return 'substationInstanceId' in this.object ? true : false;
  }

  setAttr() {
    if (this.objectIsSet()) {
      this.setSubArea();
      // Consultas
      const stage = this.project.stages.find(el => el.id === this.object.stageProjectId);

      this.assetState = this.object.state;
      this.assetVersion = this.object.version;

      let herope = this.object.stnHerope ? 'stnHerope' : false;
      let comercial = this.object.stnCommercial ? 'stnCommercial' : false;
      if (!herope) {
        herope = this.object.strHerope ? 'strHerope' : false;
      }

      if (!comercial) {
        comercial = this.object.strCommercial ? 'strCommercial' : false;
      }

      // setters
      this.subestacionForm.addControl('substationInstanceId', new FormControl(this.object.substationInstanceId));
      this.subestacionForm.addControl('elementId', new FormControl(this.object.elementId));
      this.subestacionForm.addControl('stageProjectId', new FormControl(this.object.stageProjectId));
      this.subestacionForm.addControl('elementPerProjectStageInstanceId', new FormControl(this.object.elementPerProjectStageInstanceId));
      this.subestacionForm.get('informacionBasica').patchValue({ substationName: this.object.substationName });
      this.subestacionForm.get('informacionBasica').patchValue({ XMStagePerSubstation: stage });
      this.subestacionForm.get('informacionBasica').patchValue({ latitude: this.object.latitude });
      this.subestacionForm.get('informacionBasica').patchValue({ longitude: this.object.longitude });
      this.subestacionForm.get('datosAdministrativos').patchValue({ Herope: herope });
      this.subestacionForm.get('datosAdministrativos').patchValue({ Commercial: comercial });
      this.subestacionForm.get('datosAdministrativos').patchValue({ consignable: this.object.consignable });
      this.subestacionForm.get('Vigencia').patchValue({ versionComments: this.object.versionComments });
      this.subestacionForm.addControl('deletedConfigs', new FormArray([], {}));
    }
  }

  setSubstarionConfigrations() {
    if (this.objectIsSet()) {
      const array = this.subestacionForm.get('datosTecnicos').get('subestationConfiguration') as FormArray;
      while (array.length > 0) { array.removeAt(0); }
      this.object.substationConfiguration.forEach((el: any) => array.push(this.createItem(el)));
    }
  }

  setDepartment() {
    if (this.objectIsSet()) {
      // consultamos el municipio
      if (this.object.geographicLocation) {
        this.getMasterData().getLocationByGeographicLocationID(this.object.geographicLocation).subscribe(mun => {
          // asignamos el departamento
          const dep: DivisionPolitica = this.departamentos.find((el: any) => el.departmentCode === mun.departmentCode);
          this.subestacionForm.get('informacionBasica').patchValue({ DivisionPoliticaDepartamento: dep });
        });
      }
    }
  }

  setMunicipalitie() {
    if (this.objectIsSet()) {
      const mun: IDivisionPolitica = this.municipios.items.find((el: any) => el.id === this.object.geographicLocation);
      this.subestacionForm.get('informacionBasica').patchValue({ DivisionPoliticaMunicipio: mun });
    }
  }

  setSubArea() {
    if (this.objectIsSet()) {
      // llamamos las subarea
      this.masterData.getSubAreaById(this.object.subAreaId).subscribe(
        subarea => {
          this.object.subArea = this.project.subArea = subarea;
        },
        (err) => console.error(err.error.message),
        () => { this.areasById(); }
      );
    }
  }

  // COMPORTAMIENTO PARA SOLICITUD DE CAMBIO
  objectControl() {
    return 'control' in this.object ? true : false;
  }

  // realiza swiche en los grupos del formulario
  requestChange() {
    if (this.objectControl) {
      if (this.object.control === 'Solicitud') {
        this.controlRequestChange = true;
        this.subestacionForm.removeControl('datosAdministrativos');
        this.subestacionForm.removeControl('Vigencia');
        this.subestacionForm.addControl('Justificacion', new FormGroup({
          justificacion: new FormControl(
            null,
            { validators: [Validators.required, Validators.maxLength(255)] }),
        }));
      }
    }
  }

  // validacion para cambio de solicitud dentro de ngClass
  requestChangeParameter(group: string, parameter: string) {
    if (this.objectControl()) {
      if (this.object.control === 'Solicitud') {
        const formParamenter = this.subestacionForm.get(group).get(parameter).value;
        if (formParamenter) {
          if (typeof formParamenter === 'object') {
            if ('departmentName' in formParamenter) {
              // es un departamento
              if (formParamenter.id !== this.object.geographicLocation) {
                return 'change-parameter';
              }
            }
            if ('code' in formParamenter) {
              // es una sub-area
              if (formParamenter.id !== this.object.subAreaId) {
                return 'change-parameter';
              }
            }
          } else {
            if (formParamenter !== this.object[parameter]) {
              return 'change-parameter';
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
        const formParamenter = this.subestacionForm.get(group).get('subestationConfiguration').value[subgroup][parameter];
        if (formParamenter) {
          if (parameter === 'VoltageLevelKind') {
            if (`${formParamenter.codeValue}` !== `${this.object.substationConfiguration[subgroup].voltageLevelId}`) {
              return 'change-parameter';
            }
          }

          if (parameter === 'SubstationConfigurationKind') {
            if (`${formParamenter.codeValue}` !== `${this.object.substationConfiguration[subgroup].substationConfigurationId}`) {
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

  // COMPORTAMIENTO PARA MOSTRAR PARAMETRO DE REQUERIMIENT
  viewParametersForrequirement() {

    if (this.objectControl()) {
      if (this.object.control === 'MostrarParametroRequerimiento') {
        // Modificamos el comportamiento del formulario en funcion del disable

        this.flagButtonView = false;
        this.controlRequestChange = false;
        this.subestacionForm.get('informacionBasica').get('substationName').disable();
        this.subestacionForm.get('informacionBasica').get('XMStagePerSubstation').disable();
        this.subestacionForm.get('informacionBasica').get('DivisionPoliticaDepartamento').disable();
        this.subestacionForm.get('informacionBasica').get('DivisionPoliticaMunicipio').disable();
        this.subestacionForm.get('informacionBasica').get('latitude').disable();
        this.subestacionForm.get('informacionBasica').get('longitude').disable();
        this.subestacionForm.get('informacionBasica').get('AreaProyecto').disable();
        this.subestacionForm.get('informacionBasica').get('SubArea').disable();
        this.subestacionForm.get('datosAdministrativos').get('Herope').disable();
        this.subestacionForm.get('datosAdministrativos').get('Commercial').disable();
        this.subestacionForm.get('datosAdministrativos').get('consignable').disable();
        this.subestacionForm.get('Vigencia').get('versionComments').disable();
      }
    }
  }
}
