import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Space } from '../models/space.model';
import { Injectable } from '@angular/core';
import { SpacePublic } from '../models/space-public.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceService extends BaseService {

  private apiUrl = environment.apiUrl + '/space';

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
    return this.getAuth<Space[]>(`${this.apiUrl}/user-spaces`);
  }
}