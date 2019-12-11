import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ProviderService} from '@shared/services/hydrometerology/provider.service';

import {IProvider} from '@core/entry-projects/model/IProvider';
import {IService} from '@core/entry-projects/model/IService';


@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
})
export class ServiceProvidersComponent implements OnInit {

  @Output() selectedProvider = new EventEmitter<IProvider> ();
  @Output() selectedService = new EventEmitter<IService>();



  providers: IProvider[];
  provider: IProvider;
  services: IService[];
  service: IService;

  constructor(private providerService: ProviderService) { }

  ngOnInit() {
    this.getAllProviders();
  }

  getAllProviders() {
    this.providerService.getAllProviders().subscribe(
      providers => this.providers = providers
    );
  }

  changeProvider(provider: IProvider) {

    this.service = null;
    provider ? this.selectedProvider.emit(JSON.parse(JSON.stringify(provider))) :
    this.selectedProvider.emit(undefined);
  }

  changeService(service: IService) {
      this.selectedService.emit(service);
  }
}
