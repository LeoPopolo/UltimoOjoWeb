import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CartService } from '../../services/cart.service';
import { ITemplate } from '../../models/template';
import { TranslatorService } from '../../../shared/translate/translator.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterModule, CurrencyPipe, ButtonComponent, SidebarComponent, NgStyle,TranslateModule]
})
export class NavbarComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly translatorService = inject(TranslatorService);

  sidebarOpen = false;
  cart = signal<ITemplate[]>([]);
  lang: string = localStorage.getItem('lang')!;
  country = localStorage.getItem('country') || 'Argentina';

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      this.cart.set(data);
    });
  }

  changeLanguage() {
    console.log("funca")
    this.translatorService.toggleLanguage();
    this.lang = this.translatorService.getCurrentLanguage();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getFlagPath() {
    if (this.lang === 'es') {
      return "../../../../assets/svg/spain.svg";
    } else {
      return "../../../../assets/svg/england.svg";
    }
  }

  get total() {
    return this.cart().reduce((acc, item) => acc + item.price, 0);
  }

  get usdTotal() {
    return this.cart().reduce((acc, item) => acc + item.usdPrice, 0);
  }

  toggleOptionsMobile() {}
}
