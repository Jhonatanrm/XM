import { Component, OnInit } from '@angular/core';
import { IProvider } from '@core/entry-projects/model/IProvider';
import { IService } from '@core/entry-projects/model/IService';
import {IElementTypeDetail} from '@core/entry-projects/model/IElementTypeDetail';
import { IInfoservice } from '../../../../core/entry-projects/model/IInfoService';
import {ProviderService} from '@shared/services/hydrometerology/provider.service';

@Component({
  selector: 'app-config-elements',
  templateUrl: './config-elements.component.html',
  styleUrls: ['./config-elements.component.scss']
})
export class ConfigElementsComponent implements OnInit {

  title = 'Metereología';
  provider: IProvider;
  service: IService;
  elementTypeDetails: IElementTypeDetail[];
  infoService: IInfoservice;

  constructor(private providerService: ProviderService) {}

  ngOnInit() {}

  onSelectedProvider(provider: IProvider) {
    this.provider = provider ;
    this.showElementType();
  }

  onSelectedService(service: IService) {
    this.service = service;
    this.showElementType();
  }

  onLoadedElementTypeDetail(elementTypeDetails: IElementTypeDetail[]) {
    this.elementTypeDetails = elementTypeDetails;
  }


  submit() {

    const enInMeEl = this.elementTypeDetails
    .map(elementTypeDetail => elementTypeDetail.elements)
    .reduce((elements, element) => elements.concat(element))
    .map((element) => {
      return {
        xmEnvironmentalInfoMeasuringElementMrid: element.xmEnvironmentalInfoMeasuringElementMrid,
        requiredStorage: element.requiredStorage
      };
    });

    const busPara = this.provider.parameters
    .map((para) => ({ parameter: para.parameter, value: para.value}));

    const infoService: IInfoservice = {
      environmentalDataProviderMrid: this.provider.environmentalDataProviderMrid,
      xmApiConnectionMrid: this.service.xmApiConnectionMrid,
      environmentalInfoMeasuringElement: enInMeEl,
      businessParameter: busPara,
      enabledApi: this.service.enabledApi
    };

    console.log(infoService);

    this.providerService.upadateInfoServices(infoService).subscribe( body => console.log('carga exitosa'));

  }

  showElementType() {
    if (this.elementTypeDetails) {
      this.elementTypeDetails = undefined;
    }
  }

}
