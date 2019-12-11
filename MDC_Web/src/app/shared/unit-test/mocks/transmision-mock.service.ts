import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransmisionDTO } from '@core/entry-projects/model/ITransmisionDTO';

@Injectable()
export class TransmisionMockService {
  constructor() { }

  searchTransmisionProyect(filterQuery: string): Observable<any> {
      return of({"items":[{"projectRID":11,"projectInstanceId":11,"projectName":"Hituango 1","projectFpo":"2019-10-02T00:00:00","promoterRID":25,"promoterName":"QI ENERGY S.A.S. E.S.P.","subAreaID":16,"areaID":8,"areaName":"Area Suroccidental","conectionTypeID":1,"connectionType":"Generación","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":12,"projectInstanceId":12,"projectName":"Hituango 2","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":13,"projectInstanceId":13,"projectName":"Hituango 3","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":14,"projectInstanceId":14,"projectName":"Hituango 4","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":38,"projectInstanceId":15,"projectName":"cambie","projectFpo":"2019-10-02T00:00:00","promoterRID":16,"promoterName":"ENERGIA DEL RIO PIEDRAS S.A. E.S.P","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":16,"projectInstanceId":16,"projectName":"Hituango 6","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":17,"projectInstanceId":17,"projectName":"Hituango 7","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":18,"projectInstanceId":18,"projectName":"Hituango 8","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":19,"projectInstanceId":19,"projectName":"Hituango 9","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":20,"projectInstanceId":20,"projectName":"Hituango 10","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":10,"currentPage":1,"pageCount":2,"totalCount":18},"sortedBy":{"field":null,"order":null}}});
  }

  searchTransmisionStageProyect(filterQuery: string): Observable<any> {
      return of({
  "items": [
    {
      "projectRID": 11,
      "projectInstanceId": 11,
      "projectName": "Hituango 1",
      "projectFpo": "2019-09-27T00:00:00",
      "promoterRID": 25,
      "promoterName": "QI ENERGY S.A.S. E.S.P.",
      "subAreaID": 16,
      "areaID": 8,
      "areaName": "Suroccidental",
      "conectionTypeID": 1,
      "connectionType": "Generación",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 31,
      "stageOrder": 1,
      "stageDescription": "string"
    },
    {
      "projectRID": 11,
      "projectInstanceId": 11,
      "projectName": "Hituango 1",
      "projectFpo": "2019-09-28T00:00:00",
      "promoterRID": 25,
      "promoterName": "QI ENERGY S.A.S. E.S.P.",
      "subAreaID": 16,
      "areaID": 8,
      "areaName": "Suroccidental",
      "conectionTypeID": 1,
      "connectionType": "Generación",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 32,
      "stageOrder": 2,
      "stageDescription": "string"
    },
    {
      "projectRID": 11,
      "projectInstanceId": 11,
      "projectName": "Hituango 1",
      "projectFpo": "2019-09-29T00:00:00",
      "promoterRID": 25,
      "promoterName": "QI ENERGY S.A.S. E.S.P.",
      "subAreaID": 16,
      "areaID": 8,
      "areaName": "Suroccidental",
      "conectionTypeID": 1,
      "connectionType": "Generación",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 33,
      "stageOrder": 3,
      "stageDescription": "string"
    },
    {
      "projectRID": 11,
      "projectInstanceId": 11,
      "projectName": "Hituango 1",
      "projectFpo": "2019-09-30T00:00:00",
      "promoterRID": 25,
      "promoterName": "QI ENERGY S.A.S. E.S.P.",
      "subAreaID": 16,
      "areaID": 8,
      "areaName": "Suroccidental",
      "conectionTypeID": 1,
      "connectionType": "Generación",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 34,
      "stageOrder": 4,
      "stageDescription": "string"
    },
    {
      "projectRID": 12,
      "projectInstanceId": 12,
      "projectName": "Hituango 2",
      "projectFpo": "2019-10-02T00:00:00",
      "promoterRID": 28,
      "promoterName": "CH SAN MIGUEL S.A.S. E.S.P.",
      "subAreaID": 19,
      "areaID": 2,
      "areaName": "Nordeste",
      "conectionTypeID": 4,
      "connectionType": "STR",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 35,
      "stageOrder": 1,
      "stageDescription": "string"
    },
    {
      "projectRID": 12,
      "projectInstanceId": 12,
      "projectName": "Hituango 2",
      "projectFpo": "2019-10-02T00:00:00",
      "promoterRID": 28,
      "promoterName": "CH SAN MIGUEL S.A.S. E.S.P.",
      "subAreaID": 19,
      "areaID": 2,
      "areaName": "Nordeste",
      "conectionTypeID": 4,
      "connectionType": "STR",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 36,
      "stageOrder": 2,
      "stageDescription": "string"
    },
    {
      "projectRID": 12,
      "projectInstanceId": 12,
      "projectName": "Hituango 2",
      "projectFpo": "2019-10-02T00:00:00",
      "promoterRID": 28,
      "promoterName": "CH SAN MIGUEL S.A.S. E.S.P.",
      "subAreaID": 19,
      "areaID": 2,
      "areaName": "Nordeste",
      "conectionTypeID": 4,
      "connectionType": "STR",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 37,
      "stageOrder": 3,
      "stageDescription": "string"
    },
    {
      "projectRID": 12,
      "projectInstanceId": 12,
      "projectName": "Hituango 2",
      "projectFpo": "2019-10-02T00:00:00",
      "promoterRID": 28,
      "promoterName": "CH SAN MIGUEL S.A.S. E.S.P.",
      "subAreaID": 19,
      "areaID": 2,
      "areaName": "Nordeste",
      "conectionTypeID": 4,
      "connectionType": "STR",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 38,
      "stageOrder": 4,
      "stageDescription": "string"
    },
    {
      "projectRID": 13,
      "projectInstanceId": 13,
      "projectName": "Hituango 3",
      "projectFpo": "2019-10-02T00:00:00",
      "promoterRID": 28,
      "promoterName": "CH SAN MIGUEL S.A.S. E.S.P.",
      "subAreaID": 19,
      "areaID": 2,
      "areaName": "Nordeste",
      "conectionTypeID": 4,
      "connectionType": "STR",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 39,
      "stageOrder": 1,
      "stageDescription": "string"
    },
    {
      "projectRID": 13,
      "projectInstanceId": 13,
      "projectName": "Hituango 3",
      "projectFpo": "2019-10-02T00:00:00",
      "promoterRID": 28,
      "promoterName": "CH SAN MIGUEL S.A.S. E.S.P.",
      "subAreaID": 19,
      "areaID": 2,
      "areaName": "Nordeste",
      "conectionTypeID": 4,
      "connectionType": "STR",
      "adjudicationTypeID": 8,
      "adjudicationType": "Ampliación del STN",
      "announcementNumberUpme": "string",
      "announcedByUpme": true,
      "stagePerProjectRID": 40,
      "stageOrder": 2,
      "stageDescription": "string"
    }
  ],
  "metadata": {
    "pagination": {
      "offset": 0,
      "limit": 10,
      "previousOffset": -1,
      "nextOffset": 10,
      "currentPage": 1,
      "pageCount": 6,
      "totalCount": 55
    },
    "sortedBy": {
      "field": null,
      "order": null
    }
  }
});
  }

  registerTransmisionProyect(transmisionDTO: TransmisionDTO): Observable<any> {
    return of({"items":[{"projectRID":11,"projectInstanceId":11,"projectName":"Hituango 1","projectFpo":"2019-10-02T00:00:00","promoterRID":25,"promoterName":"QI ENERGY S.A.S. E.S.P.","subAreaID":16,"areaID":8,"areaName":"Area Suroccidental","conectionTypeID":1,"connectionType":"Generación","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":12,"projectInstanceId":12,"projectName":"Hituango 2","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":13,"projectInstanceId":13,"projectName":"Hituango 3","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":14,"projectInstanceId":14,"projectName":"Hituango 4","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":38,"projectInstanceId":15,"projectName":"cambie","projectFpo":"2019-10-02T00:00:00","promoterRID":16,"promoterName":"ENERGIA DEL RIO PIEDRAS S.A. E.S.P","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":16,"projectInstanceId":16,"projectName":"Hituango 6","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":17,"projectInstanceId":17,"projectName":"Hituango 7","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":18,"projectInstanceId":18,"projectName":"Hituango 8","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":19,"projectInstanceId":19,"projectName":"Hituango 9","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":20,"projectInstanceId":20,"projectName":"Hituango 10","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":10,"currentPage":1,"pageCount":2,"totalCount":18},"sortedBy":{"field":null,"order":null}}});
  }
  
  getProjectById(id: number): Observable<any> {
    return of({"items":[{"projectRID":11,"projectInstanceId":11,"projectName":"Hituango 1","projectFpo":"2019-10-02T00:00:00","promoterRID":25,"promoterName":"QI ENERGY S.A.S. E.S.P.","subAreaID":16,"areaID":8,"areaName":"Area Suroccidental","conectionTypeID":1,"connectionType":"Generación","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":12,"projectInstanceId":12,"projectName":"Hituango 2","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":13,"projectInstanceId":13,"projectName":"Hituango 3","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":14,"projectInstanceId":14,"projectName":"Hituango 4","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":38,"projectInstanceId":15,"projectName":"cambie","projectFpo":"2019-10-02T00:00:00","promoterRID":16,"promoterName":"ENERGIA DEL RIO PIEDRAS S.A. E.S.P","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":16,"projectInstanceId":16,"projectName":"Hituango 6","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":17,"projectInstanceId":17,"projectName":"Hituango 7","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":18,"projectInstanceId":18,"projectName":"Hituango 8","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":19,"projectInstanceId":19,"projectName":"Hituango 9","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":20,"projectInstanceId":20,"projectName":"Hituango 10","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":10,"currentPage":1,"pageCount":2,"totalCount":18},"sortedBy":{"field":null,"order":null}}});
  }  

  getSingleLineDiagramsByProyect(id: number): Observable<any> {
    return of([
      {
        "documentPerProjectRId": 105,
        "projectId": 133,
        "documentInstanceId": 105,
        "documentId": 1,
        "documentName": "CV_Camilo_Frontado (2).pdf",
        "urlDocument": "https://intergrupoig.sharepoint.com/sites/XM-MDC-EntradaProyectos/MDC_Documents/ProyectosTransmision/PTRA_100_PROY0212201904/COLOMBINAENERGIASASESP_02_12_2019_DiagramaUnifilar_9b5562afd3744d5fb7e635497b5caa04.pdf",
        "documentTypeId": 71,
        "documentTypeName": "Diagrama Unifilar",
        "userName": "xmmdcadmin",
        "validFrom": "2019-12-02T21:24:27.1633333",
        "validTo": "9999-12-31T00:00:00",
        "versionComments": null
      }
    ]);
  }  


      createUnifilarDiagram(id: number): Observable<any> {
        return of({"items":[{"projectRID":11,"projectInstanceId":11,"projectName":"Hituango 1","projectFpo":"2019-10-02T00:00:00","promoterRID":25,"promoterName":"QI ENERGY S.A.S. E.S.P.","subAreaID":16,"areaID":8,"areaName":"Area Suroccidental","conectionTypeID":1,"connectionType":"Generación","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":12,"projectInstanceId":12,"projectName":"Hituango 2","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":13,"projectInstanceId":13,"projectName":"Hituango 3","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":19,"areaID":2,"areaName":"Area Nordeste","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":8,"adjudicationType":"Ampliación del STN","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":14,"projectInstanceId":14,"projectName":"Hituango 4","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":38,"projectInstanceId":15,"projectName":"cambie","projectFpo":"2019-10-02T00:00:00","promoterRID":16,"promoterName":"ENERGIA DEL RIO PIEDRAS S.A. E.S.P","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":16,"projectInstanceId":16,"projectName":"Hituango 6","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":17,"projectInstanceId":17,"projectName":"Hituango 7","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":18,"projectInstanceId":18,"projectName":"Hituango 8","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":19,"projectInstanceId":19,"projectName":"Hituango 9","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null},{"projectRID":20,"projectInstanceId":20,"projectName":"Hituango 10","projectFpo":"2019-10-02T00:00:00","promoterRID":28,"promoterName":"CH SAN MIGUEL S.A.S. E.S.P.","subAreaID":2,"areaID":7,"areaName":"Area Caribe","conectionTypeID":4,"connectionType":"STR","adjudicationTypeID":9,"adjudicationType":"Expansión del Operador de Red","announcementNumberUpme":"string","announcedByUpme":true,"stagePerProjectRID":0,"stageOrder":0,"stageDescription":null}],"metadata":{"pagination":{"offset":0,"limit":10,"previousOffset":-1,"nextOffset":10,"currentPage":1,"pageCount":2,"totalCount":18},"sortedBy":{"field":null,"order":null}}});
      }  

}