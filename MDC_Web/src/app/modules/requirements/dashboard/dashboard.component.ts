import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RequirementsService } from '@shared/services/requirements/requirements.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  tittle: string;
  text: string;
  filterState: any;
  constructor(private requirementsService: RequirementsService) {
    this.tittle = 'Módulo de requerimientos';
    this.text = 'Revisa aquí los requerimientos por realizar, aprobar o rechazar.';
    // this.filterState = undefined;
  }
  public getRequirementsService() {
    return this.requirementsService;
  }

  selectState(evt: any) {
    this.filterState = evt;
  }

  ngOnInit() {
  }

}
