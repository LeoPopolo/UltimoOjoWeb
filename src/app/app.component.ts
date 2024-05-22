import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { GeolocationService } from './web/services/geolocation.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatorService } from './shared/translate/translator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly meta = inject(Meta);
  private readonly geolocationServices = inject(GeolocationService);
  private readonly translate = inject(TranslateService);
  private readonly translator = inject(TranslatorService);

  ngOnInit(): void {
    this.setMetaInfo();

    const country = localStorage.getItem('country');
    if (!country) {
      this.getCurrentCountry();
      return;
    }

    this.setDefaultLanguage(country);
  }

  setDefaultLanguage(country: string) {
    if (country === 'Argentina') {
      this.translate.setDefaultLang('es');
      this.translator.setCurrentLanguage('es');
    } else {
      this.translate.setDefaultLang('en');
      this.translator.setCurrentLanguage('en');
    }
  }

  setMetaInfo() {
    this.meta.updateTag({ name: 'description', content: 'Diseño. arquitectura, plantillas de contrato, decoración' });
    this.meta.updateTag({ name: 'keywords', content: 'diseño, arquitectura, plantilla, contrato, cuestionario de cliente, presupuesto, decoración, templates, newsletter, design' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ 'http-equiv': 'content-language', content: 'es' });
    this.meta.updateTag({ property: 'og:title', content: 'Último ojo - Diseño y arquitectura' });
    this.meta.updateTag({ property: 'og:description', content: 'Plantillas de diseño en canva' });
    this.meta.updateTag({ property: 'og:image', content: '../assets/images/logo.png' });
    this.meta.updateTag({ property: 'og:url', content: 'http://ultimoojo.com' });
  }

  getCurrentCountry() {
    this.geolocationServices.getCurrentCountry().subscribe(data => {
      localStorage.setItem('country', data.country_name);

      this.setDefaultLanguage(data.country_name);
    });
  }

}
