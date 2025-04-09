import { Injectable, signal } from '@angular/core';


export type localIdioma = 'es' | 'en' | 'ja';
@Injectable({
  providedIn: 'root'
})

export class LocaleService {
private currentLocale = signal<localIdioma>('es');

constructor() {
   this.currentLocale.set(
    localStorage.getItem('locale') as localIdioma ?? 'es'
   );
}

get getLocale() {
  return this.currentLocale();
}
changeLocale(locale: localIdioma) {
  localStorage.setItem('locale', locale);
  this.currentLocale.set(locale);
  window.location.reload();
}

}