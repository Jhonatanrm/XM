import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MastereDataMockService {
  constructor() {
  }


  getSubAreaById(): Observable<any> {
    return of({"id":18,"code":"Are0129","name":"Arauca","area":{"id":2,"code":null,"name":null}});
  }

  getAllSubAreas() {
    return of([]);
  }
  
  getAllSubAreasByIdArea(id: number): Observable<any>{
    // tslint:disable-next-line: max-line-length
    return of([{"id":14,"code":"Are0029","name":"Norte de Santander","area":{"id":2,"code":null,"name":null}},{"id":18,"code":"Are0129","name":"Arauca","area":{"id":2,"code":null,"name":null}},{"id":19,"code":"Are0130","name":"Boyaca-Casanare","area":{"id":2,"code":null,"name":null}},{"id":20,"code":"Are0131","name":"Santander","area":{"id":2,"code":null,"name":null}}]);
  }
  
  getAllAreas(): Observable<any>{
    // tslint:disable-next-line: max-line-length
    return of([{"id":0,"code":"Are0000","name":"Indefinida"},{"id":1,"code":"Are0002","name":"Antioquia"},{"id":2,"code":"Are0012","name":"Nordeste"},{"id":3,"code":"Are0056","name":"Oriental"},{"id":4,"code":"Are0064","name":"Ecuador"},{"id":5,"code":"Are0065","name":"Venezuela"},{"id":6,"code":"Are0115","name":"No Definida"},{"id":7,"code":"Are0127","name":"Caribe"},{"id":8,"code":"Are0128","name":"Suroccidental"}]);
  }
  
  getAreasId(id: number){
    return of([]);
  }

  getLocationByGeographicLocationID(id: number){
    
  }



}
