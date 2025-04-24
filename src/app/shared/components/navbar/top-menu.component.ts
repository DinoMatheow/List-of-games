import { ChangeDetectionStrategy, Component, inject, LOCALE_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { translations } from '../../services/translations';
import { LocaleService } from '../../services/locale.service';
import { Idioma } from '../../services/translations';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslatePipe],
  templateUrl: './top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  currentLocale = signal(inject(LOCALE_ID));
  localeService = inject(LocaleService);
  nameUpper = signal('GG GAME');
  translations = translations;

  constructor() {}

  changeLocale(locale: Idioma) {
    this.localeService.changeLocale(locale);
  }

  cambiarIdioma(idioma: 'es' | 'en' | 'ja') {
    this.localeService.changeLocale(idioma);
  }
}
