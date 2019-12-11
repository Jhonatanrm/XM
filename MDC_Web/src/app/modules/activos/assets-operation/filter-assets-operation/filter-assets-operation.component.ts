import { Component, EventEmitter, Output, OnChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AssetsOperationService } from '@shared/services/assets-operation/assets-operation.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { MessageService } from '@shared/services/message.service';

@Component({
  selector: 'app-filter-assets-operation',
  templateUrl: './filter-assets-operation.component.html'
})
export class FilterAssetsOperationComponent implements OnInit, OnChanges {

  @Output() filters = new EventEmitter();
  @ViewChild('filterSubestation', null) filterSubestation: ElementRef;
  activeTypesList: any[];
  substationList: any[];
  selectedSubstation: any;
  selectedType: any;
  formatterSubstation: any;
  searchSubstation: any;
  searchFailedSubstation = false;
  subTextfield: string;
  agentCode = null;

  constructor(
    private assetsOperationService: AssetsOperationService,
    private messageService: MessageService) {
    this.activeTypesList = [
      'Subestación',
      'Barra'
    ];
  }

  public getAssetsOperationService() { return this.assetsOperationService; }

  ngOnInit() {

    // variable de entrada para el selector tipo automonplete de subestacione
    this.searchSubstation = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.length < 2 ? []
          : this.assetsOperationService.getSubestationsInOperationBk(term, this.agentCode).pipe(
            tap(() => this.searchFailedSubstation = false),
            catchError(() => {
              this.searchFailedSubstation = true;
              return of([]);
            }))
        )
      );

    // variable de entrada para el selector tipo automonplete
    this.formatterSubstation = (x: { assetName: string }) => x.assetName;

  }

  ngOnChanges() {

  }

  onSelectTypeChange(evt: any) {
    this.selectedType = evt;
    const selectedElements = {
      substation: this.selectedSubstation,
      assetType: this.selectedType,
      controlValue: false
    };
    this.emitMessageSearch(selectedElements);
  }

  onSelectSubstationChange(evt: any) {
    this.selectedSubstation = evt.item;
    this.subTextfield = evt.item.assetName;
  }

  onBlur() {
    if (this.subTextfield !== this.filterSubestation.nativeElement.value) {
      this.selectedSubstation = null;
      this.subTextfield = null;
      this.filterSubestation.nativeElement.value = '';
      const selectedElements = {
        substation: null,
        assetType: this.selectedType,
        controlValue: false
      };
      this.emitMessageSearch(selectedElements);
    }
  }

  searchFilters() {
    const selectedElements = {
      substation: this.selectedSubstation,
      assetType: this.selectedType,
      controlValue: true
    };
    if (this.selectedSubstation || this.selectedType) {
      this.emitMessageSearch(selectedElements);
    } else {
      this.emitMessageSearch(selectedElements);
      this.messageService.openWarning('Por favor seleccionar un filtro de búsqueda para realizar la consulta');
    }
  }

  private emitMessageSearch(selectedElements?: any) {
    this.filters.emit(selectedElements);
  }
}
