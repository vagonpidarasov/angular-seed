import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'tel'})
export class TelPipe implements PipeTransform {
    transform(value:string):string {
        return `tel:${value.replace(/[\s-]/g, '')}`;
    }
}
