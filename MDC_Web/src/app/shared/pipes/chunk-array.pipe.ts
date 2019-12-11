import { Pipe, PipeTransform } from '@angular/core';
import * as _chunk from 'lodash.chunk';

@Pipe({
  name: 'chunkArray'
})
export class ChunkArrayPipe implements PipeTransform {

  transform(value: any[], size: number): Array<any[]> {
    return _chunk(value, size);
  }

}
