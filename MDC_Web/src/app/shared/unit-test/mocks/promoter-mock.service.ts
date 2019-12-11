import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class PromoterMockService {
  constructor() { }

  searchTransmisionProyect(filterQuery: string): Observable<any> {
      return of([{"id":1,"name":"EMPRESA DE SERVICIOS PÚBLICOS DEL OCCIDENTE COLOMBIANO"},{"id":2,"name":"BEAM ENERGY S.A.S E.S.P."},{"id":3,"name":"PROFESIONALES EN ENERGIA S.A. E.S.P."},{"id":4,"name":"SOUL ENERGY SAS ESP"},{"id":5,"name":"DEPI ENERGY S.A.S. E.S.P."},{"id":6,"name":"ESPACIO PRODUCTIVO S.A.S. E.S.P."}]);
  }


  getPromoters(): Observable<any> {
    return of({
        "items": [
          {
            "id": 1,
            "name": "EMPRESA DE SERVICIOS PÚBLICOS DEL OCCIDENTE COLOMBIANO",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000001",
            "nit": "1000001",
            "isAgent": true
          },
          {
            "id": 2,
            "name": "BEAM ENERGY S.A.S E.S.P.",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000002",
            "nit": "1000002",
            "isAgent": true
          },
          {
            "id": 3,
            "name": "PROFESIONALES EN ENERGIA S.A. E.S.P.",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000003",
            "nit": "1000003",
            "isAgent": true
          },
          {
            "id": 4,
            "name": "SOUL ENERGY SAS ESP",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000004",
            "nit": "1000004",
            "isAgent": true
          },
          {
            "id": 5,
            "name": "DEPI ENERGY S.A.S. E.S.P.",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000005",
            "nit": "1000005",
            "isAgent": true
          },
          {
            "id": 6,
            "name": "ESPACIO PRODUCTIVO S.A.S. E.S.P.",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000006",
            "nit": "1000006",
            "isAgent": true
          },
          {
            "id": 7,
            "name": "ENERMAS SAS ESP",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000007",
            "nit": "1000007",
            "isAgent": true
          },
          {
            "id": 8,
            "name": "EMPRESA DE ENERGIA DE GUAPI S.A. E.S.P.",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000008",
            "nit": "1000008",
            "isAgent": true
          },
          {
            "id": 9,
            "name": "EMPRESA GENERADORA Y COMERCIALIZADORA DE ENERGIA ELECTRICA DE COLOMBIA S.A. E.S.P. - GENERADOR",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000009",
            "nit": "1000009",
            "isAgent": true
          },
          {
            "id": 10,
            "name": "CELSIA TOLIMA S.A. E.S.P.",
            "address": "Cll 1 # 01 - 01",
            "phone": "573000010",
            "nit": "1000010",
            "isAgent": true
          }
        ],
        "metadata": {
          "pagination": {
            "offset": 0,
            "limit": 10,
            "previousOffset": -1,
            "nextOffset": 10,
            "currentPage": 1,
            "pageCount": 5,
            "totalCount": 48
          },
          "sortedBy": {
            "field": null,
            "order": null
          }
        }
      });

      
}
getPromoterById(id: any): Observable<any> {
    return of({"id":1,"name":"EMPRESA DE SERVICIOS PÚBLICOS DEL OCCIDENTE COLOMBIANO"});
}
}