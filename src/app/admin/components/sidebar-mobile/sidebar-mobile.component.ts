import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss'
})
export class SidebarMobileComponent {
  @Output() closed = new EventEmitter<void>();
  private readonly router = inject(Router);

  close() {
    this.closed.emit();
  }

  
  redirect(element:string) {


    this.router.navigate(['/admin/'+element]);
    this.close()
  }

  
  logout() {
    this.router.navigate(['/home']);
    localStorage.clear();
  }
}
