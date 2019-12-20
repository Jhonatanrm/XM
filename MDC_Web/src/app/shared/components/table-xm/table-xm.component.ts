import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Sort } from '@angular/material';
import { IFilter } from '@shared/model/filter';
import { Util } from '@shared/util';
import { Button } from '@core/entry-projects/model/IButton';

@Component({
  selector: 'app-table-xm',
  templateUrl: './table-xm.component.html',
  styleUrls: ['./table-xm.component.scss']
})
export class TableXmComponent implements OnInit, OnChanges {

  @Input() arrayList: any[];
  @Input() columNameList: string[];
  @Input() columNameSortList: string[];
  @Input() rowNameList: string[];
  @Input() rowStyle: string[];
  @Input() buttonList: Button[];
  @Input() collectionSize: number;
  @Input() pageSize: number;
  @Input() page: number;
  @Input() filterInfo: IFilter;
  @Input() load: boolean;
  @Output() tableXmEmitter = new EventEmitter<string>();
  @Output() functionButton = new EventEmitter<any>();
  @Input() flagSearch: boolean;

  searchText: string;


  constructor(
  ) {
    this.load = true;
    this.flagSearch = true;
  }


  ngOnInit() {
  }

  ngOnChanges() {
  }


  sortData(sort: Sort) {
    this.filterInfo.sort = sort;
    this.emitMessage();
  }


  valueColumnRow(atribute: any): string {
    return ('' + atribute);
  }

  // Emite al padre la columna fila y el tipo de boton para su posterior ejecución.
  clickedIconButton(row: any, buttonElement: Button) {
    const actionButton = {
      row,
      buttonElement
    };
    this.emitMessageButtonItem(actionButton);
  }

  onPageChange(numberPage: number) {
    this.filterInfo.numberPage = numberPage;
    this.emitMessage();
  }


  private emitMessage() {
    this.tableXmEmitter.emit(Util.filterAccion(this.filterInfo));
  }

  private emitMessageButtonItem(actionButton: any) {
    this.functionButton.emit(actionButton);
  }

  onsearchText(event: any) {
    event.preventDefault();
    this.onkeyUpSearch();
  }


  onkeyUpSearch() {
    if (this.searchText != null && this.searchText) {
      this.filterInfo.keyParameter = this.searchText;
    } else {
      this.filterInfo.keyParameter = '';
    }

    this.emitMessage();
  }

}
