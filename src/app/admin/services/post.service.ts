import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IPost } from '../models/post';

type postResponseType = { data: IPost[] }

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000';

  getPosts() {
    return this.http.get<postResponseType>(`${this.url}/api/post`);
  }

  createPost(body: { image_path: string, url: string }) {
    return this.http.post<postResponseType>(`${this.url}/api/post`, body);
  }
}
