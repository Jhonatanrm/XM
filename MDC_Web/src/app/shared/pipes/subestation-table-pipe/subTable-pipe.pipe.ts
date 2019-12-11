import { Pipe, PipeTransform } from '@angular/core';
import { AssetTypeEnum } from '@core/entry-projects/enums/assets-type.enum';
@Pipe({
    name: 'substationTablePipe'
})
export class SubstationTablePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            if (value === 'false') {
                return 'Incompleto';
            } else if (value === 'true') {
                return 'Completo';
            } else if (value === AssetTypeEnum.BUSBAR) {
                return 'Barra';
            } else {
                return value;
            }
        } else {
            return 'N/A';
        }
    }
}
