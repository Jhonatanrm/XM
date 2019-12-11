import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Busbar } from '@core/entry-projects/model/IBusbar';
import { Observable } from 'rxjs';
import { ActivosTransmisionService } from './activos-transmision.service';

@Injectable({
    providedIn: 'root'
})
export class BusBarService {

    baseAPI = `${environment.baseAPI}`;
    baseAPIGPDLLO = `${environment.baseAPICOMMONMODEL}`;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        protected http: HttpClient,
        private activosService: ActivosTransmisionService) { }

    // CONSULTAR
    getBusBarBK(id: number, act: boolean = false): Observable<Busbar> {
        return this.http.get<Busbar>(`${this.baseAPIGPDLLO}/Busbars/${id}`,
            {
                params: {
                    active: `${act}`
                }
            }
        );
    }

    // AGREGAR
    addBusBarBK(busbar: Busbar):
        Observable<Busbar> {

        return this.http.post<Busbar>(`${this.baseAPIGPDLLO}/Busbars`, busbar, this.httpOptions)
        /*
        .pipe(
            tap((subestacion: Subestacion) => this.log(`added subestacion id=`)),
            catchError(this.handleError<Subestacion>('addSubestacion'))
        )*/;
    }

    // NUMERO DE BARRAS POR CONFIGURACION
    countBusBarByNominalTension(id: number):
        Observable<number> {
        return this.http.get<number>(`${this.baseAPIGPDLLO}/Busbars/Count`, { params: { substationConfigurationId: `${id}` } });
    }

    newBusBarControl(evt: any, newBusBarControl: any) {
        this.activosService.newSubestacionControl(evt, newBusBarControl); // emite la creacion de la barra
    }



}
