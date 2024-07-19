import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseUrl',
  standalone: true,
})
export class ParseUrlPipe implements PipeTransform {
  transform(value: string): string {
    let title: string='';
    if(value.length>0){
      title = value[1].toUpperCase() + value.substring(2);
    }
    return title;
  }
}
