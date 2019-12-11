import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';

@Component({
  selector: 'app-dashboard-chg-prm',
  templateUrl: './dashboard-chg-prm.component.html'
})
export class DashboardChgPrmComponent implements OnInit {

  tittle: string;
  html: string;
  idAsset: number;
  object: any;

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private comonService: ActivosTransmisionService) {
    this.tittle = 'Cambio de Parámetros';
    this.object = {}
  }

  ngOnInit() {
    // CONSUMO DE SERVICIOS
    this.idAsset = +this.route.snapshot.paramMap.get('id');
    this.comonService.getRequestSubbarbyElement(this.idAsset).subscribe((resp) => {
      this.object = resp;
      this.setHtml(this.object);
    });
  }

  setHtml(description: any) {

    if (description.elementType === 'Subestación') {
      this.html = `
      <div class="row title-lineas-two">
        <div class="col-md-4 ">
          <span> Requerimiento ID: ${description.requirementId} </span>
        </div>
        <div class="col-md-4">
          <span> Nombre de activo: ${description.substationName} </span>
        </div>
        <div class="col-md-4">
          <span> Tipo de activo: ${description.elementType} </span>
        </div>
      </div>
      `;
    } else {
      this.html = `
      <div class="row title-lineas-two">
        <div class="col-md-4 ">
          <span> Requerimiento ID: ${description.requirementId} </span>
          <br><br>
          <span> Nombre de activo: ${description.busbarName} </span>
        </div>
        <div class="col-md-4">
          <span> Tipo de activo: ${description.elementType} </span>
          <br><br>
          <span> Subestación: ${description.substationName} </span>
        </div>
        <div class="col-md-4">
          <span> Operador: ${description.nombreAgente} </span>
        </div>
      </div>
      `;
    }
  }

  clickBack() {
    this.router.navigate(['requirements']);
  }
}
