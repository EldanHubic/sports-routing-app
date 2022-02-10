import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    sports: Array<any>,
    column?: string,
    reverse?: boolean
  ): Array<any> {
    // First we need to sort an Array.
    if (column === undefined || column === 'id') {
      sports.sort((e1, e2) => Number(e1.id) - Number(e2.id));
      // array.sort(compareFunction)
      // compareFunction - A function that defines an alternative sort order.
      // The function should return a negative, zero, or positive value, depending on the arguments,
      // like : function(a, b){return a-b}
      // When the sort() method compares two values,
      // it sends the values to the compare function,
      // and sorts the values according to the returned (negative, zero, positive) value.
    } else if (column === 'name') {
      sports.sort((e1, e2) => e1.name.localeCompare(e2.name));
      // The localeCompare() method compares two strings in the current locale.
      // The locale is based on the language settings of the browser.
      // The localeCompare() method returns a number indicating
      // whether the string comes before, after or is equal as the compareString in sort order.
      // Reverse Array after sorting.
      // If flag is true then only reverse it.
      if (reverse) {
        sports.reverse();
      }
    }
    return sports;
  }
}
