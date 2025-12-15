import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(
        value: number | null | undefined,
        currencySign: string = '$',
        decimals: number = 2
    ): string {
        if (value == null) return '';
        return currencySign + value.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}
