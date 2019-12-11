import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';

@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html'
})
export class LineaComponent implements OnChanges {

  @Input() lineaForm: FormGroup;
  @Input() hasRequirement: boolean;
  @Output() formSubmit = new EventEmitter();
  @Input() project: ITransmisionProject;
  closeResult: string;

  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

  }

  onSubmit(evt: any) {
    this.formSubmit.emit(evt);
  }

}
