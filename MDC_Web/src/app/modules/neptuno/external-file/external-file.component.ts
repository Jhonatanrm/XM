import { Component, ViewEncapsulation } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HydrologicalInformationService } from '@shared/services/neptuno/hydrological-information.service';
import { IBulkInformation } from '@core/entry-projects/model/IBulkInformation';
import { MessageService } from '@shared/services/message.service';
import { IAgent } from '@core/entry-projects/model/IAgent';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomDatepickerI18n, I18n } from '@shared/datepicker-18n';
import { CustomDatepickerFormatter } from '@shared/custom-datepicker-formatter';

@Component({
  selector: 'app-external-file',
  templateUrl: './external-file.component.html',
  styleUrls: ['./external-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    {provide: NgbDateParserFormatter, useClass: CustomDatepickerFormatter }
  ]
})
export class ExternalFileComponent {

  date: NgbDateStruct;
  maxDate: NgbDateStruct;
  file: File;
  agents: IAgent[];
  agent: IAgent;
  request: IBulkInformation;

  constructor(
    private calendar: NgbCalendar,
    private service: HydrologicalInformationService,
    private messageService: MessageService,
    private modal: NgbModal
  ) {
    this.date = calendar.getToday();
    this.date.day -= 1;
    this.maxDate = {...this.date};
    this.service.getAgent().subscribe((agents) => this.agents = agents);
  }

  onChangeFile(fileEvent: any) {
    this.file = fileEvent;
  }

  save() {
    this.uploadArchive(false);
  }

  uploadArchive(excludeWarning: boolean) {
    this.request = {
      file: this.file,
      agentCode: this.agent.code,
      energyDate: this.dateToString(this.date),
      excludeWarning,
      userName: 'jcopete',
    };
    this.service.processFile(this.request)
      .subscribe(
        (res) => this.openModal(res),
        (res: HttpErrorResponse) => {
          this.messageService.openError({
            title: 'Error',
            text: res.error.message
          });
          this.file = null;
        });
  }

  dateToString = (date: NgbDateStruct): string => Object.values(date).join('/');

  openModal(response: any) {
    const ref = this.modal.open(ResultModalComponent, { size: 'xl', backdrop: 'static'});
    ref.componentInstance.response = response;
    ref.componentInstance.agent = this.agent;
    const { year, month, day } = this.date;
    ref.componentInstance.energeticDate = `${day}/${month}/${year}`;
    ref.result
      .then(() => {
        this.request.excludeWarning = true;
        this.uploadArchive(true);
      })
      .catch(() => this.file = null);
  }

}
