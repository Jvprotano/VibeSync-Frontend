import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected authService: AuthService, protected http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const accessToken = this.authService.getAccessToken();

    if (!accessToken) {
      throw new Error('No access token available'); // Use `throw` for synchronous errors
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
  }

  getAuth<T>(url: string): Observable<T> {
    const headers = this.getHeaders();

    return this.http.get<T>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postAuth<T>(url: string, body: any): Observable<T> {
    const headers = this.getHeaders();

    return this.http.post<T>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Authentication failed. Please log in again.'));
    } else if (error.status === 403) {
      return throwError(() => new Error('You do not have permission to access this resource.'));
    } else if (error.status === 404) {
      return throwError(() => new Error('The requested resource was not found.'));
    }

    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
