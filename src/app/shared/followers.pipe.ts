import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers'
})
export class FollowersPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1000) {
      return value.toString(); //return the value as is if it's less than 1000
    } else {
      //convert the value to a string and insert commas every three digits
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
}
