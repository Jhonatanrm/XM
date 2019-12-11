import { Component, OnInit, OnChanges } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from '@shared/datepicker-18n';
import { CustomDatepickerFormatter } from '@shared/custom-datepicker-formatter';
import { FormBuilder, AbstractControl, ValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {HydrologicalInformationService} from '@shared/services/neptuno/hydrological-information.service';
import { IAgent } from '@core/entry-projects/model/IAgent';
import {IManualInformationMI} from '@core/entry-projects/model/IManualInformationMI';

@Component({
  selector: 'app-manual-information',
  templateUrl: './manual-information.component.html',
  styleUrls: ['./manual-information.component.scss'],
  providers: [
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    {provide: NgbDateParserFormatter, useClass: CustomDatepickerFormatter }
  ]
})
export class ManualInformationComponent implements OnInit {

  agents: IAgent[];
  agent: IAgent;
  date: NgbDateStruct;
  form: FormGroup;

  constructor( private fb: FormBuilder, private service: HydrologicalInformationService) {}

  ngOnInit() {
    this.service.getAgent().subscribe((agents) => this.agents = agents);
  }

  loadDataManualInformation(agent: string) {
    this.service.variablesConfiguration( agent ).subscribe(
      (manualInformation) => {
        this.form = this.fb.group({
          elements: this.fb.array(this.InformationControls(manualInformation))
        });
      }
    );
  }

  InformationControls(manualInformation: IManualInformationMI[]): FormGroup[] {
    const InformationControls = manualInformation.map(
       (element) => {
         let InformationControl =  Object.entries(element).reduce(
            (informationControl, keyValueElement) => {
              informationControl[keyValueElement[0]] = [keyValueElement[1]];
              return informationControl;
            }, {}
          );

         InformationControl = {...InformationControl, value: ['',
         [Validators.required, Validators.pattern(/((^0|^[1-9]\d{0,6})\.{1}\d{4}$|^\.\d{4}$)/)]] };
         return this.fb.group(InformationControl);
      }
    );

    return InformationControls;

  }

  selectedAgent(agent: IAgent) {
    agent ? this.loadDataManualInformation(agent.code) : this.form = null;
  }

}

// function RegExpValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {forbiddenName: {value: control.value}} : null;
//   };
// }


