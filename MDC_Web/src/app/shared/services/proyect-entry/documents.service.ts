import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { IFileXM } from '@shared/model/file-xm.model';

type EntityResponseType = HttpResponse<DocumentsService>;
type EntityArrayResponseType = HttpResponse<DocumentsService>;

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  baseAPI = `${environment.baseAPIDocumentManagement}`;

  constructor(protected http: HttpClient) { }

  uploadDocumentUpme(metadata: any, document: IFileXM) {

    const formData = new FormData();
    formData.append('file', document.file);
    this.mapProjectMetadata(metadata, formData);
    formData.append('metadata.typeRequirementId', '68');

    return this.http.post(`${this.baseAPI}/documents/upload/projectDocument`, formData);
  }

  uploadSinglelineDiagram(metadata: any, document: IFileXM) {

    const formData = new FormData();
    formData.append('file', document.file);
    this.mapProjectMetadata(metadata, formData);
    formData.append('metadata.typeRequirementId', '72');

    return this.http.post(`${this.baseAPI}/documents/upload/projectDocument`, formData);
  }

  private mapProjectMetadata(metadata: any, formData: FormData) {
    formData.append('metadata.projectType', metadata.ProjectType.toString());
    formData.append('metadata.projectName', metadata.ProjectName);
    formData.append('metadata.promoterName', metadata.PromoterName);
    formData.append('metadata.projectCode', metadata.ProjectInstanceId ? metadata.ProjectInstanceId.toString() : 0);
  }
}
