import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length = 20, suffix = '...'): string {
    if (value && value.length > length) {
      return value.substring(0, length).trim() + suffix;
    }

    return value;
  }
}
