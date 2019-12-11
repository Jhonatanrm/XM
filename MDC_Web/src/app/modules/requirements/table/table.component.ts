import { Component, OnInit, OnChanges, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { IFilter } from '@shared/model/filter';
import { RequirementsService } from '@shared/services/requirements/requirements.service';
import { Util } from '@shared/util';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '@shared/services/message.service';
import { Button } from '@core/entry-projects/model/IButton';
import { globalConstants } from '@const';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [DatePipe]
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {

  // variables de entrada
  @Input() filterState: any;
  // variables de salida
  idPendingDateRequirement: any;

  // Control
  load: boolean; // Controla el loading de la pantalla resumen
  closeResult: string; // Valida el cierre del formulario de cambio fecha pendiente

  columNameSortList: string[] = []; // Este atributo almacenará las columnas por las cuales puede ordenar
  buttonList: Button[] = []; // Este atributo almacenara los botones de la columna acción de la tabla.

  columNameList: string[] = []; // Este atributo almacenará el encabezado de la tabla
  rowNameList: string[] = []; // Este atributo almacenará los elementos del cuerpo de la tabla.
  filterInfo: IFilter = {}; // Este atributo almacenará y controlará las MetaData

  rowItem: any;
  stageOrder: any;

  objectSearch: any = {}; // Este atributo será el que reciba el servicio y separe los Items y la MetaData.
  urls = globalConstants.redirectUrls;

  constructor(
    private requirementsService: RequirementsService,
    private messageService: MessageService,
    public routerLink: Router,
    private datePipe: DatePipe) {
    this.filterInfo.limit = 10; // Numero de elementos (rows) por pagina
    this.objectSearch.items = [];
    this.objectSearch.metadata = {
      pagination: {
        currentPage: 1,
        limit: 10,
        nextOffset: 0,
        offset: 0,
        pageCount: 0,
        previousOffset: 0,
        totalCount: 10
      },
      sortedBy: null
    };
    this.load = false;
  }
  public getRequirementsService() {
    return this.requirementsService;
  }


  ngOnInit() {
    // Construccion
    this.buildColumNameList();
    this.buildColumSortList();
    this.buildRowNameList();
    this.buildButtonList();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.onFilterStage(this.filterState); // aqui llega la variable del padre modificada por el hijo
  }

  ngOnDestroy(): void {

  }

  setRequirements(filterQuery: string, attrBody?: any): void {

    this.getRequirementsService().getRequirements(filterQuery, attrBody)
      .subscribe(resp => {
        this.load = true;
        this.objectSearch.metadata = resp.metadata;
        this.objectSearch.items = resp.items;
        this.objectSearch.items = this.mapData(resp);

      }, (error: HttpErrorResponse) => {
        // Se le da manejo al error 404 cuando no hay elementos en la BD
        if (error.status === 404) {
          this.objectSearch.items = [];
          this.load = true;
        }
        console.error(error.message);
      });
  }

  buildColumNameList() {
    this.columNameList = [];
    this.columNameList.push('ID Requerimiento');
    this.columNameList.push('Tipo');
    this.columNameList.push('Solicitud');
    this.columNameList.push('Elemento o Proyecto');
    this.columNameList.push('Agente o Promotor');
    this.columNameList.push('Fecha envío');
    this.columNameList.push('Fecha pendiente');
    this.columNameList.push('Días restantes');
  }

  buildColumSortList() {
    this.columNameSortList = [];
    this.columNameSortList.push('idRequerimiento');
    this.columNameSortList.push('tipo');
    this.columNameSortList.push('solicitud');
    this.columNameSortList.push('elementoProyecto');
    this.columNameSortList.push('agentePromotor');
    this.columNameSortList.push('fechaEnvio');
    this.columNameSortList.push('fechaPendiente');
    this.columNameSortList.push('diasRestantes');
  }

  buildRowNameList() {
    this.rowNameList = [];
    this.rowNameList.push('idRequerimiento');
    this.rowNameList.push('tipo');
    this.rowNameList.push('solicitud');
    this.rowNameList.push('elementoProyecto');
    this.rowNameList.push('agentePromotor');
    this.rowNameList.push('fechaEnvio');
    this.rowNameList.push('fechaPendiente');
    this.rowNameList.push('diasRestantes');
  }
  buildButtonList() {
    this.buttonList = [
      {
        buttonName: 'Abrir',
        className: 'xm-btn-editar',
        iconName: 'launch'
      },
      {
        buttonName: 'Fecha',
        className: 'xm-btn-fecha',
        iconName: 'date_range'
      }
    ];
  }

  onFilterStage(filter?: any) {
    this.filterInfo = { limit: 10 };
    // al no tener filtro de estado
    if (filter) {
      this.setRequirements(Util.filterAccionPlus(this.filterInfo, { stateId: `${filter.typeMRID}` }));
    }
  }

  // Esta función permite las múltiples llamadas a la bd y re-construye la tabla cuando sea necesario
  onEventChild(filterQuery: string) {
    // guardamos el ultimo filtro
    if (this.filterState) {
      this.setRequirements(`${filterQuery}&stateId=${this.filterState.typeMRID}`);
    }
  }

  eventClickInButtons(functionButton: any) {
    switch (functionButton.buttonElement.buttonName) {
      case 'Abrir':
        this.routeRequirement(functionButton.row);
        break;
      case 'Fecha':
        this.changePendingDate(functionButton.row);
        break;
      default:
        this.messageService.openWarning('No puede utilizar esta función, para mas información consulte con el Adminstrador.');
    }
  }

  // Esta funcion enruta un Requirimiento para revisar segun su tipo
  routeRequirement(row: any) {
    console.log(row);

    const route = this.getUrlByType(row.typeCode, row.requestCode);

    switch (row.projectId) {
      case null:
        this.routerLink.navigate([`${route}${row.elementId}`]);
        break;
      default:
        this.routerLink.navigate([`${route}${row.projectId}`]);
        break;
    }
  }

  filterStateForReloadPage() {
    const filter = this.filterState;
    this.filterInfo = { limit: 10 };
    // al no tener filtro de estado
    if (filter) {
      this.setRequirements(Util.filterAccionPlus(this.filterInfo, { stateId: `${filter.typeMRID}` }));
    }
  }

  getUrlByType(requestTypeCode: any, requestSolicitudeCode: any) {

    console.log(requestTypeCode);
    console.log(requestSolicitudeCode);

    let key = 'url_' + requestTypeCode;

    if (requestSolicitudeCode) {
      key += '_' + requestSolicitudeCode;
    }

    console.log(key);
    console.log(this.urls[key]);

    return this.urls[key];
  }

  changePendingDate(row: any) {
    this.idPendingDateRequirement = row;
  }

  // Esta función permite reestructurar la forma en que el usuario ve los datos.
  private mapData(response: any): any[] {
    const dataList: any[] = [];

    response.items.forEach(
      (mapElement: {
        idRequerimiento: number; tipo: string; solicitud: string; elementoProyecto: string;
        agentePromotor: string; fechaEnvio: string; fechaPendiente: string; diasRestantes: number;
        elementId: number; projectId: number; typeCode: number; requestCode: number;
      }) => {
        const dataListElement: any = {};

        dataListElement.idRequerimiento = `${mapElement.idRequerimiento}`;
        dataListElement.tipo = mapElement.tipo;
        dataListElement.solicitud = mapElement.solicitud;
        dataListElement.elementoProyecto = mapElement.elementoProyecto;
        dataListElement.agentePromotor = mapElement.agentePromotor;
        dataListElement.fechaEnvio = this.datePipe.transform(mapElement.fechaEnvio, 'dd/MM/yyyy');
        dataListElement.fechaPendiente = this.datePipe.transform(mapElement.fechaPendiente, 'dd/MM/yyyy');
        dataListElement.diasRestantes = mapElement.diasRestantes;
        dataListElement.projectId = mapElement.projectId;
        dataListElement.elementId = mapElement.elementId;
        dataListElement.typeCode = mapElement.typeCode;
        dataListElement.requestCode = mapElement.requestCode;

        dataList.push(dataListElement);
      });

    return dataList;
  }

  // open(content) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
