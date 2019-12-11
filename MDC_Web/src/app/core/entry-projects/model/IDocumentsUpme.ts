

export interface IDocumentsUpmeDTO {
  instanceDocument?: number;     // only to edit document
  documentId?: number;
  connectionConceptUpme?: string;
  fpoUpme?: Date;
  urlDocument?: string;
}

export class DocumentsUpmeDTO implements IDocumentsUpmeDTO {
  constructor() { }
}
