import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitUnderscore'
})
export class SplitUnderscorePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/_/g, ' ');
  }

}
