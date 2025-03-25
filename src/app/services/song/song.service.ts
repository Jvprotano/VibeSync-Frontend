import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../../models/song-model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = environment.apiUrl + '/song';

  constructor(private http: HttpClient) { }

  search(term: string, pageSize: number, pageToken?: string): Observable<Song[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?term=${term}&pageSize=${pageSize}&pageToken=${pageToken}`);
  }
}
