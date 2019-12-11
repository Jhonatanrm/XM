import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {IProvider} from '@core/entry-projects/model/IProvider';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html'
})

export class ParametersComponent implements OnInit {

  @Input() provider: IProvider;

  constructor() { }

  ngOnInit() {
  }

}
