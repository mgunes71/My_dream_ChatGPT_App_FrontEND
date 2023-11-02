import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date | any, args = 'YYYY-MM-DD'): unknown {
    return dayjs(value).format(args);
  }

}
