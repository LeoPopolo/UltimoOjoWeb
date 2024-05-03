import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private readonly http = inject(HttpClient);

  getCurrentCountry() {
    return this.http.get<any>('https://ipapi.co/json/');
  }
}
