import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IElementTypeDetail } from '@core/entry-projects/model/IElementTypeDetail';

@Component({
  selector: 'app-type-elements',
  templateUrl: './type-elements.component.html',
  styleUrls: ['./type-elements.component.scss']
})
export class TypeElementsComponent implements OnInit, OnChanges {

  @Input() elementTypeDetails: IElementTypeDetail[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    // if (this.typeElements.length > 0) {
    //   this.elements = this.typeElements[0].elementsServiceResponseDetail[0]
    //     .elementTypeDetails;
  }

  onClickAllElements(checkAllElements: boolean) {
    this.elementTypeDetails.forEach(elementTypeDetail =>
      elementTypeDetail.elements.forEach( el  => el.requiredStorage = checkAllElements ));
  }

}
