import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return this.authService.isAuthenticated().pipe(
      switchMap((isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          // If authenticated, attempt to refresh the token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // If token refresh is successful, proceed with the request
              return next.handle(req);
            }),
            catchError((refreshError) => {
              // Handle token refresh failure
              console.error('Error refreshing token:', refreshError);
              throw refreshError;
            })
          );
        } else {
          console.error('User is not authenticated.');
          throw new Error('User is not authenticated.');
        }
      }),
      catchError((authError) => {
        // Handle any errors during the authentication check
        console.error('Error during authentication:', authError);
        return throwError(() => authError);
      })
    );
  }
}