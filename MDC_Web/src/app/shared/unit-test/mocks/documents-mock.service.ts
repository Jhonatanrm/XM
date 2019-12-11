import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFileXM } from '@shared/model/file-xm.model';

@Injectable()
export class DocumentsMockService {
  constructor() {
  }


  uploadDocumentUpme() {
    return of([]);
  }

  uploadSinglelineDiagram(metadata: any, document: IFileXM) {
    return of({
      "Url": "https://intergrupoig.sharepoint.com/sites/XM-MDC-EntradaProyectos/MDC_Documents/ProyectosTransmision/PTRA_101_DARAPROYECT/NITROENERGYCOLOMBIAS.A.S.E.S.P._02_12_2019_DiagramaUnifilar_3a2b3737127d4bb7aa7275ddc1a02f76.pdf"
    });
  }

}
