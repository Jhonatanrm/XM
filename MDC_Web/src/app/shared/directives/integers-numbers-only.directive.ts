import { Directive, ElementRef, HostListener } from '@angular/core';
import { Util } from '@util';

@Directive({
  selector: 'input[integersNumbersOnly]'
})
export class IntegersNumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    if (this._el.nativeElement.value === '') {
      event.preventDefault();
    }
    const initalValue = this._el.nativeElement.value;
    let replacedValue = initalValue.replace(/[^-\d]/g, '');
    if (replacedValue.length >= 2 && replacedValue.charAt(1) === '-') {
      replacedValue = replacedValue.replace('-', '');
    }
    this._el.nativeElement.value = replacedValue;
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
   // console.log(e);
    Util.validateKeyPressInput(e, [8, 189, 109, 110]);
  }

}
