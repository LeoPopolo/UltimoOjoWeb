import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from  '@angular/material/icon'

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  imports: [MatIcon],
})
export class PaginatorComponent {
  @Input() maxPages: number = 1;
  @Input() totalItems: number = 1;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;

  onChangePage() {
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage < this.maxPages) this.currentPage++;
    this.onChangePage();
  }

  previous() {
    if (this.currentPage > 1) this.currentPage--;
    this.onChangePage();
  }
}
