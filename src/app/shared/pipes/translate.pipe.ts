import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services/locale.service';
import { translations, Idioma } from '../services/translations';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  transform(key: keyof typeof translations, trans: typeof translations): string {
    const currentLocale = this.localeService.getLocale as Idioma;
    return trans[key][currentLocale] || key;
  }
}
