import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssetsSearch } from '@core/entry-projects/model/IAssetsSearch';

@Injectable()
export class ActivosTransmisionMockService {
  constructor() {
  }


  public getAssetsBk(
    filterQuery: string, stages: number[], assetTypeNameList: string[], subArea: any,
    stateCodeList: number[], agentCode: string, idParent: number): Observable<AssetsSearch> {
    return of({"items":[{"assetId":33,"assetName":"NUEVA UNA ETAPA - 1 - 66 kV","assetCode":"BB61896782","assetType":"Barra","assetState":4,"parentAssetId":217,"parentAssetName":"NUEVA UNA ETAPA","parentAssetCode":"SB95294369","stageProjectId":2,"elementId":190,"subareaId":null,"latitude":0.0,"longitude":0.0,"operatingAgentCode":null,"operatingAgentName":null,"recordType":"Draft","complete":false,"version":""},{"assetId":30,"assetName":"Test etapas etapa 3 - 4 - 34.5 kV","assetCode":"BB80182721","assetType":"Barra","assetState":4,"parentAssetId":249,"parentAssetName":"Test etapas etapa 3","parentAssetCode":"Test etapas etapa 3","stageProjectId":2,"elementId":185,"subareaId":null,"latitude":12.0,"longitude":0.0,"operatingAgentCode":null,"operatingAgentName":null,"recordType":"Draft","complete":false,"version":""},{"assetId":29,"assetName":"Barra Backend7 DOS SECCIONES","assetCode":"BB92459779","assetType":"Barra","assetState":4,"parentAssetId":257,"parentAssetName":"Sub sisas2","parentAssetCode":"Sub sisas2","stageProjectId":1,"elementId":183,"subareaId":null,"latitude":10.0,"longitude":0.0,"operatingAgentCode":null,"operatingAgentName":null,"recordType":"Draft","complete":false,"version":""},{"assetId":20,"assetName":"NUEVA UNA ETAPA - 2 - 57.5 kV","assetCode":"NUEVA UNA ETAPA - 2 - 57.","assetType":"Barra","assetState":4,"parentAssetId":217,"parentAssetName":"NUEVA UNA ETAPA","parentAssetCode":"SB95294369","stageProjectId":2,"elementId":172,"subareaId":null,"latitude":0.0,"longitude":0.0,"operatingAgentCode":null,"operatingAgentName":null,"recordType":"Draft","complete":false,"version":""},{"assetId":22,"assetName":"Test etapas etapa 3 - 2 - 34.5 kV","assetCode":"Test etapas etapa 3 - 2 -","assetType":"Barra","assetState":4,"parentAssetId":249,"parentAssetName":"Test etapas etapa 3","parentAssetCode":"Test etapas etapa 3","stageProjectId":2,"elementId":174,"subareaId":null,"latitude":12.0,"longitude":0.0,"operatingAgentCode":null,"operatingAgentName":null,"recordType":"Draft","complete":false,"version":""}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":-1,"currentPage":1,"pageCount":1,"totalCount":5},"sortedBy":{"field":null,"order":null}}});
  }

}
