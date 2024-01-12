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
    // { imageUrl: 'https://www.instagram.com/p/C01fpZWAKni/' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
    { imageUrl: 'https://picsum.photos/300/300' },
  ];

  redirectTo(post: IGalleryPost) {
    location.href = post.imageUrl;
  }
}

interface IGalleryPost {
  imageUrl: string
}
