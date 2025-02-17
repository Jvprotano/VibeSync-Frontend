import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Space } from '../../models/space-model';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  private apiUrl = 'http://localhost:5260/api/space'; // URL do seu backend

  constructor(private http: HttpClient) { }

  createSpace(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  searchSpace(id: number, query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/search?q=${query}`);
  }

  suggestSong(spaceId: string, songId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/suggest`, { spaceId, songId });
  }

  getAdminSpace(adminToken: string): Observable<Space> {
    return this.http.get<Space>(`${this.apiUrl}/admin/${adminToken}`);
  }
}