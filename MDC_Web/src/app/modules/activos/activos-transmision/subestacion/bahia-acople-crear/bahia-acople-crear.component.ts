import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bahia-acople-crear',
  templateUrl: './bahia-acople-crear.component.html'
})
export class BahiaAcopleCrearComponent implements OnChanges {

  @Input() bahiaAcopleForm: FormGroup;
  
  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    
  }

}
