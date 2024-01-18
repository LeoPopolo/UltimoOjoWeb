import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post';
import { InputComponent } from "../../../web/components/input/input.component";
import { AsyncPipe } from '@angular/common';
import { FileService } from '../../../services/file.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, AsyncPipe, FormsModule]
})
export class PostsComponent implements OnInit {
  private readonly postServices = inject(PostService);
  private readonly fileServices = inject(FileService);
  public readonly downloadImageUrl = 'http://localhost:3000/api/file/download';

  posts = signal<IPost[]>([]);

  imageToBeCreated = signal<File | null>(null);
  imageToShow = signal<string | null | ArrayBuffer>('');

  isCreatingNewPost = signal<boolean>(false);

  link = '';

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postServices.getPosts().subscribe(response => {
      this.posts.set(response.data);
    });
  }

  onLoadedImage(event: any) {
    this.imageToBeCreated.set(event.target.files[0]);
    this.parseFileToURL();
  }

  parseFileToURL() {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = (event) => {
        this.imageToShow.set(event.target!.result);
        resolve(event.target!.result)
      }

      reader.onerror = (error) => {
        console.log(error);
        reject(new Error('Error al leer el archivo'))
      }

      reader.readAsDataURL(this.imageToBeCreated()!)

    });
  }

  deleteImage() {
    this.imageToBeCreated.set(null);
    this.imageToShow.set(null);
  }

  startPostUpload() {
    this.uploadFile();
  }

  uploadFile() {
    this.fileServices.uploadFile(this.imageToBeCreated()!).subscribe(
      data => {
        if (data)
          this.createPost(data.image_path);
        else
          alert('error al crear el post');
      },
      err => {
        console.log(err);
        alert('error al crear el post');
      }
    );
  }

  createPost(imagePath: string) {
    const body = {
      image_path: imagePath,
      url: this.link
    }

    this.postServices.createPost(body).subscribe(data => {
      console.log(data);
      this.getPosts();
      this.imageToBeCreated.set(null);
      this.imageToShow.set(null);
      this.link = '';
    });
  }
}
