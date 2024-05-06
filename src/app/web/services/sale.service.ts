import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SaleRequest, SaleResponse } from '../models/sale';

type salesResponseType = {
  data: SaleResponse[];
  maxPages: number;
  totalItems: number;
};
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

  getSales(filter?: string, page?: number, pageSize?: number) {
    let params = new HttpParams();

    if (filter) params = params.set('filter', filter);

    if (page) params = params.set('page', page);

    if (pageSize) params = params.set('pageSize', pageSize);

    return this.httpClient.get<salesResponseType>(`${this.api_url}/sale/`, {
      params,
    });
  }

  getSale(id: number) {
    return this.httpClient.get<saleResponseType>(`${this.api_url}/sale/${id}`);
  }

  markSaleAsPaid(id: number) {
    return this.httpClient.patch<void>(`${this.api_url}/sale/${id}`, null);
  }
}
