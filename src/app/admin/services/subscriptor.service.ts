import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ISubscriptor } from '../models/subscriptor';
import { environment } from '../../../environments/environments';

type subscriptorsResponseType = { data: ISubscriptor[] }
type subscriptorResponseType = { data: ISubscriptor }

@Injectable({
  providedIn: 'root'
})
export class SubscriptorService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.api_url;

  getSubscriptors() {
    return this.http.get<subscriptorsResponseType>(`${this.url}/subscriptor`);
  }

  getSubscriptor(id: number) {
    return this.http.get<subscriptorResponseType>(`${this.url}/subscriptor/${id}`);
  }

  createSubscriptor(body: { name: string, lastName: string, email: string }) {
    return this.http.post<subscriptorResponseType>(`${this.url}/subscriptor`, body);
  }

  deleteSubscriptor(subscriptorId: number) {
    return this.http.delete<void>(`${this.url}/subscriptor/${subscriptorId}`);
  }
}
