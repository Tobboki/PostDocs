import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Tracks login state
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable to expose the state

  constructor(private http: HttpClient) {}

  // Login user
  login(credentials: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(
      `${environment.authApiUrl}${environment.authEndpoints.login}`,
      credentials,
      { withCredentials: true }
    ).pipe(
      map(response => {
        this.isLoggedInSubject.next(response.success);
        return response.success;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  // Logout user
  logout(): Observable<boolean> {
    return this.http.post<any>(
      `${environment.authApiUrl}${environment.authEndpoints.logout}`,
      {},
      { withCredentials: true }
    ).pipe(
      map(response => {
        this.isLoggedInSubject.next(false); // Reset login state on logout
        return response.success;
      }),
      catchError(error => {
        console.error('Logout failed', error);
        return throwError(() => error);
      })
    );
  }

  // Check if user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.http.post<any>(
      `${environment.authApiUrl}${environment.authEndpoints.isAuthenticated}`,
      {},
      { withCredentials: true }
    ).pipe(
      map(response => {
        this.isLoggedInSubject.next(response.authenticated); // Update state based on response
        return response.authenticated;
      }),
      catchError(error => {
        console.error('Authentication check failed', error);
        return throwError(() => error);
      })
    );
  }
}
