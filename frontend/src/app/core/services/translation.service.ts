import { Injectable, signal } from '@angular/core';
import es from '../../i18n/es.json';
import en from '../../i18n/en.json';

export type Lang = 'es' | 'en';

const TRANSLATIONS = { es, en };

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _lang = signal<Lang>('es');
  lang = this._lang.asReadonly();

  setLang(lang: Lang) {
    this._lang.set(lang);
  }

  translate(key: string): string {
    const map = TRANSLATIONS[this._lang()];
    const value = key.split('.').reduce((obj: any, k) => obj?.[k], map);
    return value ?? key;
  }
}
