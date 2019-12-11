import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { TransmisionDTO } from '@core/entry-projects/model/ITransmisionDTO';
import { IUnifilarDiagram } from '@core/entry-projects/model/IUnifilarDiagram';


type EntityResponseType = HttpResponse<TransmisionService>;
type EntityArrayResponseType = HttpResponse<TransmisionService>;


@Injectable({ providedIn: 'root' })
export class TransmisionService {

    baseAPI = `${environment.baseAPI}`;

    constructor(protected http: HttpClient) { }

    registerTransmisionProyect(transmisionDTO: TransmisionDTO) {
        return this.http.post(`${this.baseAPI}/projects/TransmissionProjects`, transmisionDTO);
    }

    getProjectById(id: number) {
      return this.http.get(`${this.baseAPI}/projects/TransmissionProjects/${id}`);
    }

    searchTransmisionProyect(filterQuery: string) {
        return this.http.get(`${this.baseAPI}/projects/TransmissionProjects/Search` + filterQuery  );
    }

    countTransmisionProyect() {
        return this.http.get(`${this.baseAPI}/projects/TransmissionProjects/TotalCount`);
    }

    searchTransmisionStageProyect(filterQuery: string) {
        return this.http.get(`${this.baseAPI}/projects/TransmissionProjects/SearchPerStage` + filterQuery);
    }

    updateProjectState(request: any) {
      return this.http.post(`${this.baseAPI}/projects/TransmissionProjects/UpdateState`, request);
    }

    createUnifilarDiagram(listUnifilarDiagram: IUnifilarDiagram[]) {
      return this.http.post(`${this.baseAPI}/projects/TransmissionProjects/CreateUnifilarDiagram`, listUnifilarDiagram);
    }

    getSingleLineDiagramsByProyect(idProyect: number) {
      return this.http.get(`${this.baseAPI}/projects/TransmissionProjects/GetSingleLineDiagrams?projectId=`+idProyect);
    }

}
