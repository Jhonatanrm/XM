import { IGenerationDTO } from '../../../core/entry-projects/model/IGenerationDTO';
import { Component, OnInit } from '@angular/core';
import { GenerationService } from '@shared/services/proyect-entry/generation.service';
import { IFilter } from '@shared/model/filter';
import { IGenerationSearch } from '@core/entry-projects/model/IGenerationSearch';
import { Util } from '@shared/util';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from '@core/entry-projects/model/IButton';
import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-generacion',
  templateUrl: './generacion.component.html',
  providers: [ProjectPipe, DatePipe]
})
export class GeneracionComponent implements OnInit {

  generationSearch: IGenerationSearch = {};

  generationSearchCopy: IGenerationSearch = {};

  generationStageSearch: IGenerationSearch = {};

  showTableGenerationProject = false;

  showTableGenerationStageProject = false;

  columNameList: string[] = [];

  columNameSortList: string[] = [];

  rowNameList: string[] = [];

  filterInfo: IFilter = {};

  totalProjects: number;

  viewStages = false;

  buttonList: Button[] = []; // Este atributo almacenara los botones de la columna acción de la tabla.


  constructor(
    private readonly generationService: GenerationService,
    private readonly datePipe: DatePipe,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {

    // items per page
    this.filterInfo.limit = 10;

    this.buildColumNameList();
    this.buildRowNameList();
    this.buildColumSortList();
    this.buildButtonList();
  }

  ngOnInit() {
    this.setGenerationProjects(Util.filterAccion(this.filterInfo));
  }

  buildColumNameList() {
    this.columNameList = ['Código', 'Nombre del Proyecto', 'CEN', 'FPO', 'Recurso Generación', 'Promotor', 'Área Operativa'];
  }

  buildRowNameList() {
    this.rowNameList = ['ProjectCode', 'ProjectName', 'NetEffectiveCapacity',
      'ProjectFpoFormated', 'GenerationResource', 'GenerationResource', 'PromoterName', 'AreaName'];
  }

  buildColumSortList() {
    this.columNameSortList = ['projectRIDModified', 'ProjectName', 'NetEffectiveCapacity',
    'ProjectFpo', 'GenerationResource', 'PromoterName',  'AreaName' ];
  }

  // Esta funcion crea los botones de la columna acción en la tabla
  buildButtonList() {
    this.buttonList = [
      {
        buttonName: 'Editar',
        className: 'xm-btn-editar',
        iconName: 'open_in_new'
      }
    ];
  }

  setGenerationProjects(filterQuery: string) {
    this.generationService.searchGenerationProject(filterQuery)
      .subscribe((resp: any) => {
        this.generationSearchCopy = resp;
        this.showTableGenerationProject = true;
        this.showTableGenerationStageProject = false;
        this.generationSearch.items = this.mapData(resp);
        this.generationSearch.metadata = resp.metadata;
        this.totalProjects = this.generationSearch.metadata.pagination.totalCount;

      }, (error: HttpErrorResponse) => {
        console.log(error);
        throw error;
      });
  }

  setGenerationStageProjects(filterQuery: string) {
    this.generationService.SearchGenerationStageProject(filterQuery)
      .subscribe((resp: any) => {
        this.showTableGenerationProject = false;
        this.showTableGenerationStageProject = true;
        this.generationStageSearch.items = this.mapData(resp);
        this.generationStageSearch.metadata = resp.metadata;
        this.totalProjects = this.generationStageSearch.metadata.pagination.totalCount;
      }, (error: HttpErrorResponse) => {
        console.log(error);
        throw error;
      });
  }

  onEventChild(filterQuery: string) {
    if (this.viewStages) {
      this.setGenerationStageProjects(filterQuery);
    } else {
      this.setGenerationProjects(filterQuery);
    }
  }

  viewBy(typeView: string) {
    this.filterInfo.numberPage = 1;
    this.filterInfo.sort = null;
    if (typeView === 'etapas') {
      this.buildInfoStage();
      this.viewStages = true;
    } else {
      this.setGenerationProjects(Util.filterAccion(this.filterInfo));
      this.viewStages = false;
    }
  }

  private buildInfoStage() {
    this.setGenerationStageProjects(Util.filterAccion(this.filterInfo));
  }

  private mapData(response: any): any[] {
    const dataList: IGenerationDTO[] = [];

    response.items.forEach(element => {
      const dataListElement: IGenerationDTO = {};

      dataListElement.ProjectCode = element.projectRIDModified;
      dataListElement.ProjectFpoFormated = this.datePipe.transform(element.projectFpo, 'dd/MM/yyyy');
      dataListElement.GenerationResource = element.generationResource;
      dataListElement.PromoterName = element.promoterName;
      dataListElement.AreaName = element.areaName;

      if (this.showTableGenerationStageProject) {
        dataListElement.ProjectName = element.projectName + ' Etapa ' + element.stageOrder;
      } else {
        dataListElement.ProjectName = element.projectName;
        dataListElement.NetEffectiveCapacity = element.netEffectiveCapacity;
      }

      dataList.push(dataListElement);
    });

    return dataList;
  }


  // Esta funcion controla la ejecución de los botones de la tabla
  eventClickInButtons(functionButton: any) {
    if (functionButton.buttonElement.buttonName === 'Editar') {
      const project: any = this.generationSearchCopy.items.find((item: any) => item.projectRIDModified === functionButton.row.ProjectCode);
      this.router.navigate([`generacion/createProject`, project.projectInstanceId]);
    } else {
      this.messageService.openWarning('No puede utilizar esta función, para mas información consulte con el Adminstrador.');
    }
  }




}
