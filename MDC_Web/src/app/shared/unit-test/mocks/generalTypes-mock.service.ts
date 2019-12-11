import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class GeneralTypesMockService {
  constructor() {
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

  getTypeAdjudication(): Observable<any> {
    return of([{'typeMRID': 6, 'codeValue': '-1', 'detailValue': 'Indefinido'}, {
      'typeMRID': 7,
      'codeValue': '1',
      'detailValue': 'Convocatoria UPME'
    }, {'typeMRID': 8, 'codeValue': '2', 'detailValue': 'Ampliación del STN'}, {
      'typeMRID': 9,
      'codeValue': '3',
      'detailValue': 'Expansión del Operador de Red'
    }]);
  }

  getTypeConexion(): Observable<any> {
    return of([{'typeMRID': 3, 'codeValue': '1', 'detailValue': 'STN'}, {
      'typeMRID': 4,
      'codeValue': '2',
      'detailValue': 'STR'
    }, {'typeMRID': 5, 'codeValue': '3', 'detailValue': 'Conexión de Carga'}]);
  }

  getGenerationResources() {
    // tslint:disable-next-line: max-line-length
    return of([{"typeMRID":10,"codeValue":"1","detailValue":"Hidráulico"},{"typeMRID":11,"codeValue":"2","detailValue":"Térmico"},{"typeMRID":12,"codeValue":"3","detailValue":"Eólico"},{"typeMRID":13,"codeValue":"4","detailValue":"Solar"}]);
  }
  
  getProductiveProcess() {
    return of([{"typeMRID":15,"codeValue":"1","detailValue":"Generación"},{"typeMRID":16,"codeValue":"2","detailValue":"Cogeneración"},{"typeMRID":17,"codeValue":"3","detailValue":"Autogeneración"}]);
  }
  
  getTransportConectionSystem(){
    // tslint:disable-next-line: max-line-length
    return of([{"typeMRID":30,"codeValue":"1","detailValue":"STN"},{"typeMRID":31,"codeValue":"2","detailValue":"STR"},{"typeMRID":32,"codeValue":"3","detailValue":"SDL"}]);
  }

  getTypeCicle(){
    // tslint:disable-next-line: max-line-length
    return of([{"typeMRID":26,"codeValue":"1","detailValue":"Simple o Brayton"},{"typeMRID":27,"codeValue":"2","detailValue":"Combinado"},{"typeMRID":28,"codeValue":"3","detailValue":"STIG"},{"typeMRID":29,"codeValue":"4","detailValue":"Rankine o vapor y otros"}]);
  }
  
  getTypeDespacho(){
    // tslint:disable-next-line: max-line-length
    return of([{"typeMRID":33,"codeValue":"1","detailValue":"Despachada centralmente"},{"typeMRID":34,"codeValue":"2","detailValue":"No despachada centralmente"}]);
  }

}
