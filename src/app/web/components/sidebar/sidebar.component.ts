import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../../../shared/translate/translator.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() closed = new EventEmitter<void>();
  private readonly translatorService = inject(TranslatorService);

  showTemplates = signal<boolean>(false);
  lang: string = localStorage.getItem('lang')!;

  close() {
    this.closed.emit();
  }

  toggleShowTemplates() {
    this.showTemplates.set(!this.showTemplates())
  }


  changeLanguage() {
    this.translatorService.toggleLanguage();
    this.lang = this.translatorService.getCurrentLanguage();
  }

  getFlagPath() {
    if (this.lang === 'es') {
      return "../../../../assets/svg/spain.svg";
    } else {
      return "../../../../assets/svg/england.svg";
    }
  }
}
