import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFileXM } from '@shared/model/file-xm.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewFileXmComponent } from '@shared/components/modal-view-file-xm/modal-view-file-xm.component';
import { Util } from '@shared/util';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';
import { IUnifilarDiagram } from '@core/entry-projects/model/IUnifilarDiagram';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';
import { IUpdateState } from '@core/entry-projects/model/IUpdateState';
import { IStateRequirement } from '@core/entry-projects/model/IStateRequirement';
import { DocumentsService } from '@shared/services/proyect-entry/documents.service';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';

@Component({
  selector: 'app-singleline-diagram',
  templateUrl: './singleline-diagram.component.html',
  styleUrls: ['./singleline-diagram.component.scss']
})
export class SinglelineDiagramComponent implements OnInit {

  idProject: number;
  isTestUnit = false;


  // File Variables
  maxSizeFile = 20;  // hace referencia al tamaño máximo que tendrá cada archivo (MB)
  formartFile: string[] = [];  // hace referencia a la lista de formatos que se permitirian ejem ['.pdf', '.jpg']
  maxLengthFile = 10;  // se refiere a el maximo de documentos admitidos
  arrayListFiles: IFileXM[] = [];  // lista de archivos
  arrayListFilesToShow: IFileXM[] = [];  // lista de archivos


  listUnifilarDiagram: IUnifilarDiagram[] = [];

  hiddenLoader = true;

  updateStateDTO: IUpdateState = {};
  arrayRequirements: any[] = [];
  stateRequirement: IStateRequirement = {};

  queryMode = false;

  text: any;
  documentMetadata: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly modalService: NgbModal,
    private readonly messageService: MessageService,
    private readonly transmisionService: TransmisionService,
    private readonly projectRequirementService: ProjectRequirementService,
    private readonly documentsService: DocumentsService,
    private readonly promoterService: PromoterService

  ) {
    this.buildFormatFiles();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (Boolean(id)) {
      this.idProject = +id;
      this.text = 'Adjunte aquí todos los diagramas unifilares respectivos del proyecto ' + this.idProject;
      this.getRequirements(this.idProject);
      this.GetProjectMetadata();
    }
  }

  buildFormatFiles() {
    this.formartFile = ['.docx', '.pdf', '.xlsx', '.pptx', '.png', '.jpg', '.img', '.txt', '.zip'];
  }

  getRequirements(idProy: any) {
    this.projectRequirementService.getRequirementOfProyect('?projectId=' + idProy)
      .subscribe((resp: any) => {
        console.log('===>');
        console.log(resp);
        this.arrayRequirements = resp.items;
        if (this.arrayRequirements != null && this.arrayRequirements.length > 0) {
          this.evalStateRequirement();
        }
      }, (error: any) => {
        throw error;
      });
  }

  private evalStateRequirement() {
    console.log('this.arrayRequirements');
    console.log(this.arrayRequirements);
    this.arrayRequirements.forEach(element => {
      //requirementId == 3 es el requisito de 'unifilar'
      if (element.requirementId === 3) {
        this.stateRequirement = element;
        // 54 es id de estado pendiente
        if (element.requirementStatusId === 55) {
          this.queryMode = true;
        }
        this.searchDocuments();
      }
    });
  }

  searchDocuments() {
    this.transmisionService.getSingleLineDiagramsByProyect(this.idProject)
      .subscribe((res: IUnifilarDiagram[]) => {
        console.log('=========>res');
        console.log(res);
        if (res != null && res && res.length > 0) {
          this.arrayListFiles = this.toMapObj(res);
          this.arrayListFilesToShow = Object.assign([], this.arrayListFiles);
        }
      }, (error: HttpErrorResponse) => {

        throw error;
      });
  }

  toMapObj(res: IUnifilarDiagram[]): IFileXM[] {
    const newList: IFileXM[] = [];
    res.forEach(element => {
      const doc: IFileXM = {};
      doc.name = element.documentName;
      doc.id = element.documentId;
      doc.instanceDocument = element.documentInstanceId;
      doc.urlDocument = element.urlDocument;
      doc.sended = true;
      doc.remove = false;
      newList.push(doc);
    });
    return newList;
  }


  clickBack() {
    if (this.idProject != null && this.idProject) {
      if (!this.isTestUnit) {
        this.router.navigate([`transmision/requirementsProject`, this.idProject]);
      }
    }
  }

  downloadFile(file: IFileXM, event) {
    event.preventDefault();
    if (!this.isTestUnit) {
      Util.downloadFile(file.base64, file.name);
    }
  }


  onDeleteFileAndDate(index: any, event: any) {
    event.preventDefault();
    this.messageService.openGeneralConfirm("¿Desea eliminar el documento adjunto?")
      .then((value: SweetAlertResult) => {
        if (value.value) {
          if (this.arrayListFiles[index].urlDocument !== null) {
            console.log('viejo');
            this.arrayListFiles[index].remove = true;
            this.arrayListFilesToShow = Util.deleteElement(this.arrayListFilesToShow, index);
          } else {
            console.log('nuevo');
            this.arrayListFiles = Util.deleteElement(this.arrayListFiles, index);
            this.arrayListFilesToShow = this.arrayListFiles;
          }
        }
      });
  }

  viewFile(file: any, event: any) {
    event.preventDefault();
    if (!this.isTestUnit) {
      const modalRef = this.modalService.open(ModalViewFileXmComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.file = file;
    }
  }

  sendUnifilarDiagram() {

    this.addShowFilesToArray();

    if (!this.arrayListFiles || this.arrayListFiles.length === 0) {
      return;
    }
    this.hiddenLoader = false;
    let existFileToSend = false;
    let fileId = 0;

    for (const file of this.arrayListFiles) {
      fileId++;

      if (!file.id) {
        existFileToSend = true;

        this.documentsService.uploadSinglelineDiagram(this.documentMetadata, file)
          .subscribe((resp: any) => {
            console.log('==> resp');
            console.log(resp);
            this.addUnifilarObj(file, resp.Url);
            file.sended = true;

            if (this.allDocumentsSended()) {
              this.createUnifilarDiagram();
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
        this.addUnifilarObj(file, file.urlDocument);
      }
    }

    if (!existFileToSend) {
      this.createUnifilarDiagram();
    }
  }

  addShowFilesToArray() {
    if (this.arrayListFilesToShow != null && this.arrayListFilesToShow.length > 0) {
      this.arrayListFilesToShow.forEach(element => {
        if (element.urlDocument == null) {
          this.arrayListFiles.push(element);
        }
      });
    }
  }

  private addUnifilarObj(file: IFileXM, url: string) {
    if (this.idProject != null && this.idProject) {
      const unifilarObj: IUnifilarDiagram = {};
      unifilarObj.connectionConceptUpme = file.name;
      unifilarObj.documentId = this.listUnifilarDiagram.length + 1;
      unifilarObj.projectID = this.idProject;
      unifilarObj.remove = file.remove;
      unifilarObj.urlDocument = url;
      unifilarObj.instanceDocument = file.instanceDocument;
      this.listUnifilarDiagram.push(unifilarObj);
    }
  }

  private createUnifilarDiagram() {
    console.log('this.listUnifilarDiagram');
    console.log(this.listUnifilarDiagram);

    this.transmisionService
      .createUnifilarDiagram(this.listUnifilarDiagram)
      .subscribe(resp => {
        this.messageService.openSucessConfirm(
          {
            title: '',
            text: 'La información se ha enviado con éxito.',
            confirmButtonText: 'Aceptar'
          })
          .then((value: SweetAlertResult) => {
            if (value.value) {
              this.clickBack();
            }
          });
        console.log(resp);
      }, (error: HttpErrorResponse) => {

        throw error;
      });
  }


  changeStateRequirement() {
    // 56 estado aprobado
    if (this.idProject !== null && this.idProject && this.stateRequirement != null
      && this.stateRequirement && this.stateRequirement.projectRequirementRId) {
      this.updateStateDTO.statusId = 56;
      this.updateStateDTO.projectId = this.idProject;
      this.updateStateDTO.projectRequirementId = this.stateRequirement.projectRequirementRId;
      this.setStateRequirement();
    }
  }


  private setStateRequirement() {
    console.log('this.updateStateDTO');
    console.log(this.updateStateDTO);
    this.projectRequirementService.registerStateRequirement(this.updateStateDTO)
      .subscribe((resp: any) => {
        this.hiddenLoader = false;
        if (!this.isTestUnit) {
          this.router.navigate([`requirements`]);
        }
      }, (error: any) => {
        this.hiddenLoader = false;
        throw error;
      });
  }

  private GetProjectMetadata() {
    this.documentMetadata = {
      ProjectType: 2,
      ProjectName: null,
      PromoterName: null,
      ProjectInstanceId: null
    };

    this.transmisionService.getProjectById(this.idProject)
      .subscribe((res: any) => {
        if (res) {
          this.documentMetadata.ProjectName = res.projectName;
          this.documentMetadata.ProjectInstanceId = res.transmissionInstanceId;

          this.promoterService.getPromoterById(res.promoterId)
            .subscribe((resPromoter: any) => {
              this.documentMetadata.PromoterName = resPromoter.name;
            }, (error: any) => {
              this.hiddenLoader = false;
              throw error;
            });
        }
      }, (error: any) => {
        this.hiddenLoader = false;
        throw error;
      });
  }

  private allDocumentsSended(): boolean {
    for (const file of this.arrayListFiles) {
      if (!file.sended) {
        return false;
      }
    }
    return true;
  }




}
