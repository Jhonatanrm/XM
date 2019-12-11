import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any, isImg?: boolean): any {
    if (isImg) {
      return this.sanitizer.bypassSecurityTrustUrl(value);
    }

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
