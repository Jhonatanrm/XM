import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { IgeneralTypes } from '@core/entry-projects/model/IgeneralTypes';
import { Observable, of } from 'rxjs';
import { IGeneralList, GeneralList } from '@core/entry-projects/model/IGeneralList';
import { catchError } from 'rxjs/operators';


type EntityResponseType = HttpResponse<IgeneralTypes>;
type EntityArrayResponseType = HttpResponse<IgeneralTypes[]>;


@Injectable({ providedIn: 'root' })
export class GeneralTypesService {

    baseAPI = `${environment.baseAPI}/generaltypes`;

    constructor(protected http: HttpClient) { }

    getTypeConexion() {
        return this.http.get(`${this.baseAPI}/TipoConexion`);
    }

    getTypeAdjudication() {
        return this.http.get(`${this.baseAPI}/TipoAdjudicacion`);
    }


    getGenerationResources() {
        return this.http.get(`${this.baseAPI}/RecursoGeneracion`);
    }


    getProductiveProcess() {
        return this.http.get(`${this.baseAPI}/ProcesoProductivo`);
    }

    // Para consultar cualquier general list con base en el ListName
    getGeneralList(ListName: string): Observable<GeneralList[]> {
        return this.http.get<GeneralList[]>(`${this.baseAPI}/${ListName}`).pipe(
            // tap(data => this.log('fetched configuraciones' + JSON.stringify(data))),
            catchError(this.handleError<GeneralList[]>(`getConfiguracionesBk id=`)));
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


    getTransportConectionSystem() {
        return this.http.get(`${this.baseAPI}/SistemaTransporteConexion`);
    }

    getTypeCicle() {
        return this.http.get(`${this.baseAPI}/CicloGeneracion`);
    }

    getTypeDespacho() {
        return this.http.get(`${this.baseAPI}/TipoDespacho`);
    }

    getProjectStates() {
        return this.http.get(`${this.baseAPI}/EstadoProyecto`);
    }


}
