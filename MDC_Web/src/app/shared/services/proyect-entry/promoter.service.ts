import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { IPromoter } from '@core/entry-projects/model/IPromoter';
import { map } from 'rxjs/operators';


type EntityResponseType = HttpResponse<IPromoter>;
type EntityArrayResponseType = HttpResponse<IPromoter[]>;


@Injectable({ providedIn: 'root' })
export class PromoterService {

    baseAPI = `${environment.baseAPI}`;
    baseMasterAPI = `${environment.baseAPIMASTER}`;

    constructor(protected http: HttpClient) { }

    getPromoters() {
        return this.http.get(`${this.baseMasterAPI}/Promoters/Search`);
    }

    getPromotersByKey(key: string, onlyAgentParam: any) {

        let params: any;

        if (onlyAgentParam) {
            params = {
                onlyAgent: onlyAgentParam,
                keyParameter: key,
                limit: '10',
                numberPage: '1',
            };
        } else {
            params = {
                keyParameter: key,
                limit: '10',
                numberPage: '1',
            };
        }

        return this.http.get(`${this.baseMasterAPI}/Promoters/Search`, {
            params
        }).pipe(
            // el map es para hacer transfoemaciones antes de enviar
            map(res => {
                const items = 'items';
                return res[items];
            })
        );

    }

    getPromoterById(id: any) {
      return this.http.get(`${this.baseMasterAPI}/Promoters/${id}`);
    }


}
