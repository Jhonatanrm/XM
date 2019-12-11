import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'lowercaseFormsPipe'
})
export class LowercaseFormsPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value[0] === '"') {
            value = value.substr(1, (value.length - 2));
        }
        return value[0].toUpperCase() + value.substr(1).toLowerCase();
    }
}
