import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProviderService } from '@shared/services/hydrometerology/provider.service';

import { IProvider } from '@core/entry-projects/model/IProvider';
import { IService } from '@core/entry-projects/model/IService';
import {IElementTypeDetail} from '@core/entry-projects/model/IElementTypeDetail';

import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  @Output() loadedElementTypeDetail = new EventEmitter<IElementTypeDetail[]>();
  @Input() provider: IProvider;
  @Input() service: IService;
  elementTypeDetails: IElementTypeDetail[];

  constructor(private providerService: ProviderService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  submit() {
    const variables = this.provider.variables
      .filter((item) => item.selected)
      .map(varr => varr.environmentalInformationMrid);

    if (this.service  && variables.length > 0) {
      this.loadItems(this.provider.environmentalDataProviderMrid, this.service.xmApiConnectionMrid, variables);
    } else {
      this.messageService.openWarning('Debes elegir un servicio y por lo menos una variable');
    }
  }

  loadItems(idProveedor: number, idServicio: number, selectedVariables: number[]) {
    this.providerService.SearchElementsService(idProveedor, idServicio, selectedVariables).subscribe(
     (elementTypeDetails) => {
       this.loadedElementTypeDetail.emit(elementTypeDetails);
     }
    );
  }
}
