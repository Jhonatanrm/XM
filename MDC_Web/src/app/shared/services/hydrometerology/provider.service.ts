import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, pipe} from 'rxjs';
import { map } from 'rxjs/operators';

import { IProvider} from '@core/entry-projects/model/IProvider';
import { ITypeElement} from '@core/entry-projects/model/ItypeElement';
import {IElementTypeDetail} from '@core/entry-projects/model/IElementTypeDetail';
import { IInfoservice } from '../../../core/entry-projects/model/IInfoService';


@Injectable(
    {
    providedIn: 'root'
}
)
export class ProviderService {
    baseAPI = `${environment.baseAPIHydro}`;
    constructor(
        protected http: HttpClient,
    ) { }
    getAllProviders():
        Observable<IProvider[]> {
        return this.http.get<IProvider[]>(`${this.baseAPI}/SearchProvider`);
    }

    upadateInfoServices(infoService: IInfoservice) {
        return this.http.put<any>(`${this.baseAPI}UpadateInfoServices`, infoService );
    }


    SearchElementsService(
        environmentalDataProviderMrid: number, xmApiconnetionMrid: number, environmentalInformationMrid: number[])
        : Observable <IElementTypeDetail[]> {
            const filterQuery = this.filterQuery(environmentalDataProviderMrid, xmApiconnetionMrid );
            return this.http.post<ITypeElement[]>(`${this.baseAPI}/SearchElementsService${filterQuery}`, environmentalInformationMrid)
            .pipe(
                map( typeElements => typeElements[0] ? this.elementTypeDetails(typeElements)  : [])
            );

        }

// Funciones auxiliares al flujo de informacion
    elementTypeDetails(typeElements: ITypeElement[]): IElementTypeDetail[] {

       return  Object.entries( typeElements[0].elementsServiceResponseDetail.reduce(this.concatElementTypeDetails, [])
        .reduce(this.indexmMeasuringElementType, {})).map( (element) => {
          return { measuringElementType: element[0],  elements: element[1]} as IElementTypeDetail;
        });
    }

    private filterQuery(environmentalDataProviderMrid: number, xmApiconnetionMrid: number ): string {
        return  `?environmentalDataProviderMrid=${environmentalDataProviderMrid}&xmApiconnetionMrid=${xmApiconnetionMrid}`;
    }

    private concatElementTypeDetails(accumulator, elementsServiceResponse) {
        return accumulator.concat(elementsServiceResponse.elementTypeDetails);
    }

    private indexmMeasuringElementType(accumulator, typeElement ) {
        accumulator[typeElement.measuringElementType] = accumulator[typeElement.measuringElementType] ?
        accumulator[typeElement.measuringElementType].concat(typeElement.elements) : typeElement.elements;
        return accumulator ;
    }
}
