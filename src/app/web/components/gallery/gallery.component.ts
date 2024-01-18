import { Component, OnInit, inject, signal } from '@angular/core';
import { PostService } from '../../../admin/services/post.service';
import { IPost } from '../../../admin/models/post';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  private readonly postServices = inject(PostService);
  public readonly downloadImageUrl = 'http://localhost:3000/api/file/download';

  galleryPosts = signal<IPost[]>([]);

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postServices.getPosts().subscribe(data => {
      this.galleryPosts.set(data.data);
    })
  }

  redirectTo(post: IPost) {
    location.href = post.url;
  }
}
