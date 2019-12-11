import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';
import { zip } from 'rxjs';
import { IFilter } from '@shared/model/filter';
import { Util } from '@shared/util';
import { Button } from '@core/entry-projects/model/IButton';
import { DatePipe } from '@angular/common';
import { IRequirementProject } from '@core/entry-projects/model/IRequirementProject';
import { element } from 'protractor';
import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-requirements-transmision',
  templateUrl: './requirements-transmision.component.html',
  providers: [DatePipe]
})
export class RequirementsTransmisionComponent implements OnInit {

  arrayList: IRequirementProject[] = [];
  columNameList: string[] = [];
  columNameSortList: string[] = [];
  rowStyle: string[] = [];
  buttonListReq: Button[] = [];
  rowNameList: string[] = [];
  filterInfo: IFilter = {};
  respTable: any = {
    metadata: {
      pagination: {
        currentPage: 1,
        limit: 10,
        nextOffset: 0,
        offset: 0,
        pageCount: 0,
        previousOffset: 0,
        totalCount: 1
      },
      sortedBy: null
    }
  };
  idProyect: string;
  load = false;

  filterQuery: string;

  isTestUnit = false;


  constructor(
    private readonly router: Router,
    private readonly projectRequirementService: ProjectRequirementService,
    private readonly route: ActivatedRoute,
    private readonly datePipe: DatePipe,
    private readonly messageService: MessageService

  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (Boolean(id)) {
      this.idProyect = id;
      this.filterInfo.projectId = this.idProyect;
      this.filterQuery = Util.filterAccion(this.filterInfo);
      this.loadServices();
      this.buildColumNameList();
      this.buildColumSortList();
      this.buildRowNameList();
      this.buildButtonList();

    }

  }

  ngOnInit() {
  }

  buildRowStyle() {

    this.evaluateSytleByRemainingDays();
  }

  evaluateSytleByRemainingDays() {
    for (let i = 0; i < this.arrayList.length; i++) {
      if (+this.arrayList[i].remainingDays >= 0) {
        this.rowStyle.push('text-success');
      } else {
        this.rowStyle.push('text-danger');
      }
    }
  }

  buildColumNameList() {
    this.columNameList = ['Nombre requisito',
      'Fecha limite',
      'Fecha recibido',
      'Días restantes',
      'Estado'];
  }

  buildColumSortList() {
    this.columNameSortList = ['requirementName',
      'deadline',
      'receivedDate',
      'remainingDays',
      'requirementStatusName'];
  }
  buildRowNameList() {
    this.rowNameList = ['requirementName',
      'deadline',
      'receivedDate',
      'remainingDays',
      'requirementStatusName'
    ];
  }

  // Esta funcion crea los botones de la columna acción en la tabla
  buildButtonList() {
    this.buttonListReq = [
      {
        buttonName: 'Editar',
        className: 'xm-btn-editar',
        iconName: 'open_in_new'
      }
      /*
      , {
        buttonName: 'Comentar',
        className: 'xm-btn-editar',
        iconName: 'textsms'
      }
      */
    ];
  }


  loadServices() {
    this.arrayList = [];
    this.load = true;
    zip(
      this.projectRequirementService.getRequirementOfProyect(this.filterQuery)
    ).subscribe(([resp]: any) => {
      this.respTable = resp; 
      this.arrayList = this.mapData(resp);
      this.validFpoOfArray();
      this.buildRowStyle();

      this.load = false;
    }, (error: any) => {
      this.load = false;
      throw error;
    });
  }

  private validFpoOfArray() {
    if (this.arrayList != null && this.arrayList.length > 0) {
      // tslint:disable-next-line: no-shadowed-variable
      this.arrayList.forEach(element => {
        if (element.remainingDays < 0) {
          // tslint:disable-next-line: max-line-length
          this.messageService.openWarning('Debe actualizar la FPO del proyecto para cumplir con el plazo de entrega de este requisito y poder declarar en operación el proyecto.');
          return;
        }
      });

    }
  }

  getRequirements() {
    this.projectRequirementService.getRequirementOfProyect(this.filterQuery)
      .subscribe((resp: any) => {
        this.arrayList = this.mapData(resp);
      }, (error: any) => {
        this.load = false;
        console.log(error);
        throw error;
      });
  }


  private mapData(response: any): IRequirementProject[] {
    this.arrayList = [];

    if (response != null && response && response.items != null && response.items) {
      response.items.forEach(element => {
        this.arrayList.push(element);
      });
      this.arrayList.forEach(elm => {
        if (elm.receivedDate === null) {
          elm.receivedDate = '';
        }
        elm.deadline = this.datePipe.transform(elm.deadline, 'dd/MM/yyyy');
        elm.receivedDate = this.datePipe.transform(elm.receivedDate, 'dd/MM/yyyy');
      });
    }
    return this.arrayList;
  }

  // Esta función permite las múltiples llamadas a la bd y re-construye la tabla cuando sea necesario
  onEventChild(filterQuery: string) {
    this.filterQuery = filterQuery;
    this.getRequirements();
  }

  // Esta funcion controla la ejecución de los botones de la tabla
  eventClickInButtons(functionButton: any) {
    switch (functionButton.buttonElement.buttonName) {
      case 'Comentar':

        break;
      case 'Editar':
        if (!this.isTestUnit) {
          if (functionButton.row.categoryRequirementId == '62') {
            this.router.navigate([`transmision/createProject`, this.idProyect]);
          } else if (functionButton.row.categoryRequirementId == '63') {
            this.router.navigate([`activos-transmision`, this.idProyect]);
          } else if (functionButton.row.categoryRequirementId == '65') {
            this.router.navigate([`transmision/singleLineDiagram`, this.idProyect]);
          }

        }
        break;
      default:
    }
  }



  onClickBack() {
    if (!this.isTestUnit) {
      this.router.navigate([`transmision`]);
    }

  }


}
