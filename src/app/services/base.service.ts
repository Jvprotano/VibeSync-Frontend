import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected authService: AuthService, private http: HttpClient) { }

  private baseUrlApi = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    const accessToken = this.authService.getAccessToken();

    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
  }

  getAuth<T>(endpoint: string): Observable<T> {
    const headers = this.getHeaders();

    return this.http.get<T>(`${this.baseUrlApi}${endpoint}`, { headers }).pipe(
      // catchError(this.handleError)
    );
  }

  postAuth<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.getHeaders();

    return this.http.post<T>(`${this.baseUrlApi}${endpoint}`, body, { headers }).pipe(
      // catchError(this.handleError)
    );
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrlApi}${endpoint}`).pipe(
      // catchError()
    );
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 401) {
  //     return throwError(() => new Error('Authentication failed. Please log in again.'));
  //   } else if (error.status === 403) {
  //     return throwError(() => new Error('You do not have permission to access this resource.'));
  //   } else if (error.status === 404) {
  //     return throwError(() => new Error('The requested resource was not found.'));
  //   }
  //   else if (error.status === 429) {
  //     return throwError(() => new Error('Too many requests. Please try again later.'));
  //   } else if (error.status === 500) {
  //     return throwError(() => new Error('Internal server error. Please try again later.'));
  //   }

  //   console.error('An error occurred:', error);
  //   return throwError(() => new Error('Something went wrong. Please try again later.'));
  // }
}
