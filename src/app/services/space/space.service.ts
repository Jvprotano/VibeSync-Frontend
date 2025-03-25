import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Space } from '../../models/space-model';
import { SpacePublic } from '../../models/space-public-model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  private apiUrl = environment.apiUrl + '/space';

  constructor(private http: HttpClient) { }

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
}