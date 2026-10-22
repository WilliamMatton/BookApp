import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from './auth';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const apiAuthUrl = `${environment.apiUrl}/Auth/`;
  const isAuthRequest = req.url.startsWith(apiAuthUrl);

  const userId = localStorage.getItem('user-id');
  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  const authorized = accessToken
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      })
    : req;

  return next(authorized).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthRequest) {
        return throwError(() => error);
      }

      if (!userId || !refreshToken) {
        authService.deleteSession();
        router.navigate(['/login']);
        return throwError(() => error);
      }

      return authService.refreshToken(userId, refreshToken).pipe(
        switchMap((tokenResponse) => {
          authService.createSession(tokenResponse);

          const newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${tokenResponse.accessToken}` },
          });
          return next(newReq);
        }),
        catchError((refreshError: HttpErrorResponse) => {
          authService.deleteSession();
          router.navigate(['/login']);
          return throwError(() => refreshError);
        })
      );
    }),
  );
};
