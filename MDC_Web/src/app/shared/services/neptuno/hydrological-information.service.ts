import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { IBulkInformation } from '@core/entry-projects/model/IBulkInformation';
import { environment } from '@env/environment';
import { IAgent } from '@core/entry-projects/model/IAgent';
import { IManualInformationMI } from '../../../core/entry-projects/model/IManualInformationMI';

@Injectable({
  providedIn: 'root'
})
export class HydrologicalInformationService {
  baseAPI = `${environment.baseAPIHydro}`;

  constructor(private http: HttpClient) { }

  getAgent(): Observable <IAgent[]> {
    const userName = 'jcopete';
    return this.http.get<IAgent[]>(`${this.baseAPI}GetAgent/?userName=${userName}`);
  }

  processFile(request: IBulkInformation) {
    const formData = new FormData();
    formData.append('file', request.file);
    return this.http.post(`${this.baseAPI}ProcessFile/?agentCode=${request.agentCode}`
    + `&energyDate=${request.energyDate}&excludeWarning=${request.excludeWarning}&userName=${request.userName}`, formData);
  }

 

  variablesConfiguration(agentCode: string): Observable <IManualInformationMI[]> {
    // return this.http.get<IManualInformationMI[]>
    // (`http://xmmdchidrometereologyapi-dllo.azurewebsites.net/api/v1/Variables/Configuration?agentCode=EMGESA-GUAVIO&energyDate=2019%2F11%2F12`);
    return this.http.get<IManualInformationMI[]>(`${this.baseAPI}Variables/Configuration?agentCode=${agentCode}&energyDate=2019%2F11%2F12`);
  }

}

