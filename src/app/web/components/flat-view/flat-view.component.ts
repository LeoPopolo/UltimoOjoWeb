import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-flat-view',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './flat-view.component.html',
  styleUrl: './flat-view.component.scss',
})
export class FlatViewComponent implements OnInit {
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  public readonly downloadImageUrl = `${environment.api_url}/file/download`;

  flat: string[] = [];

  ngOnInit() {
    this.flat = this.dialogData?.flat || [];
  }

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        
    }
    
];
}
