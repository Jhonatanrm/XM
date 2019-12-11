import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Button } from '@core/entry-projects/model/IButton';
import { IFilter } from '@shared/model/filter';
import { MessageService } from '@shared/services/message.service';
import { RequirementsService } from '@shared/services/requirements/requirements.service';
import { Util } from '@shared/util';
import { HttpErrorResponse } from '@angular/common/http';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { ChgParameterTablePipe } from '@shared/pipes/chg-parameter-table-pipe/chgParameterTable-pipe.pipe';

@Component({
  selector: 'app-table-chg-prm',
  templateUrl: './table-chg-prm.component.html',
  providers: [ChgParameterTablePipe]
})
export class TableChgPrmComponent implements OnChanges {

  @Input() object: any;

  // Control
  load: boolean; // Controla el loading de la pantalla resumen

  columNameSortList: string[] = []; // Este atributo almacenará las columnas por las cuales puede ordenar
  buttonList: Button[] = []; // Este atributo almacenara los botones de la columna acción de la tabla.

  columNameList: string[] = []; // Este atributo almacenará el encabezado de la tabla
  rowNameList: string[] = []; // Este atributo almacenará los elementos del cuerpo de la tabla.
  filterInfo: IFilter = {}; // Este atributo almacenará y controlará las MetaData

  rowItem: any;
  stageOrder: any;

  objectSearch: any = {}; // Este atributo será el que reciba el servicio y separe los Items y la MetaData.

  constructor(
    private requirementsService: RequirementsService,
    private messageService: MessageService,
    private masterData: MastereDataService,
    private chgParameterPipe: ChgParameterTablePipe) {
    this.filterInfo.limit = 10; // Numero de elementos (rows) por pagina
    this.objectSearch.items = [];
    this.objectSearch.metadata = {
      pagination: {
        currentPage: 1,
        limit: 50,
        nextOffset: 0,
        offset: 0,
        pageCount: 0,
        previousOffset: 0,
        totalCount: 1
      },
      sortedBy: null
    };
    this.load = false;
  }

  public getRequirementsService() {
    return this.requirementsService;
  }

  ngOnChanges() {

    // Construccion
    this.buildColumNameList();
    this.buildColumSortList();
    this.buildRowNameList();
    this.buildButtonList();
    // llamada a servicio constructor
    this.setRequirements(Util.filterAccionPlus(this.filterInfo, {}));
  }

  setRequirements(filterQuery: string, attrBody?: any): void {
    this.getRequirementsService().getAssetChangeParameter(+this.object.elementInstanceId, this.object.elementType)
      .subscribe(resp => {

        this.load = true;
        this.objectSearch.items = resp;
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
    this.columNameList.push('Parametro:');
    this.columNameList.push('Anterior:');
    this.columNameList.push('Nuevo:');
  }

  buildColumSortList() {
    this.columNameSortList = [];
    this.columNameSortList.push('parameter');
    this.columNameSortList.push('before');
    this.columNameSortList.push('after');
  }

  buildRowNameList() {
    this.rowNameList = [];
    this.rowNameList.push('parameter');
    this.rowNameList.push('before');
    this.rowNameList.push('after');
  }
  buildButtonList() {
    this.buttonList = [
    ];
  }

  // Esta función permite las múltiples llamadas a la bd y re-construye la tabla cuando sea necesario
  onEventChild(evt: any) {
    return;
  }

  eventClickInButtons(functionButton: any) {
  }

  private mapData(response: any): any[] {
    const dataList: any[] = [];

    response.forEach(
      (mapElement: {
        parameter: string; before: string; after: string
      }) => {
        const dataListElement: any = {};

        dataListElement.parameter = this.chgParameterPipe.transform(mapElement.parameter);

        if (mapElement.parameter === 'XmGeographicLocation') {
          // Consulta el departamento y el municipio por geographicID
          this.masterData.getLocationByGeographicLocationID(+mapElement.before).subscribe((respuesta) => {
            dataListElement.before = (`${respuesta.departmentName} - ${respuesta.municipalityName}`);
          });
          this.masterData.getLocationByGeographicLocationID(+mapElement.after).subscribe((respuesta) => {
            dataListElement.after = (`${respuesta.departmentName} - ${respuesta.municipalityName}`);
          });
        } else if (mapElement.parameter === 'XMSubAreaID') {
          // Consulta la área y la subárea por idSubArea
          this.masterData.getSubAreaById(+mapElement.before).subscribe((respuesta) => {
            dataListElement.before = (`${respuesta.area.name} - ${respuesta.name}`);
          });
          this.masterData.getSubAreaById(+mapElement.after).subscribe((respuesta) => {
            dataListElement.after = (`${respuesta.area.name} - ${respuesta.name}`);
          });
        } else if (mapElement.parameter === 'OwnerAgent' || mapElement.parameter === 'OperatingAgent') {
          // Consulta la área y la subárea por idSubArea
          this.masterData.getAgentById(mapElement.before).subscribe((respuesta) => {
            dataListElement.before = respuesta.nombreAgente;
          });
          this.masterData.getAgentById(mapElement.after).subscribe((respuesta) => {
            dataListElement.after = respuesta.nombreAgente;
          });
        } else {
          dataListElement.before = this.chgParameterPipe.transform(mapElement.before);
          dataListElement.after = this.chgParameterPipe.transform(mapElement.after);
        }


        dataList.push(dataListElement);
      });

    return dataList;
  }

}
