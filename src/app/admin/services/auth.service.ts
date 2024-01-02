import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserLoginRequest, UserLoginResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000';

  login(body: UserLoginRequest) {
    return this.http.post<UserLoginResponse>(`${this.url}/api/user/login`, body);
  }
}
