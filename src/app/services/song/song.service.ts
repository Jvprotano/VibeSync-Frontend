import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../../models/song-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = 'http://localhost:5260/api/song'; // URL do seu backend

  constructor(private http: HttpClient) { }

  search(term: string, pageSize: number, pageToken?: string): Observable<Song[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?term=${term}&pageSize=${pageSize}&pageToken=${pageToken}`);
  }
}
