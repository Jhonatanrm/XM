import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { TransmisionDTO } from '@core/entry-projects/model/ITransmisionDTO';
import { PromoterService } from '@shared/services/proyect-entry/promoter.service';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { IFilter } from '@shared/model/filter';

@Component({
  selector: 'app-layout-entry-operation',
  templateUrl: './layout-entry-operation.component.html',
  styleUrls: ['./layout-entry-operation.component.scss'],
  providers: [ProjectPipe]
})
export class LayoutEntryOperationComponent implements OnInit {

  idProject: number;
  idStage: number;
  hiddenLoader = true;
  transmisionDTO: TransmisionDTO = {};
  project: any = {};
  namePromoter: string;
  currentDate: Date;
  consecutiveYear: string;
  codeProject: string;

  //table variables
  stage: any = {};
  arrayList: any[] = [];
  columNameList: string[] = [];
  columNameSortList: string[] = [];
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
  filterQuery: string;
  assetTypeNameList = ['Subestación', 'sección de barra'];
  stateCodeList = [53];  // state operation
  arrayListNull: any[] = [];
  showEmptyTable = false;




  constructor(
    private readonly route: ActivatedRoute,
    private readonly transmisionService: TransmisionService,
    private readonly activosService: ActivosTransmisionService,
    private readonly promoterService: PromoterService,
    private readonly pipeproj: ProjectPipe
  ) {
    this.currentDate = new Date();
    this.buildColumNameList();
    this.buildColumSortList();
    this.buildRowNameList();

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const stage = this.route.snapshot.paramMap.get('stage');
    if (Boolean(id) && Boolean(stage)) {
      this.idProject = +id;
      this.idStage = +stage;
      this.loadServices();
    }
  }


  loadServices() {
    this.hiddenLoader = false;
    this.transmisionService.getProjectById(this.idProject)
      .subscribe((project: any) => {
        if (project != null && project) {
          this.transmisionDTO = project;
          this.project = project;
          this.consecutiveYear = this.currentDate.getFullYear() + '-' + project.projectId;
          this.codeProject = this.pipeproj.transform(project.projectId, 'PTRA', '5');
          this.searchPromoter(project.promoterId);
          if (this.project.stages != null && this.project.stages.length > 0) {
            this.searchStage();
            this.getAssets();
          }
        }
        this.hiddenLoader = true;
      }, (error: any) => {
        this.hiddenLoader = true;
        throw error;
      });
  }

  searchStage() {
    this.project.stages.forEach(element => {
      if (+element.id === +this.idStage) {
        this.stage = element;
      }
    });

    if ( !(this.stage.fpo != null && this.stage.fpo) ){
      this.showEmptyTable = true;
    }
  }

  searchPromoter(promoterId: number) {
    this.promoterService.getPromoters()
      .subscribe((listPromoter: any) => {
        if (listPromoter != null && listPromoter.items != null &&  listPromoter.items.length > 0) {
          listPromoter.items.forEach(element => {
            if (element.id === promoterId) {
              this.namePromoter = element.name;
            }
          });
        }
      }, (error: any) => {
        throw error;
      });

  }

  buildColumNameList() {
    this.columNameList = ['Tipo de activo',
      'Cantidad',
      'Elemento',
      'Fecha declaracion'];
  }

  buildColumSortList() {
    this.columNameSortList = ['assetType',
      'quantity',
      'assetName',
      'fpo'];
  }

  buildRowNameList() {
    this.rowNameList = ['assetType',
      'quantity',
      'assetName',
      'fpo'];
  }







  getAssets() {
    const filterQuery = '';
    this.activosService.getAssetsBk(filterQuery, [this.idStage], this.assetTypeNameList, null,
  //  this.activosService.getAssetsBk(filterQuery, null, this.assetTypeNameList, null,
      this.stateCodeList, null, null, true)
      .subscribe((resp: any) => {
        this.setArrayList(resp);
      }, (error: any) => {
        throw error;
      });
  }

  onEventChild(filterQuery: string) {
    this.filterQuery = filterQuery;
    this.getSearchAssetsByChild();
  }


  private setArrayList(resp: any) {
    this.arrayList = [];
    if (resp != null && resp.items && resp.items.length > 0) {
      resp.items.forEach(element => {
        this.arrayList.push({
          assetType: element.assetType,
          quantity: 1,
          assetName: element.assetName,
          fpo: this.stage.fpoDate
        });

      });
    }
  }


  getSearchAssetsByChild() {
    this.activosService.getAssetsBk(this.filterQuery, null, this.assetTypeNameList, null,
      //this.activosService.getAssetsBk(filterQuery, [this.idStage], assetTypeNameList, null,
      this.stateCodeList, null, null, true)
      .subscribe((resp: any) => {
        this.setArrayList(resp);
      }, (error: any) => {
        throw error;
      });
  }
}
