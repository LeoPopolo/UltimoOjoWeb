import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { SaleRequest } from '../models/sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private api_url = environment.api_url;
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  createTemplate() {
    return this.httpClient.get<SaleRequest>(
      `${this.api_url}/sale/`
    );
  }
}
