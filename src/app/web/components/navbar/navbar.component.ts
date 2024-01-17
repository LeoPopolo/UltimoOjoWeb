import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CartService } from '../../services/cart.service';
import { ITemplate } from '../../models/template';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterModule, CurrencyPipe, ButtonComponent, SidebarComponent, NgStyle]
})
export class NavbarComponent implements OnInit {
  sidebarOpen = false;
  private readonly cartService = inject(CartService);

  cart = signal<ITemplate[]>([]);

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      this.cart.set(data);
    });
  }

  get total() {
    return this.cart().reduce((acc, item) => acc + item.price, 0);
  }

  toggleOptionsMobile() {}
}
