import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { TokenResponse } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.setTokens(response)),
      tap(() => this.isAuthenticatedSubject.next(true)),
      catchError(this.handleError)
    );
  }

  register(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, fullName }).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearItens();
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return false;
    }
    try {
      const decodedToken: any = jwtDecode(accessToken);

      var sessionIsValid = decodedToken.exp > Date.now() / 1000;

      if (!sessionIsValid) {
        this.logout();
        return false;
      }

      return sessionIsValid;
    } catch (error) {
      return false;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => this.setTokens(response)),
      tap(() => this.isAuthenticatedSubject.next(true)),
      catchError(this.handleRefreshError)
    );
  }

  private setTokens(response: TokenResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  private clearItens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('suggestedSongs');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('AuthService Error:', error.message); // Log mais específico
    console.error('Status code:', error.status);
    console.error('Error object:', error.error); // Corpo do erro vindo do backend

    // Simplesmente relance o erro original para que o subscriber possa tratá-lo
    return throwError(() => error);
  }
  
  private handleRefreshError(error: HttpErrorResponse) {
    console.error('An refresh error occurred:', error);
    this.logout();
    return throwError(() => new Error('Session expired. Please log in again.'));
  }
}