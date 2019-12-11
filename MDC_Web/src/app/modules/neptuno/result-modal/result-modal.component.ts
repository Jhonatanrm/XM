import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { IAgent } from '@core/entry-projects/model/IAgent';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss']
})
export class ResultModalComponent implements OnInit {

  response: any;
  actualDate: string;
  energeticDate: string;
  time: string;
  agent: IAgent;

  constructor(private modal: NgbActiveModal, calendar: NgbCalendar) {
    const { year, month, day } = calendar.getToday();
    this.actualDate = `${day}/${month}/${year}`;
    this.time = new Date().toLocaleTimeString();
  }

  ngOnInit() {
  }

  save() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

}
