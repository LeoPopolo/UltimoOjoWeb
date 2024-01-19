import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000';

  uploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${this.url}/api/file/upload`, formData);
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.url}/api/file/download/${fileName}`, { responseType: 'blob' });
  }
}
