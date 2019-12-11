
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { IProject } from '@core/entry-projects/model/IProject';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IPlanta } from '@core/entry-projects/model/IPlanta';

@Injectable({
  providedIn: 'root'
})
export class ActivosGeneracionService {

  baseAPI = `${environment.baseAPI}`;

  constructor(protected http: HttpClient) { }

  getProject(id: number): IProject {
    return {
      iProjectRIDd: 21,
      ProjectInstanceId: 21,
      ProjectName: 'EMPSolarPlant',
      ProjectDescription: 'Description Project',
      ProjectType: 1,
      PromoterRID: 23,
      RegisterDate:  { year: 1789, month: 7, day: 14 },
      ValidFrom:  { year: 1789, month: 7, day: 14 },
      ValidTo:  { year: 1789, month: 7, day: 14 },
      VersionComments: 'Version comment',
      UserName: 'EMP promotor',
      Stages: [{
        StageProjectRID: 2,
        ProjectRID: 23,
        StageProjectInstanceId: 21,
        StageOrder: 11,
        StageDescription: 'Stage One',
        FpoDate: new Date(),
        ValidFrom: { year: 1789, month: 7, day: 14 },
        ValidTo: { year: 1789, month: 7, day: 14 },
        VersionComments: 'First Stage',
        UserName: 'EMP promotor'
      },
      {
        StageProjectRID: 3,
        ProjectRID: 23,
        StageProjectInstanceId: 21,
        StageOrder: 11,
        StageDescription: 'Stage Two',
        FpoDate: new Date(),
        ValidFrom: { year: 1789, month: 7, day: 14 },
        ValidTo: { year: 1789, month: 7, day: 14 },
        VersionComments: 'Second Stage',
        UserName: 'EMP promotor'
      }
      ]
    };
  }

  getPlanta(id: number): IPlanta {
    return {
      id: 201,
      name: 'StugartGeneral Solar-H12',
      stage_id: 11,
      project_id: 21
    };
  }

  getProjectOb(id: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.baseAPI}/Project/${id}`).pipe(
      tap(data => this.log('fetched project' + JSON.stringify(data))),
      catchError(this.handleError<IProject>(`getProject id=${id}`)));
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
    console.log(`ProjectService: ${message}`);
  }
}

