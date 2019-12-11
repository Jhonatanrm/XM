import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { GenerationDTO } from '@core/entry-projects/model/IGenerationDTO';


type EntityResponseType = HttpResponse<GenerationService>;
type EntityArrayResponseType = HttpResponse<GenerationService>;


@Injectable({ providedIn: 'root' })
export class GenerationService {

    baseAPI = `${environment.baseAPI}`;

    constructor(protected http: HttpClient) { }

    registerGenerationProyect(generationDTO: GenerationDTO) {
        return this.http.post(`${this.baseAPI}/projects/GenerationProjects`, generationDTO);
    }

    searchGenerationProject(filterQuery: string) {
        return this.http.get(`${this.baseAPI}/projects/GenerationProjects/Search` + filterQuery);
    }

    countGenerationProject() {
        return this.http.get(`${this.baseAPI}/projects/GenerationProjects/TotalCount`);
    }
    
    SearchGenerationStageProject(filterQuery: string) {
        return this.http.get(`${this.baseAPI}/projects/GenerationProjects/SearchPerStage` + filterQuery);
    }
    
    getGenerationProjectById(id: number) {
        return this.http.get(`${this.baseAPI}/projects/GenerationProjects/${id}`);
    }
    



}
