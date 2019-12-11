import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MastereDataService {

    baseAPIMASTER = `${environment.baseAPIMASTER}`;

    constructor(protected http: HttpClient) { }

    // Para consultar cualquier general list con base en el ListName
    getSubAreaById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Subareas/${id}`).pipe(
            // tap(data => this.log('fetched sub-areas' + JSON.stringify(data))),
            catchError(this.handleError<any>(`get Subarea id=`)));
    }

    getAllSubAreas(): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Areas/SearchAll/`).pipe(
            // tap(data => this.log('fetched areas' + JSON.stringify(data))),
            catchError(this.handleError<any>(`get all areas`)));
    }

    getAllSubAreasByIdArea(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Subareas/SearchAll/`, { params: { areaId: `${id}` } }).pipe(
            // tap(data => this.log('fetched areas' + JSON.stringify(data))),
            catchError(this.handleError<any>(`get all subarea by id area`)));
    }

    getAllAreas(): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Areas/SearchAll/`).pipe(
            // tap(data => this.log('fetched areas' + JSON.stringify(data))),
            catchError(this.handleError<any>(`get all areas`)));
    }

    getAreasId(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Areas/${id}`).pipe(
            // tap(data => this.log('fetched areas' + JSON.stringify(data))),
            catchError(this.handleError<any>(`get area by Id`)));
    }

    getLocationByGeographicLocationID(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Locations/${id}`).pipe(
            // tap(data => this.log('fetched areas' + JSON.stringify(data))),
            catchError(this.handleError<any>(`get location by geographicalocation Id`)));
    }

    getAgentsByKey(key: string, type: string) {

        let params: any;
        params = {
            keyParameter: key,
            limit: '10',
            numberPage: '1',
        };

        return this.http.get(`${this.baseAPIMASTER}/Agentes/Search`, {
            params
        }).pipe(
            // el map es para hacer transfoemaciones antes de enviar
            map((res: { items: any[], metetadata: {} }) => {
                res.items.forEach(el => el.typeAgent = type);
                return res.items;
            })
        );

    }

    getAgentById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseAPIMASTER}/Agentes/` + id);
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
