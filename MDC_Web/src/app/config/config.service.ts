import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAppConfig } from './config.model';
@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient) { }
    load() {
        const envName = environment.production ? 'production' : 'development'
        const jsonFile = `assets/config/config.${envName}.json`;
        return new Promise<boolean>((resolve, reject) => {
            this.http.get(jsonFile).subscribe((response: IAppConfig) => {
                AppConfig.settings = response
                resolve(true)
            }, (error: any) => { throw new Error(`No se pudo cargar el archivo '${jsonFile}': ${JSON.stringify(error)}`) }
            )
        });
    }
}