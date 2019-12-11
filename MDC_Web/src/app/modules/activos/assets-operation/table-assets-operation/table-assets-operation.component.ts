import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IAssetsSearch } from '@core/entry-projects/model/IAssetsSearch';
import { IFilter } from '@shared/model/filter';
import { Button } from '@core/entry-projects/model/IButton';
import { SubstationTablePipe } from '@shared/pipes/subestation-table-pipe/subTable-pipe.pipe';
import { Util } from '@shared/util';
import { AssetsOperationService } from '@shared/services/assets-operation/assets-operation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '@shared/services/message.service';
import { IAssets } from '@core/entry-projects/model/IAssets';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { AssetsStateEnum } from '@core/entry-projects/enums/assets-state.enum';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';

@Component({
  selector: 'app-table-assets-operation',
  templateUrl: './table-assets-operation.component.html',
  providers: [SubstationTablePipe]
})
export class TableAssetsOperationComponent implements OnInit, OnChanges {

  @Input() selectedType: any;
  @Input() selectedSubstation: any;
  @Input() controlValue: any;
  @Output() flagButtonControl = new EventEmitter();
  assetsSearch: IAssetsSearch = {}; // Este atributo será el que reciba el servicio y separe los Items y la MetaData.
  columNameList: string[] = []; // Este atributo almacenará el encabezado de la tabla
  columNameSortList: string[] = []; // Este atributo almacenará las columnas por las cuales puede ordenar
  rowNameList: string[] = []; // Este atributo almacenará los elementos del cuerpo de la tabla.
  buttonList: Button[] = []; // Este atributo almacenara los botones de la columna acción de la tabla.
  filterInfo: IFilter = {}; // Este atributo almacenará y controlará las MetaData
  searchText: string; // Filtro cuando la tabla no esta

  constructor(
    private assetsOperationService: AssetsOperationService,
    private subTablePipe: SubstationTablePipe,
    private messageService: MessageService,
    private activosService: ActivosTransmisionService) {
    this.filterInfo.limit = 10; // Numero de elementos (rows) por pagina
    this.filterInfo.keyParameter = null;
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
  }

  ngOnInit() {
    this.buildColumNameList();
    this.buildColumSortList();
    this.buildRowNameList();
    this.buildButtonList();
  }

  ngOnChanges() {
    if (this.selectedType === 'Barra') {
      this.selectedType = AssetTypeEnum.BUSBAR;
    }
    if (this.controlValue) {
      if ((this.selectedType) || this.selectedSubstation || this.filterInfo.keyParameter) {
        this.setAssets(Util.filterAccion(this.filterInfo), this.selectedType); // Se aplica filtro antes de llamar a la función getAssets
      } else {
        this.assetsSearch.items = [];
      }
      this.buildColumNameList();
      this.buildColumSortList();
      this.buildRowNameList();
      this.buildButtonList();
    }
  }

  setAssets(filterQuery: string, assetType: string) {
    let assetTypeNameList: any;
    let idParent: any;
    if (this.selectedSubstation) {
      idParent = this.selectedSubstation.assetId;
    } else {
      idParent = null;
    }
    if (assetType) {
      assetTypeNameList = [assetType];
    } else {
      assetTypeNameList = [AssetTypeEnum.SUBSTATION , AssetTypeEnum.BUSBAR];
    }
    const subAreaId = null;
    const projectStages = null;
    const stateCodeList = [AssetsStateEnum.OPERATION];
    const agentCode = null;
    const isActive = true;

    this.assetsOperationService.getAssetsOperationBk(
      filterQuery, projectStages, assetTypeNameList, subAreaId, stateCodeList,
      agentCode, idParent, isActive)
      .subscribe((resp: any) => {
        this.assetsSearch.metadata = resp.metadata;
        this.assetsSearch.items = resp.items;
        this.assetsSearch.items = this.mapData(resp);
      }, (error: HttpErrorResponse) => {
        // Se le da manejo al error 404 cuando no hay elementos en la BD
        if (error.status === 404) {
          this.assetsSearch.items = [];
        }
        console.error(error.message);
      });
  }

  // Esta funcion crea el encabezado de la tabla
  buildColumNameList() {
    this.columNameList = [];
    if (this.selectedType !== 'Subestación') {
      this.columNameList.push('Subestación');
    }
    this.columNameList.push('Tipo');
    this.columNameList.push('Nombre');
    this.columNameList.push('Operador');
  }

  // Esta funcion crea la lista de columnas por las cuales se puede filtrar
  buildColumSortList() {
    this.columNameSortList = [];
    if (this.selectedType !== 'Subestación') {
      this.columNameSortList.push('parentAssetName');
    }
    this.columNameSortList.push('assetType');
    this.columNameSortList.push('assetName');
    this.columNameSortList.push('operatingAgentName');
  }

  // Esta funcion crea el cuerpo de la tabla
  buildRowNameList() {
    this.rowNameList = [];
    if (this.selectedType !== 'Subestación') {
      this.rowNameList.push('parentAssetName');
    }
    this.rowNameList.push('assetType');
    this.rowNameList.push('assetName');
    this.rowNameList.push('operatingAgentName');
  }

  // Esta funcion crea los botones de la columna acción en la tabla
  buildButtonList() {
    this.buttonList = [
      {
        buttonName: 'Mostrar',
        className: 'xm-btn-mostrar',
        iconName: 'remove_red_eye'
      }, {
        buttonName: 'Solicitud',
        className: 'xm-btn-editar',
        iconName: 'edit'
      }
    ];
  }

  // Esta función permite las múltiples llamadas a la bd y re-construye la tabla cuando sea necesario
  onEventChild(filterQuery: string) {
    if ((this.selectedType) || this.selectedSubstation || this.filterInfo.keyParameter) {
      this.setAssets(filterQuery, this.selectedType);
      this.filterInfo = { limit: 10 };
    } else {
      this.assetsSearch.items = [];
      this.filterInfo = { limit: 10 };
    }
  }

  // Esta funcion controla la ejecución de los botones de la tabla
  eventClickInButtons(functionButton: any) {

    // Solo para solicitud
    if (functionButton.buttonElement.buttonName === 'Solicitud') {
      // 1 Validamos que no hallan que el activo no tenga requerimientos
      this.assetsOperationService.getRequirementGetByElement(functionButton.row.elementId).subscribe(
        req => {
          if (req.stateId !== 59) {
            this.showEditModal(functionButton);
          } else {
            this.messageService.openWarning('Actualmente se encuentra una solicitud pendiente de revisar');
          }
        }, (error: HttpErrorResponse) => {
          // Se le da manejo al error 404 cuando no hay elementos en la BD
          if (error.status === 404) {
            this.showEditModal(functionButton);
          } else {
            console.error(error.message);
          }
        }
      );
    } else {
      this.showEditModal(functionButton);
    }

  }

  showEditModal(functionButton: any): void {
    functionButton.row.action = functionButton.buttonElement.buttonName;
    switch (functionButton.buttonElement.buttonName) {
      case 'Mostrar':
        this.emitControlModal({ view: false, row: functionButton });
        this.showItembutton(functionButton.row);
        break;
      case 'Solicitud':
        // emmiter para cambio flagButton
        this.emitControlModal({ view: true, row: functionButton });
        this.showItembutton(functionButton.row);
        break;
      default:
        this.messageService.openWarning('No puede utilizar esta función, para mas información consulte con el Adminstrador.');
    }
  }

  // Funcionalidades del boton mostrar
  // Lanza el observable al Modal
  showItembutton(row: any) {
    switch (row.assetType) {
      case 'Subestación':
        this.activosService.changeEditModalControl({
          assetId: row.assetId,
          assetType: row.assetType,
          assetControl: row.action,
          isActive: true
        });
        break;
      case 'Barra':
        this.activosService.changeEditModalControl({
          assetId: row.assetId,
          assetType: row.assetType,
          assetControl: row.action,
          isActive: true
        });
        break;
      default:
        this.messageService.openWarning(`
          No puede utilizar esta función,
          para mas información consulte con el Adminstrador.
          `);
    }
  }

  // Esta función permite reestructurar la forma en que el usuario ve los datos.
  private mapData(response: any): any[] {
    const dataList: IAssets[] = [];

    response.items.forEach(
      (mapElement: {
        parentAssetName: string; assetType: string; assetName: string;
        operatingAgentName: string; assetId: number; elementId: number;
      }) => {
        const dataListElement: IAssets = {};

        dataListElement.parentAssetName = this.subTablePipe.transform(mapElement.parentAssetName);
        dataListElement.assetType = this.subTablePipe.transform(mapElement.assetType);
        dataListElement.assetName = mapElement.assetName;
        dataListElement.operatingAgentName = this.subTablePipe.transform(mapElement.operatingAgentName);
        dataListElement.assetId = mapElement.assetId;
        dataListElement.elementId = mapElement.elementId;

        dataList.push(dataListElement);
      });

    return dataList;
  }

  // Emite si el modal es en modo view o edit (true = view)
  private emitControlModal(evt: any) {
    this.flagButtonControl.emit(evt);
  }
}
