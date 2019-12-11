import { IDocumentsUpmeDTO } from './../../../../core/entry-projects/model/IDocumentsUpme';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPromoter } from '@core/entry-projects/model/IPromoter';
import { IArea } from '@core/entry-projects/model/Iarea';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { IgeneralTypes } from '@core/entry-projects/model/IgeneralTypes';
import { IStage } from '@core/entry-projects/model/IStage';
import { Util } from '@shared/util';
import { ITransmisionDTO } from '@core/entry-projects/model/ITransmisionDTO';
import { SweetAlertResult } from 'sweetalert2';
import { MessageService } from '@shared/services/message.service';
import { DocumentsService } from '@shared/services/proyect-entry/documents.service';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { IStageFormModel } from '@shared/components/stages/model-form/stage-form.model';
import { ModalViewFileXmComponent } from '@shared/components/modal-view-file-xm/modal-view-file-xm.component';
import { IFileXM } from '@shared/model/file-xm.model';
import { zip } from 'rxjs';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';
import { IUpdateState } from '@core/entry-projects/model/IUpdateState';
import { IStateRequirement } from '@core/entry-projects/model/IStateRequirement';
import { JustificationModalComponent } from '../justification-modal/justification-modal.component';

@Component({
  selector: 'app-transmision',
  templateUrl: './create-project.component.html',
  providers: [ProjectPipe]
})
export class TransmisionComponent implements OnInit, AfterViewInit {

  loading = false;
  wait = false;
  public numberOfItemsFromEndBeforeFetchingMore = 10;
  @ViewChild('alertForm', { static: false }) alertForm: ElementRef;
  @ViewChild('aForm', { static: false }) aForm: ElementRef;
  bufferSize = 50;
  PromoterSelect: IPromoter = {};
  transmisionDTO: ITransmisionDTO;
  typeAdjudicationList: IgeneralTypes[];

  // fecha de puesta en operación
  minDateFPOAfter: any;
  maxDate: Date;
  currentDate: any;
  yersterdayDate: any;
  projectFPO: NgbDateStruct;

  arrayBufferPromoter: IPromoter[] = [];
  promoterList: any[] = [];

  isUnitTest = false;

  //select area
  areaList: IArea[] = [];
  areaSelect: IArea;
  arrayBufferArea: any[] = [];
  subAreaList: any[] = [];

  subAreaListSelect: IArea[];
  subAreaSelect: IArea;


  projectTypeList: IgeneralTypes[] = [];
  showUpload: boolean;
  typeProjectSelect: IgeneralTypes = {};
  typeProjectSelectTemp: IgeneralTypes;
  nameNumberAnnoucement: string;
  numberAnnoucement: string = '00';

  award: string;

  yearsUpme: number[] = [];
  yearUpemSelect: number;
  showUploadAlso: boolean;
  radioUpme: boolean;

  stagesBoolean: boolean = false;
  stagesList: IStage[] = [];

  // logica de validacion

  // tslint:disable-next-line: variable-name
  validation_alert_danger: any;

  hiddenLoader = true;

  submitFather = false;
  formChildValid = true;

  // File Variables
  maxSizeFile: number = 20;  // hace referencia al tamaño máximo que tendrá cada archivo (MB)
  formartFile: string[] = [];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  maxLengthFile: number = 10;  // se refiere a el maximo de documentos admitidos
  arrayListFiles: IFileXM[] = [];  // lista de archivos

  editProjectId: number;

  idProyect: string = null;
  editId: number = null;

  arrayRequirements: any[] = [];
  queryMode = false;
  updateStateDTO: IUpdateState = {};
  stateRequirement: IStateRequirement = {};

  constructor(
    private readonly promoterService: PromoterService,
    private readonly transmisionService: TransmisionService,
    private readonly generalTypesServices: GeneralTypesService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly pipeproj: ProjectPipe,
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly documentsService: DocumentsService,
    private readonly projectRequirementService: ProjectRequirementService,
    private readonly masterData: MastereDataService

  ) {
    this.hiddenLoader = false;


    this.transmisionDTO = {};

    this.transmisionDTO.ProjectType = 2; // projectType transmision = 2
    this.transmisionDTO.UserName = 'xmpproyectos';
    this.transmisionDTO.UpmeId = null;

    this.minDateFPOAfter = Util.getActualDay();
    this.currentDate = Util.getActualDay();
    this.maxDate = new Date();
    this.maxDate.setFullYear(10);
    this.yersterdayDate = Util.getBeforeDay();
    this.loadServices();
  }

  ngOnInit() {
    this.validation_alert_danger = {
      txtnameProject: false,
      selectPromotor: false
    };
  }

  loadServices() {
    const id = this.route.snapshot.paramMap.get('id');
    this.editProjectId = +id;
    zip(
      this.promoterService.getPromoters(),
      this.generalTypesServices.getTypeAdjudication(),
      this.generalTypesServices.getTypeConexion(),
      this.masterData.getAllAreas()
    ).subscribe(([promoters, types, conexionTypes, areas]: any) => {
      this.promoterList = promoters.items;
      this.typeAdjudicationList = types;
      this.projectTypeList = conexionTypes;
      this.areaList = areas;
      this.setYears();
      this.buildFormatFiles();
      if (Boolean(id)) {
        this.editId = +id;
        this.getProjectDetail(id);
        this.getRequirements(id);
      }
      this.hiddenLoader = true;
    }, (error: any) => {
      this.hiddenLoader = true;
      throw error;
    });
  }

  /**
   *
   * get subarea
   * @param id
   */
  getSubAreaByIdSubArea(idSubarea: number) {
    this.masterData
      // tslint:disable-next-line: no-bitwise
      .getSubAreaById(idSubarea)
      .subscribe(reqsubarea => {
        this.subAreaSelect = { id: reqsubarea.id, code: reqsubarea.code, name: reqsubarea.name };
        this.areaSelect = this.areaList.find(area => area.id === reqsubarea.area.id);
        this.getSubAreas(this.areaSelect.id);
      }, (error: HttpErrorResponse) => {
        throw error;
      });
  }

  getRequirements(idProy: any) {
    this.projectRequirementService.getRequirementOfProyect('?projectId=' + idProy)
      .subscribe((resp: any) => {
        this.arrayRequirements = resp.items;
        if (this.arrayRequirements != null && this.arrayRequirements.length > 0) {
          this.evalStateRequirement();
        }
      }, (error: any) => {
        throw error;
      });
  }

  private evalStateRequirement() {
    this.arrayRequirements.forEach(element => {
      //requirementId == 1 es el requisito de 'Datos básicos'
      if (element.requirementId === 1) {
        this.stateRequirement = element;
        // 54 es id de estado pendiente
        if (element.requirementStatusId === 55) {
          this.queryMode = true;
        }
      }
    });
  }

  getProjectDetail(id: any) {
    this.transmisionService.getProjectById(id)
      .subscribe((res: any) => {
        if (res !== null && res) {
          if (res.subAreaID !== null && res.subAreaID) {
            this.getSubAreaByIdSubArea(res.subAreaID);
          }
          this.fillFormControls(res);

        }
      });
  }

  fillFormControls(resp: any) {

    if (resp.projectId !== null && resp.projectId) {
      this.idProyect = this.pipeproj.transform(resp.projectId, 'PTRA', '5');
    }

    this.typeProjectSelect = this.projectTypeList.find(item => +item.typeMRID === resp.conectionTypeID);
    this.typeProjectSelectTemp = this.projectTypeList.find(item => +item.typeMRID === resp.conectionTypeID);
    this.onSelectTypeProject(this.typeProjectSelect);


    this.transmisionDTO = {
      TransmissionInstanceId: resp.transmissionInstanceId,
      ConectionTypeID: resp.conectionTypeID,
      AdjudicationTypeID: resp.adjudicationTypeID,
      UserName: resp.userName,
      ProjectName: resp.projectName,
      ProjectID: resp.projectId,
      ProjectDescription: resp.projectDescription,
      PromoterId: resp.promoterId,
      ConnectionPoint1: resp.connectionPoint1,
      ConnectionPoint2: resp.connectionPoint2,
      IncludeUnitFasorialMeasurement: resp.includeUnitFasorialMeasurement,
      SubAreaID: resp.subAreaID,
      AnnouncementUpme: resp.announcementUpme,
      ProjectType: resp.projectType
    };
    this.transformData(resp);

  }

  transformData(resp: any) {
    this.projectFPO = Util.formatDateTime(resp.projectFpo);
    this.radioUpme = resp.announcementUpme;
    const adjudicationItem = this.typeAdjudicationList.find(item => item.typeMRID === resp.adjudicationTypeID);
    if (adjudicationItem && adjudicationItem.detailValue) {
      this.award = adjudicationItem.detailValue;
    }
    this.stagesBoolean = resp.hasStages;


    if (resp && resp.stages) {
      this.stagesList = resp.stages.map(stage => {
        const stageCopy: IStage = {
          date: Util.formatDateTime(stage.fpoDate),
          StageOrder: stage.stageOrder,
          StageDescription: stage.stageDescription
        };
        return stageCopy;
      });
    }
    if (resp && resp.documentsUpme) {
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

    if (resp.announcementNumberUpme) {
      const splitAnnouncement = resp.announcementNumberUpme.split('-');
      if (splitAnnouncement.length >= 3) {
        this.nameNumberAnnoucement = splitAnnouncement[0];
        this.numberAnnoucement = splitAnnouncement[1];
        this.yearUpemSelect = splitAnnouncement[2];
      }
    }

    if (this.typeProjectSelect && this.typeProjectSelect.detailValue === 'STN') {
      this.award = 'Ampliación del STN';
      this.showUploadAlso = false;
    } else {
      this.award = 'Expansión del Operador de Red';
      this.showUploadAlso = true;
    }
  }



  ngAfterViewInit() {
    Util.setFocus('txtnameProject', this.aForm);
  }

  buildFormatFiles() {
    this.formartFile = ['.jpg', '.png', '.pdf', '.tif', '.tiff', '.msg'];
  }

  // OK test unit
  setYears() {
    const actualYear = new Date().getFullYear();
    for (let i = actualYear; i >= (actualYear - 10); i--) {
      this.yearsUpme.push(i);
    }
  }


  onSelectArea($event: any) {
    this.subAreaListSelect = [];
    this.subAreaSelect = null;
    this.getSubAreas($event.id);
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


  // OK unit test
  onSelectTypeProject($event: any) {
    if (!$event) {
      $event = {};
    }
    this.changeTypeProjectDocumentsRule($event);
    this.transmisionDTO.ConectionTypeID = this.typeProjectSelect ?
      +this.typeProjectSelect.typeMRID
      : null;
    this.clearNumberAnnoucement();
    this.radioUpme = null;
    this.showUploadAlso = null;
    this.award = '';
    this.transmisionDTO.AdjudicationTypeID = this.typeAdjudicationList.filter((item) => item.codeValue === "-1")[0].typeMRID;
    if ($event.codeValue === '3') {
      //conexion carga
      this.showUpload = false;
    } else {
      this.showUpload = true;
    }
    // if (!this.arrayHaveDocumentOrFPO()) {
    this.typeProjectSelectTemp = { codeValue: $event.codeValue, detailValue: $event.detailValue, typeMRID: $event.typeMRID };
    // }
  }


  changeTypeProjectDocumentsRule($event: any) {
    if (this.typeProjectSelectTemp && (this.typeProjectSelectTemp.codeValue !== $event.codeValue)) {
      if (this.arrayHaveDocumentOrFPO()) {
        this.messageService.openGeneralConfirm("¿Está seguro de modificar el tipo de proyecto? Se eliminarán los conceptos adjuntos")
          .then((value: SweetAlertResult) => {
            if (value.value) {
              this.arrayListFiles = [];
            } else {
              this.radioUpme = false;
              this.showUploadAlso = true;
              this.typeProjectSelect = null;
              this.typeProjectSelect = this.typeProjectSelectTemp;
            }
          });
      }
    }

  }

  //ok unit test
  clearNumberAnnoucement() {
    this.nameNumberAnnoucement = null;
    this.numberAnnoucement = null;
    this.yearUpemSelect = null;
  }

  //OK unit test
  onSelectAnnouncement($event: any) {
    if ($event) {
      this.award = 'Convocatoria UPME';
      this.showUploadAlso = false;
      this.nameNumberAnnoucement = 'UPME ' + this.typeProjectSelect.detailValue;
      if (this.arrayHaveDocumentOrFPO()) {
        this.messageService.openGeneralConfirm("¿ Esta seguro que el proyecto es por convocatoria? se eliminarán los conceptos adjuntos")
          .then((value: SweetAlertResult) => {
            if (value.value) {
              this.radioUpme = true;
              this.arrayListFiles = [];
            } else {
              this.radioUpme = false;
              this.setPropertiesNotAnnoucement();
            }
          });
      }
    } else {
      this.setPropertiesNotAnnoucement();
    }
    this.transmisionDTO.AnnouncementUpme = this.radioUpme;
    this.transmisionDTO.AdjudicationTypeID = +this.typeAdjudicationList.filter((item) => item.detailValue === this.award)[0].typeMRID;
  }

  setPropertiesNotAnnoucement() {
    this.nameNumberAnnoucement = null;
    if (this.typeProjectSelect.detailValue === 'STN') {
      this.award = 'Ampliación del STN';
      this.showUploadAlso = false;
    } else {
      this.award = 'Expansión del Operador de Red';
      this.showUploadAlso = true;
    }
  }

  arrayHaveDocumentOrFPO(): boolean {
    let objToReturn = false;
    if (this.arrayListFiles.length > 0) {
      this.arrayListFiles.forEach(element => {
        if (element.name || element.datePicker) {
          objToReturn = true;
        }
      });
    }
    return objToReturn;
  }


  // OK unit test
  validNumberAnnoucement(value: string) {
    if (value.length > 2 && this.numberAnnoucement) {
      this.numberAnnoucement = this.numberAnnoucement.substring(1, this.numberAnnoucement.length);
    } else {
      this.numberAnnoucement = ("" + value).replace(/[^0-9]/g, "0");
    }
  }


  //ok unit test
  focusOut(evt) {
    if (typeof (evt) === 'object') {
      this.validation_alert_danger[evt.srcElement.name] = false;
    } else {
      this.validation_alert_danger[evt] = false;
    }
  }

  validControl(singupForm: NgForm) {
    // validamos todos los campos del formulario
    let valid = true;
    if (!this.isUnitTest) {

      for (let key in singupForm.controls) {
        // tslint:disable-next-line: max-line-length
        if (singupForm.controls[key].status === 'INVALID' && (singupForm.value[key] === undefined || singupForm.value[key] === '' || singupForm.value[key] === null)) {
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

  getClasses(variable, index: any) {
    if (this.validation_alert_danger[variable][index]) {
      return true;
    }
    return false;
  }


  onSubmit(singupForm: NgForm) {

    this.submitFather = true;

    if (!singupForm.valid || !this.formChildValid) {
      // alertForm.style.display = 'block';
      if (!this.validControl(singupForm)) {
        Util.setFocus('txtnameProject', this.aForm);
      }
      return;
    }
    this.hiddenLoader = false;
    this.setObjTransmision();
    this.sendData();
  }

  private sendData() {
    if (!this.arrayListFiles || this.arrayListFiles.length === 0) {
      this.sendRegisterTransmision();
      return;
    }

    this.transmisionDTO.DocumentsUpme = [];
    let existFileToSend = false;
    let fileId = 0;

    for (const file of this.arrayListFiles) {
      fileId++;

      if (!file.id) {
        existFileToSend = true;

        this.documentsService.uploadDocumentUpme(this.transmisionDTO, file)
          .subscribe((resp: any) => {
            this.transmisionDTO.DocumentsUpme.push(this.getNewDocumentUpme(file, resp.Url, fileId));
            file.sended = true;

            if (this.allDocumentsSended()) {
              this.sendRegisterTransmision();
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
        this.transmisionDTO.DocumentsUpme.push(this.getNewDocumentUpme(file, file.urlDocument, fileId));
      }
    }

    if (!existFileToSend) {
      this.sendRegisterTransmision();
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

  private sendRegisterTransmision() {
    this.transmisionService.registerTransmisionProyect(this.transmisionDTO)
      .subscribe((resp: any) => {
        this.hiddenLoader = true;
        const formmat = this.pipeproj.transform(resp.id, 'PTRA', '5');
        this.messageService.openSucessConfirm(
          {
            title: '',
            text: 'El proyecto  ' + formmat + ' se ha enviado exitosamente.',
            confirmButtonText: 'Aceptar'
          })
          .then((value: SweetAlertResult) => {
            if (value.value) {
              this.clickBack();
            }
          });
      }, (error: HttpErrorResponse) => {
        this.hiddenLoader = true;
        if (error.status === 422) {
          this.messageService
            .openWarning(error.error.Errors[0].Message.toString());
        } else {
          this.messageService.openError(
            {
              title: 'No se ha podido finalizar el envío: ',
              text: 'En el momento no se puede ejecutar la operación. Intente de nuevo o informe al administrador del sistema.'
            });
        }
        throw error;
      });
  }


  private setObjTransmision() {
    if (!this.editProjectId) {
      this.transmisionDTO.ProjectID = null; // null to save transmision
    }
    if (this.transmisionDTO.AnnouncementUpme) {
      this.transmisionDTO.AnnouncementNumberUpme = this.nameNumberAnnoucement + '-' + this.numberAnnoucement + '-' + this.yearUpemSelect;
    } else {
      this.transmisionDTO.AnnouncementNumberUpme = null;
    }

    this.transmisionDTO.SubAreaID = this.subAreaSelect ? this.subAreaSelect.id : null;

    if (this.stagesList != null && this.stagesList.length > 0) {
      this.transmisionDTO.Stages = [];
      let i = 1;
      this.stagesList.forEach(element => {

        this.transmisionDTO.Stages.push({
          StageOrder: i,
          FpoDate: Util.convertNgStructToDate(element.date),
          StageDescription: element.StageDescription
        });
        i++;
      });
    } else {
      this.transmisionDTO.Stages = null;
    }

    this.transmisionDTO.ProjectFpo = new Date(Util.convertNgStructToDate(this.projectFPO));

    for (const promoter of this.promoterList) {
      if (promoter.id === this.transmisionDTO.PromoterId) {
        this.transmisionDTO.PromoterName = promoter.name;
        break;
      }
    }
    //data of change state edit mode 
    if (this.stateRequirement != null && this.stateRequirement && this.stateRequirement.projectRequirementRId != null
      && this.stateRequirement.projectRequirementRId) {
      this.transmisionDTO.ProjectRequirementRId = this.stateRequirement.projectRequirementRId;
    }
  }


  onEventChild($event: IStageFormModel) {

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

  //---------------------------------*  FILE METHODS *-----------------------//


  onDeleteFileAndDate(index: any, event: any) {
    event.preventDefault();
    this.messageService.openGeneralConfirm("¿Desea eliminar el documento adjunto?")
      .then((value: SweetAlertResult) => {
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
    event.preventDefault();
    if (!this.isUnitTest) {
      const modalRef = this.modalService.open(ModalViewFileXmComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.file = file;
    }
  }


  clickStateRequirement(event: any) {
    this.hiddenLoader = false;

    if (this.editId !== null && this.editId && this.stateRequirement != null
      && this.stateRequirement && this.stateRequirement.projectRequirementRId) {
      this.updateStateDTO.statusId = event;
      this.updateStateDTO.projectId = this.editId;
      this.updateStateDTO.projectRequirementId = this.stateRequirement.projectRequirementRId;
      if (event === 57) {
        const modalRef = this.modalService.open(JustificationModalComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.titleModal = "Justificación del rechazo de los cambios del formulario";
        //entra si la accion es rechazado
        modalRef.result.then((result) => {
          this.updateStateDTO.justification = result;
          this.setStateRequirement();
        }).catch((error) => {
        });
      } else {
        this.setStateRequirement();
      }
    }
  }


  private setStateRequirement() {
    this.projectRequirementService.registerStateRequirement(this.updateStateDTO)
      .subscribe((resp: any) => {
        this.hiddenLoader = false;
        if (!this.isUnitTest) {
          this.router.navigate([`requirements`]);
        }
      }, (error: any) => {
        throw error;
      });
  }

  onselectDateOfDocument(file: any) {
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
  //---------------------------------* END FILE METHODS *-----------------------//

  clickBack() {
    if (this.editId != null && this.editId) {
      if (!this.isUnitTest) {
        this.router.navigate([`transmision/requirementsProject`, this.editId]);
      }
    } else {
      if (!this.isUnitTest) {
        this.router.navigate([`transmision`]);
      }
    }
  }




}