import { Component, Input, OnChanges } from '@angular/core';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAssetsSearch } from '@core/entry-projects/model/IAssetsSearch';
import { IFilter } from '@shared/model/filter';
import { IAssets } from '@core/entry-projects/model/IAssets';
import { Util } from '@shared/util';
import { SubstationTablePipe } from '@shared/pipes/subestation-table-pipe/subTable-pipe.pipe';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { TraductionPipe } from '@shared/pipes/traduction-pipe/traduction-pipe.pipe';
import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
import { Subscription } from 'rxjs';
import { Button } from '@core/entry-projects/model/IButton';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';
import { AssetsStateEnum } from '@core/entry-projects/enums/assets-state.enum';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';

@Component({
  selector: 'app-subestacion-listar',
  templateUrl: './subestacion-listar.component.html',
  providers: [SubstationTablePipe, TraductionPipe, LowercaseFormsPipe]
})
export class SubestacionListarComponent implements OnChanges {

  @Input() project: ITransmisionProject; // Se trae el objeto proyecto para verificar cantidad de etapas
  @Input() hasRequirement: boolean;

  load: boolean; // Controla el loading de la pantalla resumen
  assetsSearch: IAssetsSearch = {}; // Este atributo será el que reciba el servicio y separe los Items y la MetaData.
  showAssetsTable: boolean; // Este atributo evita que se vea la tabla hasta que se reciba el servicio BD
  columNameList: string[] = []; // Este atributo almacenará el encabezado de la tabla
  columNameSortList: string[] = []; // Este atributo almacenará las columnas por las cuales puede ordenar
  rowNameList: string[] = []; // Este atributo almacenará los elementos del cuerpo de la tabla.
  buttonList: Button[] = []; // Este atributo almacenara los botones de la columna acción de la tabla.
  filterInfo: IFilter = {}; // Este atributo almacenará y controlará las MetaData
  dbNoInfo: boolean; // Este atributo valida si la DB tiene elementos o si la consulta viene vacia.
  listProjectStages = []; // Este atributo almacena una lista con los stageOrder de las etapas del proyecto
  rowItem: any;
  stageOrder: any;
  suscriptionNewControlSubestacion: Subscription; // Se crea para controlar el dinamismo a la hora de crear elementos en bd
  searchText: string;

  constructor(
    private activosService: ActivosTransmisionService,
    private subTablePipe: SubstationTablePipe,
    private messageService: MessageService) {

    this.filterInfo.limit = 10; // Numero de elementos (rows) por pagina
    this.assetsSearch.items = [];
    this.assetsSearch.metadata = {
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
    };
    this.load = false;
  }

  // Permite acceder
  getServiceActivosService() {
    return this.activosService;
  }

  ngOnChanges() {
    this.buildColumNameList();
    this.buildColumSortList();
    this.buildRowNameList();
    this.buildButtonList();
    if (this.project.projectName) {
      this.getProjectStages();
      this.setAssets(Util.filterAccion(this.filterInfo)); // Se aplica filtro antes de llamar a la función getAssets
      this.suscriptionNewControlSubestacion = this.activosService.observableNewControlSubestacion
        .subscribe((item: any) => {
          this.setAssets(Util.filterAccion(this.filterInfo)); // Se aplica filtro antes de llamar a la función getAssets
        });
    }
  }

  // Almacena en listProjectStages el arreglo con las etapas del proyecto.
  getProjectStages() {
    const stagesOfProject = this.project.stages;
    stagesOfProject.forEach(projectElement => {
      this.listProjectStages.push(projectElement.id);
    });
  }

  // Esta función llama al servicio y crea la tabla y filterQuery recibe y controla la consulta para facilitar la llamada simultánea a la BD
  setAssets(filterQuery: string) {
    const assetTypeNameList = [AssetTypeEnum.SUBSTATION, AssetTypeEnum.BUSBAR];
    const subAreaId = null;
    const stateCodeList = [AssetsStateEnum.INPROCESS];
    const agentCode = null;
    const idParent = null;

    this.activosService.getAssetsBk(filterQuery, this.listProjectStages, assetTypeNameList, subAreaId,
      stateCodeList, agentCode, idParent, null)
      .subscribe((resp: any) => {
        this.assetsSearch.metadata = resp.metadata;
        this.assetsSearch.items = resp.items;
        this.load = true;
        this.assetsSearch.items = this.mapData(resp);

      }, (error: HttpErrorResponse) => {
        // Se le da manejo al error 404 cuando no hay elementos en la BD
        if (error.status === 404) {
          this.assetsSearch.items = [];
          this.load = true;
        }
        console.error(error.message);
      });
  }

  // Esta funcion crea el encabezado de la tabla
  buildColumNameList() {
    this.columNameList = [];
    this.columNameList.push('Acción');
    this.columNameList.push('Tipo');
    this.columNameList.push('Nombre');
    this.columNameList.push('Subestación');
    if (this.project.hasStages) {
      this.columNameList.push('Etapa');
    }
    this.columNameList.push('Versión');
  }

  // Esta funcion crea la lista de columnas por las cuales se puede filtrar
  buildColumSortList() {
    this.columNameSortList = [];
    this.columNameSortList.push('complete');
    this.columNameSortList.push('assetType');
    this.columNameSortList.push('assetName');
    this.columNameSortList.push('parentAssetName');
    if (this.project.hasStages) {
      this.columNameSortList.push('stageProjectId');
    }
    this.columNameSortList.push('version');
  }

  // Esta funcion crea el cuerpo de la tabla
  buildRowNameList() {
    this.rowNameList = [];
    this.rowNameList.push('complete');
    this.rowNameList.push('assetType');
    this.rowNameList.push('assetName');
    this.rowNameList.push('parentAssetName');
    if (this.project.hasStages) {
      this.rowNameList.push('etapasShowColumn');
    }
    this.rowNameList.push('version');
  }

  // Esta funcion crea los botones de la columna acción en la tabla
  buildButtonList() {
    if (this.hasRequirement) {
      this.buttonList = [
        {
          buttonName: 'Mostrar',
          className: 'xm-btn-mostrar',
          iconName: 'remove_red_eye'
        }
      ];
    } else {
      this.buttonList = [
        {
          buttonName: 'Editar',
          className: 'xm-btn-editar',
          iconName: 'open_in_new'
        }, {
          buttonName: 'Duplicar',
          className: 'xm-btn-duplicar',
          iconName: 'file_copy'
        },
        {
          buttonName: 'Eliminar',
          className: 'xm-btn-eliminar',
          iconName: 'delete_outline'
        }
      ];
    }
  }

  // Ayuda al mapeo de Etapas en la tabla resumen buscando el StageOrder
  stagesProject(id: number) {
    this.project.stages.forEach((elem) => {
      if (id === elem.id) {
        this.stageOrder = elem;
      }
    });

    if (this.stageOrder) {
      return this.stageOrder;
    } else {
      return id;
    }
  }

  // Esta función permite las múltiples llamadas a la bd y re-construye la tabla cuando sea necesario
  onEventChild(filterQuery: string) {
    this.setAssets(filterQuery);
  }

  // Esta funcion permite traer la información de un row al hacer doble click si es de tipo subestación abre la pestaña editar.
  editAssets(row: any, solicitudeType: string) {
    switch (row.recordType) {
      case 'Active':
        this.activosService.changeEditModalControl({
          assetId: row.assetId,
          assetType: row.assetType,
          assetControl: solicitudeType,
          isActive: true
        });
        break;
      default:
        this.activosService.changeEditModalControl({
          assetId: row.assetId,
          assetType: row.assetType,
          assetControl: solicitudeType,
          isActive: false
        });
        break;
    }
  }

  // Esta funcion controla la ejecución de los botones de la tabla
  eventClickInButtons(functionButton: any) {
    switch (functionButton.buttonElement.buttonName) {
      case 'Eliminar':
        this.deleteAssets(functionButton.row);
        break;
      case 'Editar':
        this.editAssets(functionButton.row, 'Editar');
        break;
      case 'Mostrar':
        // Funciona igual al mostrar pero se diferencia para manejar la variable IsActive
        this.editAssets(functionButton.row, 'MostrarParametroRequerimiento');
        break;
      default:
        this.messageService.openWarning('No puede utilizar esta función, para mas información consulte con el Adminstrador.');
    }
  }

  // Esta funcion elimina un Activo
  deleteAssets(row: any) {
    switch (row.recordType) {
      case 'Draft':
        this.messageService.openGeneralConfirm('¿Esta seguro de eliminar el activo ' + (row.assetType).toLowerCase() +
          ' con nombre: ' + row.assetName + '?')
          .then((value: SweetAlertResult) => {
            if (value.value) {
              if (row.assetType === 'Subestación') {
                this.activosService.deleteSubestationByIdBk(row.assetId).subscribe(deleteResponse => {
                  this.messageService.openSuccess({
                    title: '', text: 'Fué eliminada la Subestación:  exitosamente.'
                  });
                  this.activosService.newSubestacionControl({}, null); // emito la elimiación de una subestación
                }, (error: HttpErrorResponse) => {
                  this.messageService.openWarning('No se ha podido eliminar el activo');
                  console.log(error);
                });
              } else if (row.assetType === 'Barra') {
                this.activosService.deleteBusbarByIdBk(row.assetId).subscribe(deleteResponse => {
                  this.messageService.openSuccess({
                    title: '', text: 'Fué eliminada la Barra:  exitosamente.'
                  });
                  this.activosService.newSubestacionControl({}, null); // emito la elimiación de una barra
                }, (error: HttpErrorResponse) => {
                  this.messageService.openWarning('No se ha podido eliminar el activo');
                  console.log(error);
                });
              }
            }
          });
        break;
      default:
        this.messageService.openWarning('No es posible eliminar el activo porque ya fue enviado');
        break;
    }

  }

  // Metodos para el buscador independiente
  onsearchText(event: any) {
    event.preventDefault();
    this.onkeyUpSearch();
  }

  // Metodos para el buscador independiente
  onkeyUpSearch() {
    this.filterInfo.keyParameter = this.searchText;
    this.onEventChild(Util.filterAccion(this.filterInfo));
  }

  // Esta función permite reestructurar la forma en que el usuario ve los datos.
  private mapData(response: any): any[] {
    const dataList: IAssets[] = [];

    response.items.forEach(
      (mapElement: {
        complete: boolean; recordType: string; assetType: string; assetName: string;
        parentAssetName: string; stageProjectId: number; version: string; assetId: number
      }) => {
        const dataListElement: IAssets = {};

        dataListElement.complete = this.subTablePipe.transform(`${mapElement.complete}`);
        dataListElement.recordType = mapElement.recordType;
        dataListElement.assetType = this.subTablePipe.transform(mapElement.assetType);
        dataListElement.assetName = mapElement.assetName;
        dataListElement.parentAssetName = this.subTablePipe.transform(mapElement.parentAssetName);
        dataListElement.etapasShowColumn = ('Etapa ' + this.stagesProject(mapElement.stageProjectId).stageOrder);
        dataListElement.version = mapElement.version;
        dataListElement.assetId = mapElement.assetId;

        dataList.push(dataListElement);
      });

    return dataList;
  }
}
