import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bonus',
  standalone: true,
  imports: [],
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.scss'
})
export class BonusComponent {
  @Output() add = new EventEmitter<void>();

  addToCart() {
    this.add.emit();
  }
}
