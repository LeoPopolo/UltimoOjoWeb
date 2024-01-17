import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterModule, CurrencyPipe, ButtonComponent, SidebarComponent, NgStyle]
})
export class NavbarComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleOptionsMobile() {

  }
}
