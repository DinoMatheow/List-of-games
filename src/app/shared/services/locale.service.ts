import { Injectable, signal } from '@angular/core';
import { Idioma } from './translations';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocale = signal<Idioma>('es');

  constructor() {
    this.currentLocale.set(
      localStorage.getItem('locale') as Idioma ?? 'es'
    );
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: Idioma) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }
}
