import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchSongResult } from '../../models/search-song-result.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = 'http://localhost:5260/api/song'; // URL do seu backend

  constructor(private http: HttpClient) { }

  search(term: string, pageSize: number, pageToken?: string): Observable<SearchSongResult[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?term=${term}&pageSize=${pageSize}&pageToken=${pageToken}`);
  }
}
