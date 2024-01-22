import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() closed = new EventEmitter<void>();

  showTemplates = signal<boolean>(false);

  close() {
    this.closed.emit();
  }

  toggleShowTemplates() {
    this.showTemplates.set(!this.showTemplates())
  }
}
