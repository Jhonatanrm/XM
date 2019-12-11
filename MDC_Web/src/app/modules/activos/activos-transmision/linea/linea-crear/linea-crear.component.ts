import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILinea, Linea } from '@core/entry-projects/model/ILinea';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { ISubestacion } from '@core/entry-projects/model/ISubestation';

@Component({
  selector: 'app-linea-crear',
  templateUrl: './linea-crear.component.html'
})
export class LineaCrearComponent implements OnChanges, AfterViewInit {

  @Input() lineaForm: FormGroup;
  @Input() validationAlertDanger: any;
  linea: ILinea = new Linea();
  subestaciones: ISubestacion[];


  constructor(
    private activosService: ActivosTransmisionService) {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // agregamos los controles
    // this.lineaForm.addControl('subestacionInicial', (new FormControl({ id: 0, name: 'Subestación Inicial' }, Validators.required)));
    this.lineaForm.addControl('name', (new FormControl('', { validators: [Validators.required], updateOn: 'blur' })));
    this.lineaForm.addControl('subestacionInicial', (new FormControl('', { validators: [Validators.required], updateOn: 'blur' })));
    this.lineaForm.addControl('namelinea', (new FormControl('', { validators: [Validators.required], updateOn: 'blur' })));

    // consultamos los insumos
    // this.linea.subestaciones = this.activosService.getSubestaciones(this.lineaForm.value.ProjectID);

    // Llamada durante el ciclo de vida del Componente
    // para el control total del formulario
    this.onChangesForm();
    // console.log('Linea Change');
  }

  ngAfterViewInit(): void {

  }

  // Eventos y Comportamiento

  // FORMULARIO
  onChangesForm(): void {
    // name
    /*
    this.lineaForm.get('name').valueChanges.subscribe(val => {
      // console.log('Linea change name ' + val);
    });
    */
  }

  plantaTabChange(evt) {
    console.log('Change tab Linea');
  }

  onSubmit() {
    return;
  }

}
