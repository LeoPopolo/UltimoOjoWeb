import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IPost } from '../models/post';
import { environment } from '../../../environments/environments';

type postResponseType = { data: IPost[] }

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.api_url;

  getPosts() {
    return this.http.get<postResponseType>(`${this.url}/post`);
  }

  createPost(body: { image_path: string, url: string }) {
    return this.http.post<postResponseType>(`${this.url}/post`, body);
  }

  deletePost(postId: number) {
    return this.http.delete<void>(`${this.url}/post/${postId}`);
  }
}
