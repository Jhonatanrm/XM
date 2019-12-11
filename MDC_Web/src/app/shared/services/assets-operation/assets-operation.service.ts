import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetsSearch } from '@core/entry-projects/model/IAssetsSearch';
import { ActivosTransmisionService } from '../proyect-entry/activos-transmision.service';
import { map } from 'rxjs/operators';
import { RequirementsService } from '../requirements/requirements.service';
import { AssetsStateEnum } from '@core/entry-projects/enums/assets-state.enum';

@Injectable({
    providedIn: 'root'
})
export class AssetsOperationService {

    baseAPI = `${environment.baseAPI}`;
    baseAPIGPDLLO = `${environment.baseAPICOMMONMODEL}`;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        protected http: HttpClient,
        private activosService: ActivosTransmisionService,
        private requirementsService: RequirementsService) {
    }

    // SERVICIOS
    // trae todos los activos en operación.
    public getAssetsOperationBk(
        filterQuery: string, stages: number[], assetTypeNameList: string[], subArea: any, stateCodeList: number[],
        agentCode: string, idParent: number, isActive: boolean): Observable<any> {

        return this.activosService.getAssetsBk(
            filterQuery,
            stages,
            assetTypeNameList,
            subArea,
            stateCodeList,
            agentCode,
            idParent,
            isActive);
    }

    public getRequirementGetByElement(elementId: number): Observable<any> {
        return this.requirementsService.getRequirementGetByElement(elementId);
    }

    // CONSULTAR Todas las subestacione sin observable
    public getSubestationsInOperationBk(key: string, agentCode: string): any {

        const assetFilterRequest = {
            assetTypeNames: ['Subestación'], // string[] con los tipos de assets para filtrar por tipos
            statesCodes: [AssetsStateEnum.OPERATION], // number[] con los codigos de los estados para filtrar por estado
            subareaId: null, // Codigo de subArea para filtrar assets por subareas
            stageProjectIds: null, // number[] con las etapas del proyecto para filtrar assets por proyecto
            operatingAgentCode: agentCode, // Codigo del agente para control de roles
            parentAssetId: null, // Codigo de la subestacion para filtrar por subestacion
            active: true
        };

        return this.http.post<AssetsSearch>(`${this.baseAPIGPDLLO}/Assets/Search`, assetFilterRequest,
            {
                params: {
                    keyParameter: key,
                    limit: '10',
                    pageNumber: '1',
                }
            }).pipe(
                map(res => {
                    const items = 'items';
                    return res[items];
                })
            );

    }

    public getReportExcelExport(prm: string): Observable<any> {
        // return this.http.get<any>(`${this.baseAPIGPDLLO}/Substations/ExcelExport/${id}`,
        // {
        //     params: {
        //         active: `${act}`
        //     }
        // });

        // CONSUMO DE SERVICIO VIA BLOD
        const headersHttp = new HttpHeaders();
        headersHttp.append('Content-Type', 'application/octet-stream');
        headersHttp.append('Accept', 'application/json');
        const options: any = {
            headers: headersHttp,
            observe: 'response',
            responseType: 'blob',
            params: {
                active: `hello`
            }
        };

        // const options: any = {};
        return this.http.get<any>(`${this.baseAPIGPDLLO}/Substations/ExcelExport`, options);
    }

}

