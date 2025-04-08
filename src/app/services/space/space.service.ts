import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Space } from '../../models/space-model';
import { SpacePublic } from '../../models/space-public-model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private apiUrl = environment.apiUrl + '/space';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createSpace(name: string, userEmail: string): Observable<Space> {
    return this.http.post<Space>(this.apiUrl, { name, userEmail });
  }

  searchSpace(id: number, query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/search?q=${query}`);
  }

  getAdminSpace(adminToken: string): Observable<Space> {
    return this.http.get<Space>(`${this.apiUrl}/admin/${adminToken}`);
  }

  getSpace(publicToken: string): Observable<SpacePublic> {
    return this.http.get<Space>(`${this.apiUrl}/${publicToken}`);
  }

  getUserSpaces(): Observable<Space[]> {
    const accessToken = this.authService.getAccessToken();

    if (!accessToken) {
      return throwError(() => new Error('No access token available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<Space[]>(`${this.apiUrl}/user-spaces`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Authentication failed. Please log in again.'));
    }
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

}