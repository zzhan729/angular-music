import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playCount'
})
export class PlayCountPipe implements PipeTransform {

  transform(value: number): number | string {
    if (value > 1000 ){
      return Math.floor(value/1000) + "k"
    }
    if (value > 10000000){
      return Math.floor(value/1000000) + "m"
    }
    return null;
  }

}
