import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'projectpipe'
})
export class ProjectPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return args[0] + this.ceros(value, args[1]) + value;
  }


  // retorna la cantidad de ceros necesarios
  ceros(value, limit) {
    let ceros = '';
    if (value) {
      const n = limit - value.toString().length;
      for (let i = 0; i < n; i++) {
        ceros = ceros + '0';
      }
    }
    return ceros;
  }
}
