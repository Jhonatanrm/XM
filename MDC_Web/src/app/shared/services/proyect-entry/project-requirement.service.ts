import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from '@env/environment';
import { IUpdateState } from '@core/entry-projects/model/IUpdateState';




@Injectable({ providedIn: 'root' })
export class ProjectRequirementService {

    baseAPI = `${environment.baseAPI}`;

    constructor(protected http: HttpClient) { }

    getRequirementOfProyect(filterQuery: string) {
        return this.http.get(`${this.baseAPI}/ProjectRequirement/Search` + filterQuery);
    }

    registerStateRequirement(updateState: IUpdateState) {
        return this.http.post(`${this.baseAPI}/ProjectRequirement/UpdateState`, updateState);
    }


}
