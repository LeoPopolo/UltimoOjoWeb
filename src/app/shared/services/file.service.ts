import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.api_url;

  uploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${this.url}/file/upload`, formData);
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.url}/file/download/${fileName}`, { responseType: 'blob' });
  }
}
