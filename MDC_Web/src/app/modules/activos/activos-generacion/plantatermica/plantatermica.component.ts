import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plantatermica',
  templateUrl: './plantatermica.component.html'
})
export class PlantatermicaComponent implements OnChanges {

  @Input() plantForm: FormGroup;

  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.newMethod();
  }
  private newMethod() {
    alert('perfect2');
  }

}
