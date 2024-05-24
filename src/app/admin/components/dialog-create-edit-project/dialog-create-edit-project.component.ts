import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ProjectService } from '../../../web/services/project.service';
import { FormsModule } from '@angular/forms';
import { Project } from '../../../web/models/project';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../../../shared/services/file.service';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dialog-create-edit-project',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './dialog-create-edit-project.component.html',
  styleUrl: './dialog-create-edit-project.component.scss'
})
export class DialogCreateEditProjectComponent implements OnInit {
  private readonly projectServices = inject(ProjectService);
  private readonly fileServices = inject(FileService);
  private readonly dialogRef = inject(
    MatDialogRef<DialogCreateEditProjectComponent>
  );
  private readonly dialogData = inject<IDialogData>(MAT_DIALOG_DATA);
  public readonly downloadImageUrl = `${environment.api_url}/file/download/`;

  name: string = '';
  subtitle: string = '';
  description: string = '';
  flat = signal<File[]>([]);
  gallery = signal<File[]>([]);
  portrait = signal<File | null>(null);

  portraitPreview = signal<string | ArrayBuffer | null>('');
  flatPreview: (string | ArrayBuffer | null)[] = [];
  galleryPreview: (string | ArrayBuffer | null)[] = [];

  loading = signal<boolean>(false);
  edit = signal<boolean>(false);
  project = signal<Project | null>(null);

  portraitToEdit = signal<string>('');
  flatsToEdit = signal<string[]>([]);
  galleryToEdit = signal<string[]>([]);

  ngOnInit() {
    if (this.dialogData?.projectId) {
      this.edit.set(true);
      this.getProject(this.dialogData.projectId)
    }
  }

  getProject(id: number) {
    this.projectServices.getProject(id).subscribe(data => {
      this.project.set(data.data);
      this.pasteDataToForm(data.data);
    })
  }

  pasteDataToForm(project: Project) {
    this.name = project.title;
    this.subtitle = project.subtitle;
    this.description = project.description;

    this.portraitToEdit.set(project.portrait);
    this.galleryToEdit.set(project.images);
    this.flatsToEdit.set(project.flat);
  }

  deleteLoadedPortrait() {
    this.portraitToEdit.set('');
  }

  onLoadedPortrait(event: any) {
    this.portrait.set(event.target.files[0]);
    this.parsePortraitToURL();
  }

  onLoadedFlat(event: any) {
    const files = (event.target.files as File[])
    this.flat.set(
      [...this.flat(),
      ...Array.from(files)]
    )
    this.parseFlatToURL();
  }

  onLoadedGallery(event: any) {
    const files = (event.target.files as File[])
    this.gallery.set(
      [...this.gallery(),
      ...Array.from(files)]
    )
    this.parseGalleryToURL();
  }

  async startUpload() {
    this.loading.set(true);
    const galleryResults = await this.uploadGalleryFiles();

    let flatImages: string[] = [];
    if (this.flat().length) {
      const flatResults = await this.uploadFlatFiles();
      flatImages = (flatResults as {image_path: string}[]).map(
        (item) => item.image_path);
    }

    const portraitResults = await this.uploadPortraitFile();
    const portraitData = portraitResults.image_path;

    const galleryImages = (galleryResults as any[]).map(
      (item) => item.image_path
    );

    this.save(portraitData, galleryImages, flatImages);
  }

  uploadPortraitFile() {
    const uploaded = this.fileServices.uploadFile(this.portrait()!);
    return uploaded.toPromise();
  }

  uploadGalleryFiles() {
    return new Promise((resolve, reject) => {
      this.uploadGallery(this.gallery()).subscribe({
        next: (results) => {
          resolve(results);
        },
        error: (err) => {
          console.log(err);
          console.log('falló la subida');
          reject();
        },
      });
    });
  }

  uploadFlatFiles() {
    return new Promise((resolve, reject) => {
      this.uploadFlat(this.flat()).subscribe({
        next: (results) => {
          resolve(results);
        },
        error: (err) => {
          console.log(err);
          console.log('falló la subida');
          reject();
        },
      });
    });
  }

  uploadGallery(files: File[]) {
    const uploaded = files.map((file) => this.fileServices.uploadFile(file));
    return forkJoin(uploaded);
  }

  uploadFlat(files: File[]) {
    const uploaded = files.map((file) => this.fileServices.uploadFile(file));
    return forkJoin(uploaded);
  }

  parsePortraitToURL() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.portraitPreview.set(event.target!.result);
        resolve(event.target!.result);
      };

      reader.onerror = (error) => {
        console.log(error);
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(this.portrait()!);
    });
  }

  parseFlatToURL() {
    this.flatPreview = [];
    this.flat().forEach((item) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.flatPreview.push(event.target!.result);
          resolve(event.target!.result);
        };

        reader.onerror = (error) => {
          console.log(error);
          reject(new Error('Error al leer el archivo'));
        };

        reader.readAsDataURL(item);
      });
    });
  }

  parseGalleryToURL() {
    this.galleryPreview = [];
    this.gallery().forEach((item) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.galleryPreview.push(event.target!.result);
          resolve(event.target!.result);
        };

        reader.onerror = (error) => {
          console.log(error);
          reject(new Error('Error al leer el archivo'));
        };

        reader.readAsDataURL(item);
      });
    });
  }

  deletePortrait() {
    this.portrait.set(null);
    this.portraitPreview.set(null);
  }

  deleteGalleryItem(index: number) {
    this.gallery().splice(index, 1);
    this.galleryPreview.splice(index, 1);
  }

  deleteFlat(index: number) {
    this.flat().splice(index, 1);
    this.flatPreview.splice(index, 1);
  }

  deleteFlatToEditItem(index: number) {
    this.flatsToEdit().splice(index, 1);
  }

  deleteGalleryToEditItem(index: number) {
    this.galleryToEdit().splice(index, 1);
  }

  async startUpdate() {
    let portraitData = null;
    let galleryData = [];
    let flatData = [];

    if (this.portrait()) {
      const portraitResults = await this.uploadPortraitFile();
      portraitData = portraitResults.image_path;
    }

    if (this.gallery().length) {
      const galleryResults = await this.uploadGalleryFiles();
      galleryData = (galleryResults as any[]).map(
        (item) => item.image_path
      );
    }

    if (this.flat().length) {
      const flatResults = await this.uploadFlatFiles();
      flatData = (flatResults as any[]).map(
        (item) => item.image_path
      );
    }

    this.update(portraitData, galleryData, flatData);
  }

  update(portrait?: string, images?: string[], flat?: string[]) {
    let tmpPortrait = portrait! ?? this.project()?.portrait;
    let tmpImages = (images! && images.length) ? images : [];
    let tmpFlats = (flat! && flat.length) ? flat : [];

    tmpImages = [...tmpImages, ...this.galleryToEdit()];
    tmpFlats = [...tmpFlats, ...this.flatsToEdit()];

    const body: Project = {
      id: this.project()?.id,
      title: this.name,
      subtitle: this.subtitle,
      description: this.description,
      portrait: tmpPortrait,
      images: tmpImages,
      flat: tmpFlats,
    };

    this.projectServices.updateProject(body).subscribe(
      (data) => {
        if (data) {
          this.dialogRef.close(true);
          this.loading.set(false);
        }
      },
      (err) => {
        console.log(err);
        this.dialogRef.close(null);
        this.loading.set(false);
      }
    );
  }

  save(portrait: string, images: string[], flat: string[]) {
    const body: Project = {
      title: this.name,
      subtitle: this.subtitle,
      description: this.description,
      portrait,
      flat,
      images,
    };

    this.projectServices.createProject(body).subscribe(
      (data) => {
        if (data) {
          this.dialogRef.close(true);
          this.loading.set(false);
        }
      },
      (err) => {
        console.log(err);
        this.dialogRef.close(null);
        this.loading.set(false);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}

interface IDialogData {
  projectId?: number
}
