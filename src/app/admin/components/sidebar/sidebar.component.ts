import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarMobileComponent } from "../sidebar-mobile/sidebar-mobile.component";


@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [RouterModule, SidebarMobileComponent]
})
export class SidebarComponent {
  private readonly router = inject(Router);

  sidebarOpen = false;

  logout() {
    this.router.navigate(['/home']);
    localStorage.clear();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
