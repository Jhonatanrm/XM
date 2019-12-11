import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { Subscription } from 'rxjs';
import { ITransmisionProject, TransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { MessageService } from '@shared/services/message.service';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { MastereDataService } from '@shared/services/proyect-entry/master-data.service';
import { IAssets, Assets } from '@core/entry-projects/model/IAssets';
import { BusBarService } from '@shared/services/proyect-entry/busbar.service';
import { ProjectRequirementService } from '@shared/services/proyect-entry/project-requirement.service';

@Component({
  selector: 'app-activos-transmision',
  templateUrl: './activos-transmision.component.html'
})
export class ActivosTransmisionComponent implements OnInit, AfterViewInit {

  wait: boolean; // Para el envio de informacion
  project: ITransmisionProject;
  asset: IAssets;
  Form: FormGroup;
  nextTab: string; // Guarda la siguiente tab
  FormBasicInputs: any[]; // limpieza de Formulario
  suscriptionButtonControlSubestacion: Subscription;
  controls: string;
  requirements: any;
  requirementsList: any[];
  hasRequirement: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private activosService: ActivosTransmisionService,
    private busbarService: BusBarService,
    private generalList: GeneralTypesService,
    private masterData: MastereDataService,
    private messageService: MessageService,
    private requirementsService: ProjectRequirementService
  ) {
    this.wait = false;
    this.project = new TransmisionProject();
    this.asset = new Assets();
    this.controls = 'controls';
    this.hasRequirement = false;
  }

  // GETTER AN SETTERS
  public getServiveActivosService() {
    return this.activosService;
  }

  public getServiceGeneralList() {
    return this.generalList;
  }

  public getServiceMasterData() {
    return this.masterData;
  }

  ngOnInit() {

    // COSUMO DE SERVICIOS
    this.getProject();

    this.nextTab = 'ngb-tab-0'; // para limpiar todo el formulario
    this.Form = this.fb.group({
      ProjectId: ['']
    });

    // Espejo de Formulario Basico
    this.FormBasicInputs = [
      'ProjectId', 'subAreaId'
    ];

    // control para purificar el formulario, ante un click en el submenu crear
    this.suscriptionButtonControlSubestacion = this.activosService.observableButtonControlSubestacion
      .subscribe((item: string) => {
        this.activosTabChange({ nextId: 'ngb-tab-0' });
      });
  }

  ngAfterViewInit() {

  }

  // SERVICIOS

  getProject() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.asset.assetType = this.route.snapshot.paramMap.get('asset') ? this.route.snapshot.paramMap.get('asset') : '';
    this.asset.assetId = this.route.snapshot.paramMap.get('assetid') ? +this.route.snapshot.paramMap.get('assetid') : null;

    this.activosService
      .getProjectBK(id)
      .subscribe(projectRtn => {
        this.project = projectRtn;
        this.Form.patchValue({
          ProjectId: this.project.projectId ? this.project.projectId : this.project.id
        });
        this.hasRequirementsPerProject(this.project.projectId);
      },
        (err) => console.error(err.error.message),
        () => this.projectCallback());

  }

  hasRequirementsPerProject(projectId: number) {
    const filterQuery = `?projectId=${projectId}`;
    this.requirementsService.getRequirementOfProyect(filterQuery)
      .subscribe(require => {
        this.requirements = require;
        this.requirementsList = this.requirements.items;
        this.requirements = this.requirementsList.find(itemList => itemList.requirementName === 'Activos y Parámetros');
        if (this.requirements.requirementStatusId === 55) {
          this.hasRequirement = true;
        }
      }, (err) => {
        this.hasRequirement = false;
      });
  }

  projectCallback() {
    this.getConectionType();
    this.getSubArea();
  }

  getConectionType(): void {
    this.generalList
      .getGeneralList('TipoConexion')
      .subscribe(tipoconexions => {
        const code = 'codeValue'; // buena practica
        for (const key in tipoconexions) {
          if (tipoconexions[key][code] === '' + this.project.conectionTypeID) {
            this.project.conectionType = tipoconexions[key].detailValue;
          }
        }
      },
        (err) => console.error(err.error.message));
  }

  getSubArea() {
    this.masterData
      // tslint:disable-next-line: no-bitwise
      .getSubAreaById(this.project.subAreaID)
      .subscribe(subarea => {
        this.project.subArea = subarea;
      },
        (err) => console.error(err.error.message));
  }

  // EVENTOS Y COMPORTAMIENTO
  // tabs de orden superior
  activosTabChange(evt: any) {
    this.nextTab = evt.nextId;
    // tslint:disable-next-line: forin
    for (const k in this.Form.value) {
      // Limpiamos los controles
      if (!this.FormBasicInputs.includes(k)) {
        this.Form.removeControl(k);
      }
    }
  }

  // VALIDACIONES
  validControl(): void {

    const controlsAcces = 'controls';
    for (const key in this.Form.controls) {
      this.Form.controls[key].markAsTouched({ onlySelf: true });
      if (controlsAcces in this.Form.controls[key]) {
        // tslint:disable-next-line: forin
        for (const key2 in this.Form.controls[key][this.controls]) {
          this.Form.get(key)[this.controls][key2].markAsTouched({ onlySelf: true });
          if (controlsAcces in this.Form.get(key)[this.controls][key2]) {
            // tslint:disable-next-line: forin
            for (const key3 in this.Form.get(key)[this.controls][key2][this.controls]) {
              this.Form.get(key)[this.controls][key2][this.controls][key3].markAsTouched({ onlySelf: true });
              if (controlsAcces in this.Form.get(key)[this.controls][key2][this.controls][key3]) {
                // tslint:disable-next-line: forin
                for (const key4 in this.Form.get(key)[this.controls][key2][this.controls][key3][this.controls]) {
                  this.Form.get(key)[this.controls][key2][this.controls][key3][this.controls][key4].markAsTouched({ onlySelf: true });
                }
              }
            }
          }
        }
      }

    }
    return;
  }

  selctService(evt: any) {
    switch (evt.component) {
      case 'app-subestacion-crear':
        switch (evt.subasset) {
          case 'createSubestacion': return this.activosService;
          case 'createBarra': return this.busbarService;
          default: return this.activosService;
        }
      default: return this.activosService;
    }

  }

  // SUBMITS
  onSubmitLinea(evt: any) {
    this.validControl();
    if (this.Form.valid) {
      console.log(this.Form.value);
    }
    return false;
  }

  onSubmitSubestacion(evt: any) {
    // la intension es solo validar
    if (evt.statment === 'validate') {
      this.validControl(); // valida el formulario, lo toca
      return false;
    }

    evt.object.complete = 0; // indica si el formulario esta completo
    if (this.Form.valid) {
      evt.object.complete = 1;
    }

    // Cada objeto tiene su metodo validador propio, solo toca los propios
    // el metodo propio indica los minimos para enviar
    if (evt.object.validControl(this.Form, this.controls)) {
      // Solo guardamos si almenos tiene el nombre de la subestacion
      this.wait = !this.wait;
      // Guardado
      evt.object.setObject(this.Form);
      evt.object.addObject(
        this.selctService(evt), // este no se debe enviar - Marcado para Morir
        this.messageService,
        this.router,
        this.project,
        evt.modal);
      this.wait = !this.wait;
      return true;
    }
    return false;
  }
}
