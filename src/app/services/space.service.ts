import { Observable } from 'rxjs';
import { Space } from '../models/space.model';
import { Injectable } from '@angular/core';
import { SpacePublic } from '../models/space-public.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceService extends BaseService {

  private endpointBaseUrl = '/space';

  createSpace(name: string, eventDate: Date): Observable<Space> {
    return this.postAuth<Space>(this.endpointBaseUrl, { name, eventDate });
  }

  searchSpace(id: number, query: string): Observable<any[]> {
    return this.get<any[]>(`${this.endpointBaseUrl}/${id}/search?q=${query}`);
  }

  getAdminSpace(adminToken: string): Observable<Space> {
    return this.get<Space>(`${this.endpointBaseUrl}/admin/${adminToken}`);
  }

  getSpace(publicToken: string): Observable<SpacePublic> {
    return this.get<Space>(`${this.endpointBaseUrl}/${publicToken}`);
  }

  getUserSpaces(): Observable<Space[]> {
    return this.getAuth<Space[]>(`/space/user-spaces`);
  }
}