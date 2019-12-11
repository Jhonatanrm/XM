import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditStateModalComponent } from '../../components/edit-state-modal/edit-state-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EditStateModalService {

  constructor(private readonly modal: NgbModal) { }

  openModal(project: any, hasChanged: boolean) {
    const ref = this.modal.open(EditStateModalComponent, {
      size: 'lg',
      backdrop: 'static',
      windowClass: 'modal-md'
    });
    ref.componentInstance.hasChanged = hasChanged;
    ref.componentInstance.project = project;
    return ref.result;
  }
}
