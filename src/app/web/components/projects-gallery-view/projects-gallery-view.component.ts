import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-projects-gallery-view',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './projects-gallery-view.component.html',
  styleUrl: './projects-gallery-view.component.scss'
})
export class ProjectsGalleryViewComponent implements OnInit {
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  public readonly downloadImageUrl = `${environment.api_url}/file/download`;

  images: string[] = [];

  ngOnInit() {
    this.images = this.dialogData?.images || [];
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
