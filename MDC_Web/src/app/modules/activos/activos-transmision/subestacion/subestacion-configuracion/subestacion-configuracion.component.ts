import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ISubestationConfiguration } from '@core/entry-projects/model/ISubestationConfiguration';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-subestacion-configuracion',
  templateUrl: './subestacion-configuracion.component.html',
  styleUrls: ['./subestacion-configuracion.component.scss']
})
export class SubestacionConfiguracionComponent implements OnChanges {

  @Input() subestacionForm: FormGroup;
  @Input() group: string;
  @Input() subestacionConfiguration: ISubestationConfiguration;
  @Input() index: number;

  constructor() { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

  }

  onDelete(evt) {
    evt.preventDefault();
    const array = this.subestacionForm.get(this.group).get('subestationConfiguration') as FormArray;
    array.removeAt(this.index);
  }

}
