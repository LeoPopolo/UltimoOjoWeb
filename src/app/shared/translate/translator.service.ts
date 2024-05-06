import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private readonly translate = inject(TranslateService);

  private currentLanguage: string = '';

  toggleLanguage() {
    const currentLanguage = this.getCurrentLanguage();

    if (currentLanguage === 'es') {
      this.setCurrentLanguage('en');
      this.translate.use('en');
    } else if (currentLanguage === 'en') {
      this.setCurrentLanguage('es');
      this.translate.use('es');
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  setCurrentLanguage(language: string) {
    localStorage.setItem('lang', language);
    this.currentLanguage = language;
  }
}
