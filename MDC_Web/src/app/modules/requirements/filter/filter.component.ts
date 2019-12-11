import { Component, OnInit, OnChanges, Input, Output, EventEmitter, } from '@angular/core';
import { RequirementsService } from '@shared/services/requirements/requirements.service';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnChanges {

  @Output() state = new EventEmitter();
  states: any[];
  selectedItem: any;
  constructor(private requirementsService: RequirementsService) { }
  public getRequirementsService() { return this.requirementsService; }


  ngOnInit() {
    // Consumo de servicios
    this.getRequirementsService().getRequirementsStatus()
      .subscribe(res => {
        this.states = res;

        this.selectedItem = res.filter(el => el.codeValue === '2')[0];
        this.state.emit(this.selectedItem);
      });
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

  }

  onSelectChange(evt: any) {
    this.state.emit(evt);
  }


}
