import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-flat-view',
  standalone: true,
  imports: [],
  templateUrl: './flat-view.component.html',
  styleUrl: './flat-view.component.scss'
})
export class FlatViewComponent implements OnInit {
  private readonly dialogData = inject(MAT_DIALOG_DATA);

  flat: string = '';

  ngOnInit() {
    this.flat = this.dialogData?.flat || '';
  }
}
