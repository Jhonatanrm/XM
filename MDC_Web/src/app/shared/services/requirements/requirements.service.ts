import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { GeneralTypesService } from '../proyect-entry/generaltypes.service';
import { GeneralList } from '@core/entry-projects/model/IGeneralList';
import { IRequirements } from '@core/entry-projects/model/IRequirements';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RequirementsService {

  baseAPI = `${environment.baseAPI}`;
  baseAPIGPDLLO = `${environment.baseAPICOMMONMODEL}`;
  baseAPIMASTER = `${environment.baseAPIMASTER}`;
  baseREQUIREMENTES = `${environment.baseRequirements}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    protected http: HttpClient,
    private generalTypesService: GeneralTypesService) { }

  getRequirementsStatus(): Observable<GeneralList[]> {
    return this.generalTypesService.getGeneralList('EstadoRequerimiento');
  }

  getRequirements(filterQuery: string, attr?: any[]): Observable<IRequirements> {
    const attrBody = { attrbody: attr };

    return this.http.get<IRequirements>(`${this.baseREQUIREMENTES}/Request/Search` + filterQuery).pipe(
      map(res => {
        for (const key in res.items) {
          if (res.items.hasOwnProperty(key)) {
            res.items[key].fechaEnvio = res.items[key].fechaEnvio.slice(0, res.items[key].fechaEnvio.indexOf('T'));
            res.items[key].fechaPendiente = res.items[key].fechaPendiente.slice(0, res.items[key].fechaPendiente.indexOf('T'));
          }
        }
        return res;
      })
    );
  }

  getRequirementGetByElement(elementId: number): Observable<any> {
    return this.http.get<any>(`${this.baseREQUIREMENTES}/Request/GetByElement`, { params: { id: `${elementId}` } });
  }

  getRequirementsByIdProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseREQUIREMENTES}/Request/GetByProject`, { params: { id: `${projectId}` } });
  }

  getAssetChangeParameter(elementinstanceid: number, elementType: string): Observable<any> {
    return this.http.get<any>(`${this.baseAPIGPDLLO}/Assets/GetChanges?elementinstanceid=${elementinstanceid}&elementType=${elementType}`);
  }

  updatePendindDate(requirementID: number, pendingDate: string, justification: string): Observable<any> {

    const queryPendingDate = `?id=${requirementID}&newPendingDate=${pendingDate}&comment=${justification}`;

    return this.http.post<any>(`${this.baseREQUIREMENTES}/Request/UpdatePendindDate${queryPendingDate}`,{});
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

}
