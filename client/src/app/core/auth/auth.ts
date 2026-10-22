import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, TokenResponse } from '@/core/auth/user';
import { environment } from '../../../environments/environment';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  readonly isAuthenticated = signal(!!localStorage.getItem('access-token'));

  constructor() { }

  register(info: User): Observable<void> {
    return this.http.post<void>(`${this.url}/Auth/register`, info);
  }

  login(info: User): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.url}/Auth/login`, info);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.url}/Auth/logout`, null).pipe(
      finalize(() => this.deleteSession()),
    );
  }

  createSession(tokenResponse: TokenResponse) {
    localStorage.setItem('user-id', tokenResponse.userId);
    localStorage.setItem('access-token', tokenResponse.accessToken);
    localStorage.setItem('refresh-token', tokenResponse.refreshToken);
    this.isAuthenticated.set(true);
  }

  deleteSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    this.isAuthenticated.set(false);
  }

  refreshToken(userId: string, refreshToken: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.url}/Auth/refresh-token`, {
      userId,
      refreshToken,
    });
  }
}
