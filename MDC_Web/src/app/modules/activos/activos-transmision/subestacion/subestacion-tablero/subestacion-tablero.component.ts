import { Component, OnChanges, Input } from '@angular/core';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';

@Component({
  selector: 'app-subestacion-tablero',
  templateUrl: './subestacion-tablero.component.html'
})
export class SubestacionTableroComponent implements OnChanges {

  @Input() project: ITransmisionProject; // Se trae el objeto proyecto para verificar cantidad de etapas

  subestationCount: number; // Almacena la cantidad de subestaciones que hay en la BD
  sectionBarCount: number; // Almacena la cantidad de subestaciones que hay en la BD
  loadSubestation: boolean; // Controla que si no ha terminado el servicio de subestación se muestre el loading
  loadSectionBar: boolean;  // Controla que si no ha terminado el servicio de barras se muestre el loading
  suscriptionNewControlSubestacion: Subscription; // Se crea para controlar el dinamismo a la hora de crear elementos en bd
  listProjectStages = []; // Este atributo almacena una lista con las etapas del proyecto

  constructor(private activosService: ActivosTransmisionService) {
    this.loadSubestation = false;
    this.loadSectionBar = false;
  }

  getServiceActivosService() {
    return this.activosService;
  }

  // Almacena en listProjectStages el arreglo con las etapas del proyecto.
  getProjectStages() {
    this.project.stages.forEach((projectElement) => {
      this.listProjectStages.push(projectElement.id);
    });
  }

  // Consume el servicio de consulta de la cantidad de elementos que se encuentran en BD de tipo subestacion
  setSubestationCount() {
    this.activosService.getAssetsCountBk(this.listProjectStages, [AssetTypeEnum.SUBSTATION], null, [50], null, null)
      .subscribe(resp => {
        this.subestationCount = resp;
        this.loadSubestation = true;
      }, (error: HttpErrorResponse) => { console.error(error.message); });
  }

  // Consume el servicio de consulta de la cantidad de elementos que se encuentran en BD de tipo subestacion
  setSectionBarCount() {
    this.activosService.getAssetsCountBk(this.listProjectStages, [AssetTypeEnum.BUSBAR], null, [50], null, null)
      .subscribe(resp => {
        this.sectionBarCount = resp;
        this.loadSectionBar = true;
      }, (error: HttpErrorResponse) => { console.error(error.message); });
  }

  ngOnChanges() {
    if (this.project.projectName) {
      this.getProjectStages();
      this.setSubestationCount();
      this.setSectionBarCount();
      this.suscriptionNewControlSubestacion = this.activosService.observableNewControlSubestacion
        .subscribe((item: any) => {
          this.setSubestationCount();
          this.setSectionBarCount();
        });
    }
  }

}
