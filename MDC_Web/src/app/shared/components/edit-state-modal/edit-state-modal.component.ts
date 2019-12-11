import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';
import { Observable } from 'rxjs';
import { TransmisionService } from '@shared/services/proyect-entry/transmision.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-state-modal',
  templateUrl: './edit-state-modal.component.html',
  styleUrls: ['./edit-state-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditStateModalComponent implements OnInit {

  states$: Observable<any>;
  selectedState: any;
  justification: string;
  project: any;
  hasChanged: boolean;
  formSubmitted: boolean;

  hour = '00';
  minute = '00';

  listHour: string[] = [];
  listMinute: string[] = [];

  constructor(
    private readonly modal: NgbActiveModal,
    private readonly service: GeneralTypesService,
    private readonly transmissionService: TransmisionService,
    private readonly router: Router
  ) {

    this.buildListTime();
  }

  ngOnInit() {
    this.states$ = this.service.getProjectStates();
    if (this.hasChanged) {
      this.justification = this.project.versionComments;
    }
  }

  buildListTime() {
    for (let i = 0; i <= 59; i++) {
      this.listMinute.push(i < 10 ? ('0' + i) : ('' + i));
      if (i <= 23) {
        this.listHour.push(i < 10 ? ('0' + i) : ('' + i));
      }
    }
  }

  save(form: NgForm) {
    console.log(this.selectedState);
    console.log('this.selectedState');

    this.formSubmitted = true;
    if (!form.valid) {
      return;
    }
    const req = {
      projectId: this.project.projectInstanceId,
      stateId: this.selectedState.typeMRID,
      observation: this.justification,
      time: null
    };

    if (this.selectedState.typeMRID === 47) {
      req.time = this.hour + ':' + this.minute + ':00';
    }


    this.transmissionService.updateProjectState(req)
      .subscribe(() => this.modal.close(),
        () => this.formSubmitted = false);

  }

  dismiss() {
    this.modal.dismiss();
  }

  goToRequirements() {
    this.router.navigate(['/transmision/requirementsProject', this.project.projectRID])
      .then(() => this.dismiss());
  }

}
