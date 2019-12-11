import { Component, ViewEncapsulation, Input, Output, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'xm-justification-modal',
  templateUrl: './justification-modal.component.html'
})
export class JustificationModalComponent implements AfterViewInit {

  @Input() titleModal: string;
  justification: string;

  constructor(
    private readonly modal: NgbActiveModal
    ) { }

    ngAfterViewInit() {
      
    }
    /*

  
  dismiss() {
    this.modal.dismiss();
  }

  sendJustification(){
    this.modal.close(this.justification);
  }
*/
}
