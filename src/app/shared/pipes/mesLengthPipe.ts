import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mesLength'
})
export class MesLengthPipe implements PipeTransform {

    transform(value: string): any {
        if (value.toString().length === 1) {
            return '0' + value;
        } else {
            return value; 
        }

    }

}