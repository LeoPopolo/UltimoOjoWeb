import { Component, OnInit, inject, signal } from '@angular/core';
import { PostService } from '../../../admin/services/post.service';
import { IPost } from '../../../admin/models/post';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  private readonly postServices = inject(PostService);
  public readonly downloadImageUrl = `${environment.api_url}/file/download`;

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
    location.href = `https://www.instagram.com/p/${post.url}`;
  }
}
