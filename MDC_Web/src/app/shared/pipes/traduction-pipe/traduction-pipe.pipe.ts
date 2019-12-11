import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'traductionPipe'
})
export class TraductionPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            value = value.substr().toLowerCase();
            if (value === 'subestación') {
                return 'subestation';
            } else if (value === 'subestation') {
                return 'subestación';
            } else {
                return value;
            }
        } else {
            return value;
        }
    }
}
