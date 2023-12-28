import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  galleryPosts: IGalleryPost[] = [
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
  ];
}

interface IGalleryPost {
  imageUrl: string
}
