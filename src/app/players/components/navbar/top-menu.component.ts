import { ChangeDetectionStrategy, Component, inject, LOCALE_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocaleService, localIdioma } from '../../services/locale.service';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, UpperCasePipe],
  templateUrl: './top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  currentLocale = signal(inject(LOCALE_ID));
  localeService = inject(LocaleService);
  nameUpper = signal('GG GAME');






  changeLocale(locale: localIdioma) {
    this.localeService.changeLocale(locale);
  }

 }
