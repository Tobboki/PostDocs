import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSignal = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  // Getter to expose the signal
  get isLoggedIn() {
    return this.isLoggedInSignal();
  }

  // Login user
  login(credentials: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(
      `${environment.authApiUrl}${environment.authEndpoints.login}`,
      credentials,
      { withCredentials: true }
    ).pipe(
      map(response => {
        this.isLoggedInSignal.set(response.success);
        return response.success;
      })
    );
  }

  // Logout user
  logout(): Observable<boolean> {
    return this.http
      .post<any>(
        `${environment.authApiUrl}${environment.authEndpoints.logout}`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((response) => {
          this.isLoggedInSignal.set(false); // Reset the signal
          return response.success;
        })
      );
  }

  // Initialize the value of isLoggedInSignal
  initializeAuthState(): void {
    this.refreshToken().subscribe({
      next: () => {
        // If the refresh token is valid, mark the user as logged in
        this.isLoggedInSignal.set(true);
      },
      error: () => {
        // If refreshing fails, ensure the user is logged out
        this.isLoggedInSignal.set(false);
      },
    });
  }
  
  // Refresh token
  refreshToken(): Observable<boolean> {
    return this.http.post<any>(
      `${environment.authApiUrl}${environment.authEndpoints.refreshToken}`,
      {},
      { withCredentials: true }
    ).pipe(
      map(response => {
        if (response.refreshed) {
          this.isLoggedInSignal.set(true); // Update login state
          return true;
        }
        return false;
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
        this.isLoggedInSignal.set(response.authenticated); // Update state based on response
        return response.authenticated;
      })
    );
  }
}
