import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, TokenResponse } from './user';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  register(info: User): Observable<void> {
    return this.http.post<void>(`${this.url}/Auth/register`, info);
  }

  login(info: User): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.url}/Auth/login`, info);
  }

  createSession(tokenResponse: TokenResponse) {
    localStorage.setItem('access-token', tokenResponse.accessToken);
    localStorage.setItem('refresh-token', tokenResponse.refreshToken);
  }

  deleteSession() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
}
