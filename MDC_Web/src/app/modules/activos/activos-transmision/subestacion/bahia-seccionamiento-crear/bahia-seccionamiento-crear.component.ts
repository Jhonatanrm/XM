import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bahia-seccionamiento-crear',
  templateUrl: './bahia-seccionamiento-crear.component.html'
})
export class BahiaSeccionamientoCrearComponent implements OnChanges {

  @Input() bahiaSeccionamientoForm: FormGroup;
  
  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

  }

}
