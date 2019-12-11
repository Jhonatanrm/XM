import { IDocumentsUpmeDTO } from '../../../../core/entry-projects/model/IDocumentsUpme';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IPromoter } from '@core/entry-projects/model/IPromoter';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { IGenerationDTO } from '@core/entry-projects/model/IGenerationDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '@shared/util';
import { IArea } from '@core/entry-projects/model/Iarea';
import { MessageService } from '@shared/services/message.service';
import { IgeneralTypes } from '@core/entry-projects/model/IgeneralTypes';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { IStage } from '@core/entry-projects/model/IStage';
import { SweetAlertResult } from 'sweetalert2';
import { GenerationService } from '@shared/services/proyect-entry/generation.service';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IStageFormModel } from '@shared/components/stages/model-form/stage-form.model';
import { IFileXM } from '@shared/model/file-xm.model';
import { ModalViewFileXmComponent } from '@shared/components/modal-view-file-xm/modal-view-file-xm.component';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { IAssetsSearch } from '@core/entry-projects/model/IAssetsSearch';
import { IAssets } from '@core/entry-projects/model/IAssets';
import { zip } from 'rxjs';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { DocumentsService } from '@shared/services/proyect-entry/documents.service';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  providers: [ProjectPipe]
})
export class CreateProjectComponent implements OnInit, AfterViewInit {


  promoterList: any[] = [];
  generationDTO: IGenerationDTO = {};

  @ViewChild('alertForm', { static: false }) alertForm: ElementRef;
  @ViewChild('aForm', { static: false }) aForm: ElementRef;

  generationResourceList: IgeneralTypes[];
  typeDespachoList: IgeneralTypes[];
  typeDespachoSelect: IgeneralTypes;
  generationResourceSelect: IgeneralTypes;
  productiveProcessList: IgeneralTypes[];
  transportConectionSystemList: IgeneralTypes[];
  transportSystemSelect: IgeneralTypes;
  typeCicleList: IgeneralTypes[];
  typeCicleSelect: IgeneralTypes;
  productiveProcessSelect: IgeneralTypes;

  stagesBoolean = false;
  firmEnergy = false;

  currentDate: any;
  minDateFPOAfter: any;
  projectFPO: NgbDateStruct;
  projectFPOUPM: NgbDateStruct;

  dateOEF: NgbDateStruct;

  formChildValid = true;

  showTipoDespacho = false;
  showTypeCicle = false;
  showFieldsEolico = false;
  showFieldsSun = false;

  temperatureEnviromentLength = 2;

  // select area
  areaList: IArea[] = [];
  areaSelect: IArea;
  arrayBufferArea: any[] = [];
  subAreaListSelect: IArea[] = [];
  subAreaSelect: IArea;
  hiddenLoader = true;

  cenProyect: any;
  capacityOEF: any;
  capacityTransport: any;

  validation_alert_danger: any;

  stagesList: IStage[] = [];

  submitFather = false;

  // File Variables
  maxSizeFile = 20;  // hace referencia al tamaño máximo que tendrá cada archivo (MB)
  formartFile: string[] = [];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  maxLengthFile = 10;  // se refiere a el maximo de documentos admitidos
  arrayListFiles: IFileXM[] = [];  // lista de archivos

  linesAndBarsList: IAssetsSearch = {};
  lineAndBarsSelect: IAssets;
  density: string;
  projectEditId: number;
  projectDetailData: any;

  editId: number = null;

  idProyect: string = null;

  isUnitTest = false;


  constructor(
    private readonly promoterService: PromoterService,
    private readonly generalTypesService: GeneralTypesService,
    private readonly activosService: ActivosTransmisionService,
    private readonly messageService: MessageService,
    private readonly generationService: GenerationService,
    private readonly pipeproj: ProjectPipe,
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly masterData: MastereDataService,
    private readonly documentsService: DocumentsService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectEditId = id;
    this.minDateFPOAfter = Util.getActualDay();
    this.currentDate = Util.getActualDay();
    this.generationDTO.documentsUpme = [];
    this.buildFormatFiles();
    this.loadServices(id);
  }

  ngAfterViewInit() {
    Util.setFocus('txtnameProject', this.aForm);
  }

  ngOnInit() {
    this.validation_alert_danger = {
      txtnameProject: false,
      selectPromotor: false
    };
  }

  loadServices(id: number) {
    zip(
      this.promoterService.getPromoters(),
      this.generalTypesService.getGenerationResources(),
      this.generalTypesService.getProductiveProcess(),
      this.generalTypesService.getTransportConectionSystem(),
      this.generalTypesService.getTypeCicle(),
      this.generalTypesService.getTypeDespacho(),
      this.masterData.getAllAreas()
    ).subscribe(([promoters, genResources, prodResources, transports, typeCicles, despachos, areas]: any) => {
      this.promoterList = promoters.items;
      this.generationResourceList = genResources;
      this.productiveProcessList = prodResources;
      this.transportConectionSystemList = transports;
      this.typeCicleList = typeCicles;
      this.typeDespachoList = despachos;
      this.areaList = areas;
      if (Boolean(id)) {
        this.editId = +id;
        this.getGenerationProyectToEdit(+id);
      }
    });
  }

  buildFormatFiles() {
    this.formartFile.push('.jpg');
    this.formartFile.push('.png');
    this.formartFile.push('.pdf');
    this.formartFile.push('.tif');
    this.formartFile.push('.tiff');
    this.formartFile.push('.msg');
  }


  getGenerationProyectToEdit(id: number) {
    this.generationService.getGenerationProjectById(id)
      .subscribe((resp: any) => {
        this.projectDetailData = resp;
        this.fillFormControls(resp);
      }, (error: HttpErrorResponse) => {
        throw error;
      });
  }

  // subarea
  getSubAreas(id: any) {
    this.masterData
      // tslint:disable-next-line: no-bitwise
      .getAllSubAreasByIdArea(id)
      .subscribe(reqsubareas => {
        this.subAreaListSelect = reqsubareas;
      }, (error: HttpErrorResponse) => {
        throw error;
      });
  }

  /**
   *
   * get subarea
   * @param id
   */
  getSubAreaByIdSubArea(resp: any) {
    this.masterData
      // tslint:disable-next-line: no-bitwise
      .getSubAreaById(resp.subAreaID)
      .subscribe(reqsubarea => {
        this.subAreaSelect = { id: reqsubarea.id, code: reqsubarea.code, name: reqsubarea.name };
        console.log('this.subAreaSelect');
        console.log(this.subAreaSelect);
        this.areaSelect = this.areaList.find(area => area.id === reqsubarea.area.id);
        this.getSubAreas(this.areaSelect.id);
        this.mapDetailData(resp);
      }, (error: HttpErrorResponse) => {
        throw error;
      });
  }



  fillFormControls(resp: any) {
    this.getSubAreaByIdSubArea(resp);
    this.idProyect = this.pipeproj.transform(resp.projectId, 'PROG', '5');
    this.generationDTO = {
      generationProjectId: resp.generationProjectId,
      UserName: resp.userName,
      ProjectName: resp.projectName,
      ProjectID: resp.projectId,
      ProjectDescription: resp.projectDescription,
      PromoterId: resp.promoterId,
      SubAreaID: this.subAreaSelect ? this.subAreaSelect.id : null,
      ProjectType: resp.projectType,
      connectionPointName: resp.connectionPointName,
    };

  }

  mapDetailData(resp: any) {
    this.stagesBoolean = resp.hasStages;
    this.projectFPO = Util.formatDateTime(resp.projectFpo);
    this.generationResourceSelect = this.generationResourceList.find(item => item.typeMRID === resp.generationResourceID);
    this.onSelectGenerationResource();

    this.productiveProcessSelect = this.productiveProcessList.find(item => item.typeMRID === resp.typeProductiveProcessID);
    this.transportSystemSelect = this.transportConectionSystemList.find(item => item.typeMRID === resp.connectionTransportSystemID);
    console.log('this.transportSystemSelect');
    console.log(this.transportSystemSelect);
    this.onSelectTransportConection();

    this.cenProyect = resp.netEffectiveCapacity;
    this.capacityTransport = resp.transportCapacity;
    this.firmEnergy = resp.firmEnergyObligation;
    this.minorOrEqualsDecimal(resp.netEffectiveCapacity, resp.transportCapacity);

    this.generationDTO.windSpeed = resp.windSpeed;
    this.density = resp.windDensity;
    this.generationDTO.averageRoomTemperature = resp.averageRoomTemperature;
    this.dateOEF = Util.formatDateTime(resp.dateIpvo);
    this.capacityOEF = resp.netEffectiveCapacityEffic;
    this.typeCicleSelect = this.typeCicleList.find(item => item.typeMRID === resp.cycleTypeID);
    this.generationDTO.averageHorizontalGlobalIrradiation = resp.averageHorizontalGlobalIrradiation;
    this.generationDTO.averagePanelIrradiation = resp.averagePanelIrradiation;
    this.typeDespachoSelect = this.typeDespachoList.find(item => item.typeMRID === resp.dispatchedTypeID);
    this.arrayListFiles = resp.documentsUpme.map(doc => {
      const item: IFileXM = {
        id: doc.instanceDocument,
        urlDocument: doc.urlDocument,
        name: doc.connectionConceptUpme,
        datePicker: Util.formatDateTime(doc.fpoUpme),
        sended: true
      };
      return item;
    });

  }

  onSelectArea($event: any) {
    this.subAreaListSelect = [];
    this.subAreaSelect = null;
    this.getSubAreas($event.id);
  }

  onFirmEnergy(event: boolean) {
    if (!event) {
      if ((this.dateOEF != null && this.dateOEF) || (this.capacityOEF != null && this.capacityOEF)) {
        this.callConfirmEnergy();
      }
    } else {
      this.dateOEF = null;
      this.capacityOEF = null;
      this.minorOrEqualsDecimal(null, null);
    }
  }


  private callConfirmEnergy() {
    this.messageService.openGeneralConfirm('¿Esta seguro que No tiene obligación de energía firme?')
      .then((value: SweetAlertResult) => {
        if (value.value) {
          this.minorOrEqualsDecimal(this.cenProyect, this.capacityTransport);
        } else {
          this.firmEnergy = true;
        }
      });
  }


  minorOrEqualsDecimal(decimalOne: any, decimalTwo: any) {
    if (this.cenProyect) {
      this.evaluateCenProyect();
    }

    if (this.firmEnergy) {
      if ((this.cenProyect != null && this.cenProyect) &&
        (this.capacityOEF != null && this.capacityOEF) && !(+this.cenProyect <= +this.capacityOEF)) {
        // tslint:disable-next-line: max-line-length
        this.messageService
          .openWarning('La capacidad Efectiva Neta del proyecto (CEN) debe ser igual o menor a la Capacidad Efectiva Neta (CEN) de OEF.');
        this.cenProyect = this.capacityOEF;
        this.evaluateCenProyect();
      }
    }
    if ((decimalOne != null && decimalOne) && (decimalTwo != null && decimalTwo) && !(+decimalOne <= +decimalTwo)) {
      // tslint:disable-next-line: max-line-length
      this.messageService
        .openWarning('La capacidad Efectiva Neta del proyecto (CEN) debe ser igual o menor a la Capacidad Efectiva Neta de transporte.');
      this.cenProyect = this.capacityTransport;
      this.evaluateCenProyect();
    }

  }

  evaluateCenProyect() {
    // evalueate show type despacho
    this.showTipoDespacho = this.cenProyect >= 10 && this.cenProyect < 20;
    this.showTypeCicle = this.cenProyect > 20 && (this.generationResourceSelect != null && this.generationResourceSelect.typeMRID === 11);
  }

  focusOut(evt) {
    if (typeof (evt) === 'object') {
      this.validation_alert_danger[evt.srcElement.name] = false;
    } else {
      this.validation_alert_danger[evt] = false;
    }
  }

  validControl(singupForm: NgForm) {

    let valid = true;
    if (!this.isUnitTest) {

      for (let key in singupForm.controls) {
        // tslint:disable-next-line: max-line-length
        if (singupForm.controls[key].status === 'INVALID'
          && (singupForm.value[key] === undefined || singupForm.value[key] === '' || singupForm.value[key] === null)) {
          this.validation_alert_danger[key] = true;
          valid = false;
        } else {
          this.validation_alert_danger[key] = false;
        }
      }

      if (singupForm.controls['datePOP'].status === 'INVALID'
        && this.editId !== null && this.projectFPO !== null) {
        valid = false;
        this.messageService
          .openWarning('La FPO del proyecto que usted asigno ya pasó, por favor actualizarla.');
      }
    }
    return (valid && this.formChildValid);
  }

  onSubmit(singupForm: NgForm) {
    this.submitFather = true;
    if (!singupForm.valid || !this.formChildValid) {
      if (!this.validControl(singupForm)) {
        Util.setFocus('txtnameProject', this.aForm);
      }
      return;
    }
    this.hiddenLoader = false;
    this.setObjGeneration();
    this.sendData();
  }

  private setObjGeneration() {
    this.generationDTO.ProjectType = 1; // projectType generation = 1
    this.generationDTO.UserName = 'xmpproyectos';
    this.generationDTO.UpmeId = null;
    this.generationDTO.ProjectFpo = new Date(Util.convertNgStructToDate(this.projectFPO));
    this.generationDTO.TransportCapacity = +this.capacityTransport;
    this.generationDTO.NetEffectiveCapacity = +this.cenProyect;
    // list
    this.generationDTO.GenerationResourceID = this.generationResourceSelect ? this.generationResourceSelect.typeMRID : null;
    this.generationDTO.TypeProductiveProcessID = this.productiveProcessSelect ? this.productiveProcessSelect.typeMRID : null;

    this.generationDTO.SubAreaID = this.subAreaSelect !== null ? this.subAreaSelect.id ? this.subAreaSelect.id : null : null;
    this.generationDTO.FirmEnergyObligation = this.firmEnergy;
    if (this.firmEnergy) {
      this.generationDTO.NetEffectiveCapacityEffic = +this.capacityOEF;
      this.generationDTO.DateIpvo = new Date(Util.convertNgStructToDate(this.dateOEF));
    }
    if (this.stagesList != null && this.stagesList.length > 0) {
      this.generationDTO.Stages = [];
      let i = 1;
      this.stagesList.forEach(element => {
        this.generationDTO.Stages.push({
          StageOrder: i,
          FpoDate: element.date ? Util.convertNgStructToDate(element.date) : null,
          StageDescription: element.StageDescription
        });
        i++;
      });
    } else {
      this.generationDTO.Stages = null;
    }
    this.setAttributesBasicInfo();

    for (const promoter of this.promoterList) {
      if (promoter.id === this.generationDTO.PromoterId) {
        this.generationDTO.PromoterName = promoter.name;
        break;
      }
    }
  }

  setAttributesBasicInfo() {
    this.generationDTO.connectionTransportSystemID = this.transportSystemSelect.typeMRID;
    if (this.generationDTO.connectionPointName == null || this.generationDTO.connectionPointName.length < 1
      && (this.lineAndBarsSelect !== null && this.lineAndBarsSelect)) {
      this.generationDTO.connectionPointName = this.lineAndBarsSelect.assetName;
    }
    if (this.lineAndBarsSelect !== null && this.lineAndBarsSelect) {
      this.generationDTO.conectionPointID = this.lineAndBarsSelect.elementId;
    }
    if (this.typeDespachoSelect !== null && this.typeDespachoSelect && this.typeDespachoSelect.typeMRID) {
      this.generationDTO.dispatchedTypeID = this.typeDespachoSelect.typeMRID;
    }
    if (this.typeCicleSelect !== null && this.typeCicleSelect && this.typeCicleSelect.typeMRID) {
      this.generationDTO.cycleTypeID = this.typeCicleSelect.typeMRID;
    }
    if (this.density !== null && this.density) {
      this.generationDTO.windDensity = +this.density;
    }
    if (this.generationDTO.windSpeed !== null) {
      this.generationDTO.windSpeed = +this.generationDTO.windSpeed;
    }
    if (this.generationDTO.averageRoomTemperature !== null) {
      this.generationDTO.averageRoomTemperature = +this.generationDTO.averageRoomTemperature;
    }
    if (this.generationDTO.averageHorizontalGlobalIrradiation !== null) {
      this.generationDTO.averageHorizontalGlobalIrradiation = +this.generationDTO.averageHorizontalGlobalIrradiation;
    }
    if (this.generationDTO.averagePanelIrradiation !== null) {
      this.generationDTO.averagePanelIrradiation = +this.generationDTO.averagePanelIrradiation;
    }
  }

  private sendData() {
    if (!this.arrayListFiles || this.arrayListFiles.length === 0) {
      this.sendRegisterGeneration();
      return;
    }

    this.generationDTO.documentsUpme = [];
    let existFileToSend = false;
    let fileId = 0;

    for (const file of this.arrayListFiles) {
      fileId++;

      if (!file.id) {
        existFileToSend = true;

        this.documentsService.uploadDocumentUpme(this.generationDTO, file)
          .subscribe((resp: any) => {
            this.generationDTO.documentsUpme.push(this.getNewDocumentUpme(file, resp.Url, fileId));
            file.sended = true;

            if (this.allDocumentsSended()) {
              this.sendRegisterGeneration();
            }
          }, (error: HttpErrorResponse) => {
            this.hiddenLoader = true;

            this.messageService.openError({
              title: 'No se ha podido finalizar el envío: ',
              text: 'En el momento no se puede ejecutar la operación. Intente de nuevo o informe al administrador del sistema.'
            });

            throw error;
          });
      } else {
        this.generationDTO.documentsUpme.push(this.getNewDocumentUpme(file, file.urlDocument, fileId));
      }
    }

    if (!existFileToSend) {
      this.sendRegisterGeneration();
    }
  }

  private getNewDocumentUpme(file: IFileXM, url: string, fileId: number): IDocumentsUpmeDTO {
    const document: IDocumentsUpmeDTO = {};

    document.instanceDocument = file.id;
    document.documentId = fileId;
    document.connectionConceptUpme = file.name;
    document.fpoUpme = Util.convertNgStructToDate(file.datePicker);
    document.urlDocument = url;

    return document;
  }

  private allDocumentsSended(): boolean {
    for (const file of this.arrayListFiles) {
      if (!file.sended) {
        return false;
      }
    }

    return true;
  }

  private sendRegisterGeneration() {
    console.log('entra a sendRegisterGeneration');
    console.log(this.generationDTO);

    this.generationService.registerGenerationProyect(this.generationDTO)
      .subscribe((resp: any) => {
        this.hiddenLoader = true;
        const formmat = this.pipeproj.transform(resp.id, 'PROG', '5');
        // tslint:disable-next-line: max-line-length
        this.messageService.openSucessConfirm({
          title: '',
          text: 'El proyecto  ' + formmat + ' se ha enviado exitosamente.',
          confirmButtonText: 'Aceptar'
        })
          .then((value: SweetAlertResult) => {
            if (value.value) {
              this.router.navigate(['generacion']);
            }
          });
      }, (error: HttpErrorResponse) => {
        this.hiddenLoader = true;
        if (error.status === 422) {
          this.messageService
            .openWarning(error.error.Errors[0].Message.toString());
        } else {
          // tslint:disable-next-line: max-line-length
          this.messageService.openError({
            title: 'No se ha podido finalizar el envío: ',
            text: 'En el momento no se puede ejecutar la operación. Intente de nuevo o informe al administrador del sistema.'
          });

        }
        throw error;
      });
  }

  onEventChild($event: IStageFormModel) {
    console.log($event);
    if ($event != null) {
      this.stagesBoolean = true;
      this.projectFPO = $event.projectFPO;
      this.stagesList = $event.stages;
      this.formChildValid = $event.validForm;
    } else {
      this.projectFPO = null;
      this.stagesList = null;
      this.stagesBoolean = false;
      this.formChildValid = true;
    }
  }

  onDeleteFileAndDate(index: any, event: any) {
    console.log(event);
    event.preventDefault();
    console.log(this.arrayListFiles);
    this.messageService.openGeneralConfirm('¿Desea eliminar el documento adjunto?')
      .then((value: SweetAlertResult) => {
        console.log(value);
        if (value.value) {
          this.arrayListFiles = Util.deleteElement(this.arrayListFiles, index);
        }
      });
  }


  downloadFile(file: IFileXM, event) {
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

  onselectDateOfDocument(file: IFileXM) {
    const { year, month, day } = file.datePicker;
    if ((this.projectFPO !== null && this.projectFPO) &&
      (!new NgbDate(year, month, day).equals(this.projectFPO))) {
      this.messageService.openConfirm({
        title: '',
        text: 'Esta fecha no coincide con la FPO del proyecto, por favor revisar ',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  /**
   * event transport conection system ng list
   */
  onSelectTransportConection() {
    this.validateSetAssets();
  }

  /**
   * event change sub area
   */
  onchangeSubArea() {
    this.validateSetAssets();
  }

  private validateSetAssets() {
    if (this.transportSystemSelect !== null && this.transportSystemSelect &&
      (this.transportSystemSelect.codeValue !== null) &&
      (this.transportSystemSelect.codeValue !== '3' && (this.subAreaSelect !== null && this.subAreaSelect && this.subAreaSelect.id))) {
      this.setAssets();
    } else {
      this.linesAndBarsList = {};
    }
  }


  /**
   * event generation resource ng list
   */
  onSelectGenerationResource() {
    this.clearFieldsChildGenerationResource();
    this.showTypeCicle = this.generationResourceSelect.typeMRID === 11 && this.cenProyect > 20;
    this.showFieldsEolico = this.generationResourceSelect.typeMRID === 12;
    this.showFieldsSun = this.generationResourceSelect.typeMRID === 13;
  }

  clearFieldsChildGenerationResource() {
    this.generationDTO.averageRoomTemperature = null;
    this.generationDTO.windSpeed = null;
    this.generationDTO.windDensity = null;
    this.generationDTO.averageHorizontalGlobalIrradiation = null;
    this.generationDTO.averagePanelIrradiation = null;
  }


  onKeyTemperature() {
    if (this.generationDTO.averageRoomTemperature != null) {
      let text = '' + this.generationDTO.averageRoomTemperature;
      if (text === '´') {
        this.generationDTO.averageRoomTemperature = null;
        return;
      }
      if (text.indexOf('-') === 0) {
        this.temperatureEnviromentLength = 3;
        console.log('3');
      } else {
        this.temperatureEnviromentLength = 2;
        console.log('2');
      }
      if (text.length >= 2 && text.charAt(1) === '-') {
        text = text.replace('-', '');
      }
      if (text.charAt(text.length - 1).toString() === '-' && this.temperatureEnviromentLength === 3
        && (text.substr(1, text.length - 1).indexOf('-') >= 0)) {
        this.generationDTO.averageRoomTemperature =
          ((text.length === 2) ? +('0' + (text.substr(0, text.length - 1)))
            : +(text.substr(0, text.length - 1)));
      }
    }
  }

  /**
   * valida 3 enteros en el campo densidad
   * @param event evento del teclado
   * @param isDensity es densidad?
   */
  onKeyDensidad(event: any, isDensity: boolean) {
    console.log(event);
    const stringText = isDensity ? this.density : this.generationDTO.windSpeed;
    if (stringText != null && stringText.toString().length > 0) {
      if (stringText.toString().indexOf('.') < 0 && stringText.toString().length >= 3) {
        if (event.key !== '.') {
          const cutText = stringText.toString().substr(0, 3);
          if (isDensity) {
            this.density = cutText;
          } else {
            this.generationDTO.windSpeed = cutText;
          }
        }
      }
    }
  }

  setAssets() {
    const filterQuery = '';
    const assetTypeNameList = [AssetTypeEnum.BUSBAR];
    const stateCodeList = [53]; // code general list

    this.activosService.getAssetsBk(filterQuery, null, assetTypeNameList, this.subAreaSelect.id, stateCodeList, null, null, true)
      .subscribe((resp: any) => {
        console.log(resp);
        this.linesAndBarsList = resp;
        if (this.projectEditId && this.projectDetailData != null && this.projectDetailData
          && this.projectDetailData.conectionPointID) {
          this.lineAndBarsSelect = this.linesAndBarsList.items
            .find((item: any) => item.elementId === this.projectDetailData.conectionPointID);
        }
      }, (error: HttpErrorResponse) => {
        console.error(error.message);
      });
  }

}
