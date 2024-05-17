import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ProjectService } from '../../../web/services/project.service';
import { Project } from '../../../web/models/project';
import { InputComponent } from '../../../web/components/input/input.component';
import { AsyncPipe } from '@angular/common';
import { FileService } from '../../../../shared/services/file.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InputComponent, AsyncPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private readonly projectServices = inject(ProjectService);
  private readonly fileServices = inject(FileService);
  private readonly snackbarServices = inject(MatSnackBar);
  public readonly downloadImageUrl = `${environment.api_url}/file/download`;

  projects = signal<Project[]>([]);

  galleryToBeCreated = signal<File[] | null>([]);
  galleryToShow = signal<string[] | null | ArrayBuffer[]>([]);
  flatToBeCreated = signal<File | null>(null);
  flatToShow = signal<string | null | ArrayBuffer>('');

  isCreatingNewPost = signal<boolean>(false);

  title = ''; 

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectServices.getProjects().subscribe((data) => {
      this.projects.set(data.data);
    });
  }

  onLoadedGalleryImage(event: any) {
    this.galleryToBeCreated.set(event.target.files);
    this.parseGalleryToURL();
  }

  onLoadedFlatImage(event: any) {
    this.flatToBeCreated.set(event.target.file[0]);
    this.parseFlatToURL();
  }

  parseGalleryToURL() {
    this.galleryToBeCreated()?.forEach(item => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target && event.target.result) {
            let tmpGallery = this.galleryToShow()! as (string | ArrayBuffer)[];

            tmpGallery.push(event.target.result);
            this.galleryToShow.set(tmpGallery as (string[] | ArrayBuffer[]));
            resolve(tmpGallery);
          } else {
            reject(new Error('Error al leer el archivo'));
          }
        };

        reader.onerror = (error) => {
          console.log(error);
          reject(new Error('Error al leer el archivo'));
        };

        reader.readAsDataURL(item!);
      });
    });
  }

  parseFlatToURL() {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = (event) => {
        this.flatToShow.set(event.target!.result);
        resolve(event.target!.result)
      }

      reader.onerror = (error) => {
        console.log(error);
        reject(new Error('Error al leer el archivo'))
      }

      reader.readAsDataURL(this.flatToBeCreated()!)

    });
  }


  deleteImage() {
    this.galleryToBeCreated.set(null);
    this.galleryToShow.set(null);
  }
  // deleteImage() {
  //   this.imageToBeCreated.set(null);
  //   this.imageToShow.set(null);
  // }

  startPostUpload() {
    this.uploadFiles();
  }

  uploadFiles() {
    let gallery:string[] = [];
    let flat:string= '';

    this.galleryToBeCreated()?.forEach(file => {
      this.fileServices.uploadFile(file).subscribe(
        (data) => {
          if (data) {
            gallery.push(data.image_path)
          } else this.openSnackbar('error al crear el post');
        },
        (err) => {
          console.log(err);
          this.openSnackbar('error al crear el post');
        }  
      );
    })
  }

  createProject(images: string[]) {
    const title = this.title;

    const body = {
      title: title,
      portrait: images[0],
      flat: images[2],
      images: images,
    };

    this.projectServices.createProject(body).subscribe((data) => {
      console.log(data);
      this.getProjects();
      this.imageToBeCreated.set(null);
      this.imageToShow.set(null);
      this.title = '';
    });
  }

  deleteProject(projectId: number) {
    if (confirm('Seguro desea eliminar esta publicación?')) {
      this.projectServices.deleteProject(projectId).subscribe(
        () => {
          this.openSnackbar('Publicación eliminada con éxito');
          this.getProjects();
        },
        (err) => {
          this.openSnackbar('Error al intentar eliminar la publicación');
          console.log(err);
        }
      );
    }
  }

  openSnackbar(message: string) {
    this.snackbarServices.open(message, 'OK', {
      duration: 3000,
      panelClass: ['Snackbar'],
    });
  }
}
