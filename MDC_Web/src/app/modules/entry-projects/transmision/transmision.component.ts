import { Component, OnInit } from '@angular/core';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITransmisionSearch } from '@core/entry-projects/model/ITransmisionSearch';
import { IFilter } from '@shared/model/filter';
import { Util } from '@shared/util';
import { ITransmisionDTO } from '@core/entry-projects/model/ITransmisionDTO';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from '@core/entry-projects/model/IButton';
import { MessageService } from '@shared/services/message.service';
import { EditStateModalService } from '@shared/services/proyect-entry/edit-state-modal.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './transmision.component.html',
  providers: [ProjectPipe, DatePipe]
})
export class ProjectListComponent implements OnInit {

  transmisionSearch: ITransmisionSearch = {};

  transmisionStageSearch: ITransmisionSearch = {};

  showTableTransmisionProject = false;

  showTableTransmisionStageProject = false;

  columNameList: string[] = [];


  columNameSortList: string[] = [];


  rowNameList: string[] = [];

  filterInfo: IFilter = {};

  totalProjects: number;

  viewStages = false;

  transmisionProjectsCopy: ITransmisionSearch;

  buttonList: Button[] = []; // Este atributo almacenara los botones de la columna acción de la tabla.

  load = false;

  constructor(
    private readonly transmisionService: TransmisionService,
    private readonly datePipe: DatePipe,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly editService: EditStateModalService
  ) {

    // items per page
    this.filterInfo.limit = 10;

    this.setTransmisionProjects(Util.filterAccion(this.filterInfo));
    this.buildColumNameList();
    this.buildColumSortList();
    this.buildRowNameList();
    this.buildButtonList();
  }

  ngOnInit() {

  }

  setTransmisionProjects(filterQuery: string) {
    this.load = true;
    this.transmisionService.searchTransmisionProyect(filterQuery)
      .subscribe((resp: any) => {
        this.transmisionProjectsCopy = resp;
        this.transmisionSearch.metadata = resp.metadata;
        this.transmisionSearch.items = this.mapData(resp);

        this.showTableTransmisionProject = true;
        this.showTableTransmisionStageProject = false;
        this.totalProjects = this.transmisionSearch.metadata.pagination.totalCount;
        this.load = false;
      }, (error: HttpErrorResponse) => {
        this.load = false;
        throw error;
      });
  }


  setTransmisionStageProjects(filterQuery: string) {

    this.transmisionService.searchTransmisionStageProyect(filterQuery)
      .subscribe((resp: any) => {
        this.transmisionStageSearch.metadata = resp.metadata;
        this.transmisionStageSearch.items = this.mapData(resp);

        this.showTableTransmisionProject = false;
        this.showTableTransmisionStageProject = true;
        this.totalProjects = this.transmisionStageSearch.items.length;
        this.totalProjects = this.transmisionStageSearch.metadata.pagination.totalCount;
      }, (error: HttpErrorResponse) => {
        throw error;
      });
  }


  viewBy(typeView: string) {
    this.filterInfo.numberPage = 1;
    this.filterInfo.sort = null;
    if (typeView === 'etapas') {

      this.buildInfoStage();
      this.viewStages = true;
    } else {
      this.setTransmisionProjects(Util.filterAccion(this.filterInfo));
      this.viewStages = false;
    }
  }

  buildColumNameList() {
    this.columNameList = ['Código', 'Nombre del Proyecto', 'FPO', 'Promotor',
    'Área operativa', 'Tipo de proyecto', 'Adjudicación', 'Estado proyecto'];
  }

  buildRowNameList() {
    this.rowNameList = ['ProjectCode', 'ProjectName', 'ProjectFpoFormated',
    'PromoterName', 'AreaName', 'ConnectionType', 'AdjudicationType', 'StateDescription'];
  }

  buildColumSortList() {
    this.columNameSortList = ['projectRIDModified', 'ProjectName', 'ProjectFpo',
    'PromoterName', 'AreaName', 'ConnectionType', 'adjudicationDescription', 'stateDescription'];
  }

  // Esta funcion crea los botones de la columna acción en la tabla
  buildButtonList() {
    this.buttonList = [
      {
        buttonName: 'Editar',
        className: 'xm-btn-editar',
        iconName: 'open_in_new'
      }, {
        buttonName: 'Comentar',
        className: 'xm-btn-editar',
        iconName: 'textsms'
      },
      {
        buttonName: 'Editar_Estado',
        className: 'xm-btn-editar',
        iconName: 'sync_alt'
      }
    ];
  }


  onEventChild(filterQuery: string) {
    if (this.viewStages) {
      this.setTransmisionStageProjects(filterQuery);
    } else {
      this.setTransmisionProjects(filterQuery);
    }
  }


  private buildInfoStage() {
    this.setTransmisionStageProjects(Util.filterAccion(this.filterInfo));
  }


  private mapData(response: any): any[] {
    const dataList: ITransmisionDTO[] = [];

    response.items.forEach(element => {
      const dataListElement: ITransmisionDTO = {};

      dataListElement.ProjectCode = element.projectRIDModified;
      if (this.viewStages) {
        dataListElement.ProjectName = element.projectName + ' Etapa ' + element.stageOrder;
      } else {
        dataListElement.ProjectName = element.projectName;
      }
      dataListElement.ProjectFpoFormated = this.datePipe.transform(element.projectFpo, 'dd/MM/yyyy');
      dataListElement.PromoterName = element.promoterName;
      dataListElement.AreaName = element.areaName;
      dataListElement.ConnectionType = element.connectionType;
      dataListElement.AdjudicationType = element.adjudicationDescription;
      dataListElement.StateDescription = element.stateDescription;
      dataListElement.VersionComments = element.versionComments;

      dataList.push(dataListElement);
    });

    return dataList;
  }


  // Esta funcion controla la ejecución de los botones de la tabla
  eventClickInButtons(functionButton: any) {
    const project: any = this.transmisionProjectsCopy
      .items.find((item: any) => item.projectRIDModified === functionButton.row.ProjectCode);
    switch (functionButton.buttonElement.buttonName) {
      case 'Comentar':
        this.openEditStateModal(project, true);
        break;
      case 'Editar':
        this.router.navigate([`transmision/requirementsProject`, project.projectInstanceId]);
        break;
      case 'Editar_Estado':
        this.openEditStateModal(project, false);
        break;
      default:
        this.messageService.openWarning('No puede utilizar esta función, para mas información consulte con el Adminstrador.');
    }
  }

  openEditStateModal(project: any, hasChanged: boolean) {
    this.editService.openModal(project, hasChanged)
      .then(() => this.setTransmisionProjects(Util.filterAccion(this.filterInfo)))
      .catch(() => {});
  }

}
