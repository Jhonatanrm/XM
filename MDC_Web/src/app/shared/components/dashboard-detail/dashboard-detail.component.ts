import { Component, OnInit, Input, OnChanges, AfterContentInit, AfterViewInit } from '@angular/core';
import { GeneralTypesService } from '@shared/services/proyect-entry/generaltypes.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html'
})
export class DashboardDetailComponent implements OnInit, OnChanges {

  @Input() object: any; // Por lo general es un objeto tipo proyecto
  @Input() text: string;
  @Input() html: string;
  open: boolean;

  constructor(private generalList: GeneralTypesService) {
    this.open = false;
    this.text = '';
    this.html = '';
  }

  ngOnInit() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (this.object) {
      // Consultamos el tipo conectionTypeID
      // TipoConexion
      this.object.conectionType = '';
      this.generalList
        .getGeneralList('TipoConexion')
        .subscribe(tipoconexions => {
          if ('conectionTypeID' in this.object) {
            this.object.conectionType = tipoconexions.find(el => el.typeMRID === this.object.conectionTypeID).detailValue;
          }
        },
        (err) => console.error(err.error.message));
    }
  }

  openDetail() {
    this.open = !this.open;
  }

}
