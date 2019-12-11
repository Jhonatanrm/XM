import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bahia-transferencia-crear',
  templateUrl: './bahia-transferencia-crear.component.html'
})
export class BahiaTransferenciaCrearComponent implements OnChanges {

  @Input() bahiaTransferenciaForm: FormGroup;

  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    
  }

}
