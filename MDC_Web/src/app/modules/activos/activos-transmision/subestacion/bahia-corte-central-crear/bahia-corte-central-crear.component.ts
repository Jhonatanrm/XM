import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bahia-corte-central-crear',
  templateUrl: './bahia-corte-central-crear.component.html'
})
export class BahiaCorteCentralCrearComponent implements OnChanges {

  @Input() bahiaCorteCentralForm: FormGroup;
  
  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    
  }

}
