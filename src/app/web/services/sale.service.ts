import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { SaleRequest, SaleResponse } from '../models/sale';

type salesResponseType = { data: SaleResponse[] };
type saleResponseType = { data: SaleResponse };

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private api_url = environment.api_url;
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  createSale(bodySale: SaleRequest) {
    return this.httpClient.post<SaleRequest>(`${this.api_url}/sale/`, bodySale);
  }

  getSales() {
    return this.httpClient.get<salesResponseType>(`${this.api_url}/sale/`);
  }

  getSale(id: number) {
    return this.httpClient.get<saleResponseType>(`${this.api_url}/sale/${id}`);
  }

  markSaleAsPaid(id: number) {
    return this.httpClient.patch<void>(`${this.api_url}/sale/${id}`, null);
  }
}
