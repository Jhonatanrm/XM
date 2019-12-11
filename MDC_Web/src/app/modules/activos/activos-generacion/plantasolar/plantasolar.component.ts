import { Component, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plantasolar',
  templateUrl: './plantasolar.component.html'
})
export class PlantasolarComponent implements OnChanges {

  @Input() plantForm: FormGroup;

  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.changeMethod();
  }
  private changeMethod() {
    // consultamos las etapas
    console.log('planta soalr change');
    // this.modalService.open(this.modal);
  }

  plantaTabChange(evt){
    console.log('planta change tab ' + evt);
  }

  onSubmit() {
    console.log(this.plantForm.value);
  }
}
