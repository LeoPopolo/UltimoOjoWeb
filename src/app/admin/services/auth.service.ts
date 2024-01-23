import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserLoginRequest, UserLoginResponse } from '../models/user';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.api_url;

  login(body: UserLoginRequest) {
    return this.http.post<UserLoginResponse>(`${this.url}/user/login`, body);
  }
}
