import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProjectRequirementMockService {
  constructor() { }

  getRequirementOfProyect(filterQuery: string): Observable<any> {
    return of({"items":[{"projectRequirementRId":1,"requirementId":1,"projectId":1,"requirementName":"Formulario","daysBeforeFpo":180,"requirementStatusId":54,"requirementStatusName":"Pendiente","categoryRequirementId":62,"categoryRequirementName":"Formulario de Proyecto","deadline":"2019-06-03T00:00:00","remainingDays":-169,"receivedDate":"2019-11-18T16:47:18.2733333"},{"projectRequirementRId":2,"requirementId":2,"projectId":1,"requirementName":"Activos y Parámetros","daysBeforeFpo":180,"requirementStatusId":54,"requirementStatusName":"Pendiente","categoryRequirementId":63,"categoryRequirementName":"Formulario de Activos","deadline":"2019-06-03T00:00:00","remainingDays":-169,"receivedDate":"2019-11-18T16:47:18.2733333"},{"projectRequirementRId":3,"requirementId":3,"projectId":1,"requirementName":"Diagrama Unifilar","daysBeforeFpo":180,"requirementStatusId":54,"requirementStatusName":"Pendiente","categoryRequirementId":65,"categoryRequirementName":"Formulario sin Formato","deadline":"2019-06-03T00:00:00","remainingDays":-169,"receivedDate":"2019-11-18T16:47:18.2733333"}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":-1,"currentPage":1,"pageCount":1,"totalCount":3},"sortedBy":{"field":null,"order":null}}});
  }

  registerStateRequirement (obj: any): Observable<any> {
    return of({"items":[{"projectRequirementRId":1,"requirementId":1,"projectId":1,"requirementName":"Formulario","daysBeforeFpo":180,"requirementStatusId":54,"requirementStatusName":"Pendiente","categoryRequirementId":62,"categoryRequirementName":"Formulario de Proyecto","deadline":"2019-06-03T00:00:00","remainingDays":-169,"receivedDate":"2019-11-18T16:47:18.2733333"},{"projectRequirementRId":2,"requirementId":2,"projectId":1,"requirementName":"Activos y Parámetros","daysBeforeFpo":180,"requirementStatusId":54,"requirementStatusName":"Pendiente","categoryRequirementId":63,"categoryRequirementName":"Formulario de Activos","deadline":"2019-06-03T00:00:00","remainingDays":-169,"receivedDate":"2019-11-18T16:47:18.2733333"},{"projectRequirementRId":3,"requirementId":3,"projectId":1,"requirementName":"Diagrama Unifilar","daysBeforeFpo":180,"requirementStatusId":54,"requirementStatusName":"Pendiente","categoryRequirementId":65,"categoryRequirementName":"Formulario sin Formato","deadline":"2019-06-03T00:00:00","remainingDays":-169,"receivedDate":"2019-11-18T16:47:18.2733333"}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":-1,"currentPage":1,"pageCount":1,"totalCount":3},"sortedBy":{"field":null,"order":null}}});
  }

}