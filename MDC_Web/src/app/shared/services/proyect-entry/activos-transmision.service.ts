import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ISubestacion, Subestacion } from '@core/entry-projects/model/ISubestation';
import { IDivisionPolitica } from '@core/entry-projects/model/IDivisionPolitica';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { AssetsSearch } from '@core/entry-projects/model/IAssetsSearch';
import { IAssetRequestParameter } from '@core/entry-projects/model/IAssetRequestParameter';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ActivosTransmisionService {

  baseAPI = `${environment.baseAPI}`;
  baseAPIGPDLLO = `${environment.baseAPICOMMONMODEL}`;
  baseAPIMASTER = `${environment.baseAPIMASTER}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Control ante el cambio del boton crear de subestacion
  buttonControlSubestacion: any;
  observableButtonControlSubestacion: any;

  // Control ante una nueva suvestación, para tablero
  newControlSubestacion: any;
  observableNewControlSubestacion: any;

  // control para las acciones editar activos
  editControModal: any;
  observableEditControModal: any;

  constructor(protected http: HttpClient) {
    this.observableButtonControlSubestacion = new BehaviorSubject(this.buttonControlSubestacion);
    this.observableNewControlSubestacion = new BehaviorSubject(this.newControlSubestacion);
    this.observableEditControModal = new BehaviorSubject(this.editControModal);
  }

  // SERVICIOS
  // trae el proyecto
  public getProjectBK(id: number):
    Observable<ITransmisionProject> {
    return this.http.get<ITransmisionProject>(`${this.baseAPI}/projects/TransmissionProjects/${id}`);
  }

  public getSubstationConfigurationKeyBK(key: number, act: boolean): Observable<ISubestacion> {
    return this.http.get<ISubestacion>(
      `${this.baseAPIGPDLLO}/Substations/GetByConfiguration`,
      {
        params: {
          idConfiguration: `${key}`,
          active: `${act}`
        }
      }).pipe(
        catchError(this.handleError<ISubestacion>(`getSubstationByIdConfiguration`))
      );
  }

  // CONSULTAR Todas las subestacione
  public getSubestationKeyBK(key: string): Observable<ISubestacion[]> {
    return this.http.get<ISubestacion[]>(
      `${this.baseAPIGPDLLO}/Substations/Search`,
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

  // CONSULTAR Todas las subestacione sin observable
  public getSubestationKeyNoObBK(key: string): any {
    return this.http.get(
      `${this.baseAPIGPDLLO}/Substations/Search`,
      {
        params: {
          keyParameter: key,
          limit: '10',
          pageNumber: '1',
        }
      }).pipe(
        // el map es para hacer transfoemaciones antes de enviar
        map(res => {
          const items = 'items';
          return res[items];
        })
      );
  }

  getSubestationBK(id: number, act: boolean): Observable<Subestacion> {
    return this.http.get<Subestacion>(`${this.baseAPIGPDLLO}/Substations/${id}`,
      {
        params: {
          active: `${act}`
        }
      }
    );
  }

  // AGREGAR
  addSubestacionBK(subestacion: Subestacion):
    Observable<Subestacion> {
    return this.http.post<Subestacion>(`${this.baseAPIGPDLLO}/Substations`, subestacion, this.httpOptions)
    /*
    .pipe(
      tap((subestacion: Subestacion) => this.log(`added subestacion id=`)),
      catchError(this.handleError<Subestacion>('addSubestacion'))
    )*/;
  }

  public getAssetsBk(
    filterQuery: string, stages: number[], assetTypeNameList: string[], subArea: any,
    stateCodeList: number[], agentCode: string, idParent: number, isActive: boolean): Observable<AssetsSearch> {
    const assetFilterRequest = {
      assetTypeNames: assetTypeNameList, // string[] con los tipos de assets para filtrar por tipos
      statesCodes: stateCodeList, // number[] con los codigos de los estados para filtrar por estado
      subareaId: subArea, // Codigo de subArea para filtrar assets por subareas
      stageProjectIds: stages, // number[] con las etapas del proyecto para filtrar assets por proyecto
      operatingAgentCode: agentCode, // Codigo del agente para control de roles
      parentAssetId: idParent, // Codigo de la subestacion para filtrar por subestacion
      active: isActive, // Filtra la busqueda por tipo de activo (Si es Borrador o Activo)
    };
    // console.log(`${this.baseAPIGPDLLO}/Assets/Search` + filterQuery);
    // console.log(assetFilterRequest);
    return this.http.post<AssetsSearch>(`${this.baseAPIGPDLLO}/Assets/Search` + filterQuery, assetFilterRequest);
  }

  public getAssetsCountBk(
    stages: number[], assetTypeNameList: string[], subArea: any,
    stateCodeList: number[], agentCode: string, idParent: number): Observable<number> {
    const assetFilterRequest = {
      assetTypeNames: assetTypeNameList, // string[] con los tipos de assets para filtrar por tipos
      statesCodes: stateCodeList, // number[] con los codigos de los estados para filtrar por estado
      subareaId: subArea, // Codigo de subArea para filtrar assets por subareas
      stageProjectIds: stages, // number[] con las etapas del proyecto para filtrar assets por proyecto
      operatingAgentCode: agentCode, // Codigo del agente para control de roles
      parentAssetId: idParent // Codigo de la subestacion para filtrar por subestacion
    };

    return this.http.post<number>(`${this.baseAPIGPDLLO}/Assets/TotalCount`, assetFilterRequest);
  }

  public deleteSubestationByIdBk(id: number): Observable<any> {
    return this.http.delete(`${this.baseAPIGPDLLO}/Substations/${id}`);
  }

  public deleteBusbarByIdBk(id: number): Observable<any> {
    return this.http.delete(`${this.baseAPIGPDLLO}/Busbars/${id}`);
  }

  public getRequestSubbarbyElement(id: number): Observable<IAssetRequestParameter> {
    return this.http.get<IAssetRequestParameter>(`${this.baseAPIGPDLLO}/Assets/GetRequestSubBarByElement?id=${id}`).pipe(
      map(res => {
        if (res.elementType === AssetTypeEnum.BUSBAR) {
          res.elementType = 'Barra';
        }
        return res;
      })
    );
  }

  // division politica
  public getDepartamentosBk(): Observable<IDivisionPolitica[]> {
    return this.http.get<IDivisionPolitica[]>(`${this.baseAPIGPDLLO}/DivisionPolitica/Get`, { params: { limit: '2000' } }).pipe(
      // tap(data => this.log('fetched municipios' + JSON.stringify(data))),
      catchError(this.handleError<IDivisionPolitica[]>(`getDepartamentosBk`)));
  }
  public getMuniciposBk(id: string): Observable<IDivisionPolitica[]> {

    /* Forma elavorada de parametros
    let data = new HttpParams();
    data = data.append('codDepartamento', id);
    return this.http.get<IDivisionPolitica[]>(`${this.baseAPIGPDLLO}/DivisionPolitica/Get/`, { params: data }).pipe(
    */
    return this.http.get<IDivisionPolitica[]>(`${this.baseAPIGPDLLO}/DivisionPolitica/Get/`, { params: { codDepartamento: `${id}` } }).pipe(
      // tap(data => this.log('fetched municipios' + JSON.stringify(data))),
      catchError(this.handleError<IDivisionPolitica[]>(`getMunicipiosBk id=${id}`)));
  }

  // locations
  // trae todos los departamentos
  public getAllLocations(): Observable<IDivisionPolitica[]> {
    return this.http.get<IDivisionPolitica[]>(`${this.baseAPIMASTER}/Locations/Departments/SearchAll`).pipe(
      // tap(data => this.log('fetched municipios' + JSON.stringify(data))),
      catchError(this.handleError<IDivisionPolitica[]>(`getLocationsAll`)));
  }

  // trae un municipio si pasamos su id geographic Location
  public getMunicipalitiesByDeparmentCode(id: string): Observable<IDivisionPolitica[]> {
    return this.http.get<IDivisionPolitica[]>(
      `${this.baseAPIMASTER}/Locations/Municipalities/Search`,
      { params: { departmentCode: `${id}`, limit: '2000' } })
      .pipe(
        // tap(data => this.log('fetched municipios' + JSON.stringify(data))),
        catchError(this.handleError<IDivisionPolitica[]>(`getMunicipalities`)));
  }

  // ENVIAR

  sendProject(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseAPIGPDLLO}/Assets/SendProject?projectInstanceId=${id}`);
    // return this.http.get<string>(`${this.baseAPIGPDLLO}/Assets/SendProject`, {params: {projectInstanceId: `${id}`}});
    // return this.http.post<any>(`${this.baseAPIGPDLLO}/Assets/SendProject?projectInstanceId=${id}`, null{, observe: 'response'});
  }

  approveSendProjectById(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseAPIGPDLLO}/Assets/ApproveSendProject?projectInstanceId=${projectId}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // tslint:disable-next-line: indent
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`ActivosTransmisionService: ${message}`);
  }

  // OBSERVABLES
  // Comportamiento ante cambio de boton en crear Subestación, Barra, ...
  eventChange() {
    this.observableButtonControlSubestacion.next(this.buttonControlSubestacion);
  }
  changeButtonControl(evt: any, buttonControl) {
    this.buttonControlSubestacion = buttonControl;
    this.eventChange();
  }

  // Behavior on new Subestation
  eventNew() {
    this.observableNewControlSubestacion.next(this.newControlSubestacion);
  }
  newSubestacionControl(evt: any, newSubestationControl: any) {
    this.newControlSubestacion = newSubestationControl;
    this.eventNew();
  }

  // Behavior on edit asset
  cahngeEditModal() {
    this.observableEditControModal.next(this.editControModal);
  }
  changeEditModalControl(evt: any) {
    this.editControModal = evt;
    this.cahngeEditModal();
  }
}
