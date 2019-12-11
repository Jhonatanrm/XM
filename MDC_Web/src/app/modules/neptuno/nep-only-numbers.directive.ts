import { Directive, HostListener } from '@angular/core';
import { Util } from '@util';

@Directive({
  selector: 'input[appNepOnlyNumbers]'
})
export class NepOnlyNumbersDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // keyboard keycodes
    // 8 tecla punto (.), 16 shift, 39 (->), 37 (<-), 9 tab
    // 190 tecla de borrado
    Util.validateKeyPressInput(e, [8, 190, 16, 39, 37, 255, 9]);
  }

}
