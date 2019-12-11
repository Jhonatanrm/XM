import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slicePipe'
})
export class SlicePipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // return value;
    return `${this.slice(value, args[0] , args[1])}`;
  }

  slice(value: string, start: number, limit: number) {
    if (value.length >= limit) {
      return `${value.slice(start, limit)}.. ${value.slice(value.length - 4, value.length)}`;
    }
    return `${value}`;
  }

}
