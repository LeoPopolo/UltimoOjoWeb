import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../web/services/project.service';
import { FormsModule } from '@angular/forms';
import { Project } from '../../../web/models/project';
import { MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../../../shared/services/file.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dialog-create-edit-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-create-edit-project.component.html',
  styleUrl: './dialog-create-edit-project.component.scss',
})
export class DialogCreateEditProjectComponent {
  private readonly projectServices = inject(ProjectService);
  private readonly fileServices = inject(FileService);
  private readonly dialogRef = inject(
    MatDialogRef<DialogCreateEditProjectComponent>
  );

  name: string = '';
  subtitle: string = '';
  description: string = '';
  flat = signal<File | null>(null);
  gallery = signal<File[]>([]);

  flatPreview: string | ArrayBuffer | null = '';
  galleryPreview: (string | ArrayBuffer | null)[] = [];

  loading = signal(false);

  onLoadedFlat(event: any) {
    this.flat.set(event.target.files[0]);
    this.parseFlatToURL();
  }

  onLoadedGallery(event: any) {
    this.gallery.set(Array.from(event.target.files));
    this.parseGalleryToURL();
  }

  async startUpload() {
    this.loading.set(true);
    if (this.flat()) {
      const galleryResults = await this.uploadGalleryFiles();

      const flatResults = await this.uploadFlatFile();

      const galleryImages = (galleryResults as any[]).map(
        (item) => item.image_path
      );
      this.save(galleryImages, flatResults.image_path);
    } else {
      const galleryResults = await this.uploadGalleryFiles();

      const galleryImages = (galleryResults as any[]).map(
        (item) => item.image_path
      );
      this.save(galleryImages);
    }
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

  uploadGallery(files: File[]) {
    const uploaded = files.map((file) => this.fileServices.uploadFile(file));
    return forkJoin(uploaded);
  }

  uploadFlatFile() {
    const uploaded = this.fileServices.uploadFile(this.flat()!);
    return uploaded.toPromise();
  }

  parseFlatToURL() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.flatPreview = event.target!.result;
        resolve(event.target!.result);
      };

      reader.onerror = (error) => {
        console.log(error);
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(this.flat()!);
    });
  }

  parseGalleryToURL() {
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

  deleteGalleryItem(index: number) {
    this.gallery().splice(index, 1);
    this.galleryPreview.splice(index, 1);
  }

  deleteFlat() {
    this.flat.set(null);
    this.flatPreview = null;
  }

  save(images: string[], flat?: string) {
    const body: Project = {
      title: this.name,
      subtitle:this.subtitle,
      description:this.description,
      portrait: images[0],
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
