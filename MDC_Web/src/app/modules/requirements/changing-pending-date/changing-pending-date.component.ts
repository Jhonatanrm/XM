import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RequirementsService } from '@shared/services/requirements/requirements.service';

@Component({
  selector: 'app-changing-pending-date',
  templateUrl: './changing-pending-date.component.html',
  styleUrls: ['./changing-pending-date.component.scss']
})
export class ChangingPendingDateComponent implements OnInit, OnChanges {

  // variables de entrada
  @Input() requirementRow: any;

  // variables de salida
  @Output() requirementRowChange = new EventEmitter<any>();
  @Output() filterStateForReloadPage = new EventEmitter<any>();

  // variables de control
  @ViewChild('content', null) changingDateModal: ElementRef;

  closeResult: string;
  justificacion: string;

  // variable declaracion del formulario
  pendingDateForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private requirementService: RequirementsService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.justificacion = '';
  }

  open() {
    this.modalService.open(this.changingDateModal, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'light-blue-backdrop',
      backdrop: 'static'
    }).result.then((result) => {
      this.requirementRowChange.emit(null)
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.requirementRowChange.emit(null)
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancelChangeDate() {
    this.modalService.dismissAll(`Closed with: Cancel button`);
  }

  toAcepptCahngeDate() {
    const requirementId = this.requirementRow.idRequerimiento;
    const selectedPendingDate = this.pendingDateForm.get('pendingDateValue').value;
    const justificationChange = this.pendingDateForm.get('justificacionValue').value;
    const newPendingDate = `${selectedPendingDate.year}-${selectedPendingDate.month}-${selectedPendingDate.day}`;

    this.requirementService.updatePendindDate(requirementId, newPendingDate, justificationChange).subscribe((Response) => {
      this.messageService.openSucessConfirm({
        title: '', 
        text: `Se ha cambiado la fecha pendiente del requerimeinto: exitosamente`,
        confirmButtonText: 'Ok'
      }).then((value: SweetAlertResult) => {
        if (value.value) {
          this.filterStateForReloadPage.emit();
          this.modalService.dismissAll(`Closed with: Operation Succes`);
        }
      });
    }, (error) => {
      this.messageService.openError(
        {
          title: 'No se ha podido cambiar la fecha pendiente: ',
          text: error.error.Errors[0].Message,
        });
    });
  }

  ngOnInit() {
    this.pendingDateForm = this.fb.group({});
    this.FormInitialize();
  }

  FormInitialize() {
    this.pendingDateForm = new FormGroup({
      pendingDateValue: new FormControl(null, { validators: [Validators.required] }),
      justificacionValue: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnChanges() {
    if (this.requirementRow) {
      this.open();
    }
  }


}
